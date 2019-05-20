import czml from "./sentinel2Orbit.json";
import polys from "./Sentinel2Polys.json";

declare var Cesium: any;

const viewer = new Cesium.Viewer("cesiumContainer", {
    shouldAnimate: true,
    skyAtmosphere: false,
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: `https://api.mapbox.com/styles/v1/skywatch-team/cjsgety8v0s2m1fo49t27s093/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2t5d2F0Y2gtdGVhbSIsImEiOiJjajgzMGlyNmk1ZTBqMnducWFidjNqZjU4In0.6f5beyt2YsWJcAPfxRYuEw`
    })
});
viewer.scene.skyBox.destroy();
viewer.scene.skyBox = undefined;
viewer.scene.sun.destroy();
viewer.scene.sun = undefined;
viewer.scene.backgroundColor = Cesium.Color.BLACK;
viewer.scene.globe.baseColor = Cesium.Color.BLUE;
viewer.scene.highDynamicRange = false;
viewer.scene.fog.enabled = false;
viewer.scene.globe.showGroundAtmosphere = false;
viewer.scene.debugShowFramesPerSecond = true;

const rot90 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-90));
const test = new Cesium.CzmlDataSource();

let posOfSat = new Cesium.Cartesian3(),
    direction = new Cesium.Cartesian3(),
    directionRay = new Cesium.Cartesian3(),
    shiftPos = new Cesium.Cartesian3();
let rotationMatrix = new Cesium.Matrix3();
let coneMatrix = new Cesium.Matrix4();
let nearPolys = [],
    geoJsonSources = [],
    result = [];
let primitives: { [id: string]: any } = {};
let satellites = test.entities;

// Safety pig has arrived to make sure our code works as intended!
//
//  _._ _..._ .-',     _.._(`))
// '-. `     '  /-._.-'    ',/
//    )         \            '.
//   / _    _    |             \
//  |  a    a    /              |
//  \   .-.                     ;
//   '-('' ).-'       ,'       ;
//      '-;           |      .'
//         \           \    /
//         | 7  .__  _.-\   \
//         | |  |  ``/  /`  /
//        /,_|  |   /,_/   /
//           /,_/      '`-'
//

//Sort polys by their start time, find the corresponding time key (differs by source)
polys.features = polys.features.sort((a, b) => {
    return a.properties[
        Object.keys(a.properties).filter(key => {
            return key.includes("time");
        })[0]
    ] <
        b.properties[
            Object.keys(b.properties).filter(key => {
                return key.includes("time");
            })[0]
        ]
        ? -1
        : 1;
});

const polyInfo = polys.features.map(feature => {
    //Figure out which source its from, then parse and return the datetime, which satellite it is and the centroid
    switch (feature.properties.source) {
        case "SkySat": {
            let prodname = feature.properties.product_name.split("_");
            let st = prodname[0].concat(prodname[1]);
            let pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/; //Parse to ISO 8601 in UTC
            let dt = Cesium.JulianDate.fromDate(
                new Date(st.replace(pattern, "$1-$2-$3T$4:$5:$6Z"))
            );

            let vertices = feature.geometry.coordinates[0]; //smh GeoJSON with its array nesting
            let targetPoints = compute2DPolygonCentroid(vertices, vertices.length);

            return [
                dt,
                "SKYSAT-".concat(prodname[2].slice(2).toUpperCase()),
                Cesium.Cartesian3.fromDegrees(targetPoints[0], targetPoints[1])
            ];
        }
        case "Sentinel-2": {
            let prodname = feature.properties.name.split("_");
            let pattern = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/; //Parse to ISO 8601 in UTC
            let dt = Cesium.JulianDate.fromDate(
                new Date(prodname[2].replace(pattern, "$1-$2-$3T$4:$5:$6Z"))
            );

            let vertices = feature.geometry.coordinates[0];
            let targetPoints = compute2DPolygonCentroid(vertices, vertices.length);

            return [
                dt,
                "SENTINEL-".concat(prodname[0].slice(1)),
                Cesium.Cartesian3.fromDegrees(targetPoints[0], targetPoints[1])
            ];
        }
        default: {
            alert("This source, ${feature.properties.source}, isn't supported yet");
        }
    }
});

for (let i = 0; i < polys.features.length; i++) {
    Cesium.GeoJsonDataSource.load(polys.features[i], {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK
    }).then(myDataSource => {
        myDataSource.show = false;
        viewer.dataSources.add(myDataSource);
        geoJsonSources.push(myDataSource);
    });
}

/*
To get the cone working, orientation is going to be in javascript because its so much easier, translation might be a bit harder
then you can set the length of the cone again programmatically based on the distance between the satellite and the nearest not showing polygon.
We only do this calculation for the polygon(s) that is/are upcoming. There can be multiple polygons that were taken at the same time so we
should have an array of polygons, storing the ones that are coming up the most recently probably within the next lets say 4 min to start tho
this value could change. This will happen inside the onTick() function so we want it to be as efficient as possible so that we lose as little
fps as possible. This is why we don't calculate directions and such for every single polygon because we don't know the number of polygons there
could be. To get the array of polygons within the next little bit, we can take advantage of the fact that the polygons are sorted in chronological
order, so that when we hit the first polygon that isn't in the next little bit, we handle the timeline clicks. Once the time passes of course, we
can remove the polygon from the array. We can (possibly) show the line in advance just to show that the satellite is targeting this area next,
and then show the cone for about 4 min starting before the capture time. Then show the polygon at the end of the cone's visibility

https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html#c=zVdrb9s2FP0rhL9UBhTKTRsUcZxgWZpgBZImc9y02TwMtERbxCjSICk7ztD/3ktRD0p2lnQosOWLpUvec8596JJZEYVWjK6pQsdI0DU6o5rlGb4rbMGruHg9k8IQJqh61T+aiqlYgddSamaYFG2/M6IMPBHxBs+VzN7ThaJUB3vvDkL0duC8o+hasQUThIdISLGnpCGGJiiWgqK5VPCQLYliWgrsuDgVC5MC0/4AEJxeTIUBAVRjkiSBJ+Hc2jfB31OB4K+SOayfwmqBCTNE5Tb7F0su1bCOxL7h8fn7sNmhU7keIqNy6hmX7IHyW/ZIhyDPmb+Wy/GGM5FQ1aIxcjkmCcv1EA08mJk0RmbVyoG34qIflr/eQgZpU4zwbc14zUx6ypcpCQb4oF+qmoqv/aaAKSUJpLR0vSImxUZafiI0eBXFKgrNTJy+ZKOSnD+577DcaMt/y0RMkUkpcqVHTCMmCkMMVaUqRGsKXQU9YSSS87mmBjFjXWebYlvZEKWTkApeEqZobAuMnZKH0IX4GJYhbOrICZ9fVi1VQkVoHw+Omsz8mtvkCtfgZUiNrWju0wemT8WC02C7+T99/DD587cQ7Vms/hHyUvkjkO8BuQCroW3IPwL5CyBbrAK4ScfNC5RnOTdsyTdBO39hN+zQHxiNOejXwcztcGixPeFhHZ4RctMlb2cq7JJ5gaurNjO0tGIPb1q0pa1IrqesAwqsV7b7YcRpySnmchFsW6a9aa/6mAxRC+j643ps4ZjDfAy6Pm7fU0hRZLGoyCcKPkKYrVlTudqkMSXafLQf0aflRF7APEsuFMloUHE7KJ/Ah9xebehbWXpbV+bnzY0dv6f6Dj5ZqVpwYRl79bsN/5S9ou2UpiEt2dTVLo6XZ9VVqJ43TUq9j0nnM6NIbIKKqD5+dh+XQd9T7uHAbMsIh9MlqPnChtqp8TV2ltxogCELFpePnQ3Q3nIBvXxTyr2jXMb2PG30tyhKgsNBa/LXn8S4BL4Pdh8Le4eD/j+ULGgLCx1V2AnJdQK6YzovUtUo7FRqTDY7i9V0yG1MOFF+rpvD4jsrZ68lO5IGGtpvTaF0yuYGEv9faaz4m6dS27+7cNVwbkEqBgjEre0+ncatsgbNTaddb2fvf9dF7v788vL68//mLrc/eP4e5yQ/e5XbUZy6FNyKpi3JVX1A2O+72/MPT9qaJVbu6+fVfv7lw+TcU+eLe5Qym8igI7V/1At7I202nJ44x59YtoRjCOWKBxhHhmZLDmw6muXxX9TgWBcdOYoqp1HCVoglx9Ne5x+VaQ/FnGgNK/OcFyWd9k5GEexvuXEJRRKL6xVVnGzslvT1yaUzYoxHEbxuexkp+YwoD/Eb
https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html#c=zVbtbtowFH0Viz8JUmbCuk4rpdXWjq2V2Ogoo6qW/TCJAWuOHdkOkFZ999lxQgjQbWjStEhI8f049/h+hQUSYEHwEgtwBhhegkssSRrDcS5znTA/XnKmEGFYOM3TgAVsob24IDPC6l6XSCj9htgRnAoev8czgbF026898Er/jnzfNwDGXSExw+oAd3hcAQSs1QIDSyDhhCmNmROGmCmiCJYQRZH7GDCgn4RLLeOsU3D2SrF2BB1QWJkn5JSLzpqOOcH+9cer0UX/a8+r7BKywvSWPOAOeOlvyHmqqE7T5R6Yu6vrUW/X9I5Eaq5RrOKpMKBogmmNmcIr1QGOvbOzTWUwnUqs9Y9g1QG+BzLDa41mngUWioSIWoA1t3FNDEeDm4JIwJ7WiR7ZUh2SaFvdwxL9cdjrfb7v9fuDu/8h1fbW/zjVetAwkHOe0qhIm+LAsdl0gBkK4NgmduwYRUTg0ORcT9LuFMl0ogQKlVvUoxyA/UPnNg2PXRTGRYyoLoG7juZVgS33kDPJKYaUz9wtlaEpuEJG8gkpQVYV15FATE41voR1kw/6qjdFO40x5SFRmVuyrwUo4E/8CtVC2CUyLGDv3Uo5h4oPUaQvJ90XJ/7mtUvXOKWKJDRz67Q8G8rbupAB0NUbE5nmiaoYblVpiLK9hSrDXWS3ukWQ2Mx02zfPgTUzU7mTLh29fqoKJOdkqnTCD2Z3/HfcyrjVW8HpT7bM2tkqNKa2R1ZXhP2SIoUF06JaN9iyudXQ1utp5c0CN8z0+oiwqG0JitnMrJO8OhvTr3hiWiuVZjtU4glXSocvNEd1n9hwJIg+9+WBS6Lm72gyR64P3zS398Yvc0UNeVyjXiZQE/m2r0e+b1Bb2qXZ/j3bfOs+Q+2B83jE3S2izdOG1+hKlVF8bh3fkjjhQoFUUBfClsJxQnU02Zqk4Q+sYCjz9ui2SqduRBaARGdBY+uPStAAIUVSas00pfkHJGicd1vavuZGuS4Jmw300qYoMybz9nnfCiGE3ZY+7nopzukEiQ3Enw
https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html#c=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
https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html#c=xVRNb9swDP0rQi61h1RJtgwD2iRYm6FDgX0US7dTLopNx8JkyZBkp26Q/z5athwnwW4DpoMBkXwU+R7pkmlSctiBJnMiYUeWYHiR0V/OFlxF7rpU0jIuQV8NyZ5wmah79UJuSMKEAXIIb9eySUJNBBJoDJtiu0rV7kGzDMwT6BVESsb4htUF1OH4rotFUx+KrsYZcR0JeJTGMhnBaXGfQWVgdeW9wX4tCZ5ta8fKetHLSnAZg/YoH10fAXJrU4yfjutDx8Ojz6r8B4t5YdB96tkoa1XWOd9eYjNmQXMm0OurUEJpmugaJ2OVBXsm8pRhwISOD2EDPYRtDmat5pvCQp2/V29UZzlLes7Gnce611xI0KfDGfDRoevKf96HvgYsoVEUVcg1z7jl5ZkAT958zryvoS77VMG2sUzFIL4yrPDl2EZzn9KsEJbnorqvnjWTRjDLlQyO3bfhzpkonRkKzNhvStv0Z/6sHvgLxG7iAt8r00ghZ/Kd4+ITbDWACa4/uKanUzoOw55qfZY6ZHBkyQv9F0zbRtAS2WmZ58C0m+KTucSt8OQ4Te66uP6EJsjCjdua/mg6egpcGEsunJFQBuLW7ueq1bRZz05VQ1kcB901dNtnwD5KHN+SiSApZORECP0UdsG0L+X8f0l5zHg9RWXIG4IVpFQ3OxaiZo3I/0zbmqPDcBLeDoaDmbGVgEUD+MizHMsnhRYBpSMLWY5dgxltiug3WBoZU2NnIw+axbwkPJ6vB2c/2fUANWTGoCcphFjxV1gPFrMRxp/AhMI/kNx+L0ELVtUh6WTxpTFSSmcjvF6irFJiw3Qv4x8
https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html#c=fVHJTsMwEP0VK5cmIjhpKZc2rZBCxQVBBRKnXNxk0lp17Mh2UgXUf2eyiUIlfLLfMm9mXDNNag4n0GRFJJxIDIZXBf3oMHeSds9YScu4BD3xlolMZI0uoSRabqdhiFBeydRyRLDEVhne3l2PfCWS4GmlNysS0vB+2SMabKXlGBYzbfHG5B3NtSoeYa8BjIs2n8zR5ZNZ2B4atvHnPr/VyLgRXGZd8/0UFKTFdDCUZZk75JdDR4vLCWMmxI6lx61WJWjbuBet+yRnwoDn9/50TFmME3VTgdzbA2LzoTn/h7OqfGMZrwzSs2t6p6xVxX+KglnQnAlkx36VUJo+vW02L4MOF3H2lo7vRMY2AtY9+sCLUmlLKi1cSgMLRSmwmAl2VXoES1Nj2i1GwWiKMl4Tnq0S589nJw5JBTMGmbwS4p1/QuKsowD1v2xC4SBy/1qDFqxpJYfp+rkHKaVRgM9rl1UK968vKn4D
*/

//https://stackoverflow.com/questions/2792443/finding-the-centroid-of-a-polygon
function compute2DPolygonCentroid(vertices, vertexCount) {
    let centroid = [0, 0];
    let signedArea = 0.0;
    let x0 = 0.0; //Current vertex X
    let y0 = 0.0; //Current vertex Y
    let x1 = 0.0; //Next vertex X
    let y1 = 0.0; //Next vertex Y
    let a = 0.0; //Partial signed area

    //For all vertices except last
    let i: number;
    for (i = 0; i < vertexCount - 1; i++) {
        x0 = vertices[i][0];
        y0 = vertices[i][1];
        x1 = vertices[i + 1][0];
        y1 = vertices[i + 1][1];
        a = x0 * y1 - x1 * y0;
        signedArea += a;
        centroid[0] += (x0 + x1) * a;
        centroid[1] += (y0 + y1) * a;
    }

    //Do last vertex separately to avoid performing an expensive
    //modulus operation in each iteration.
    x0 = vertices[i][0];
    y0 = vertices[i][1];
    x1 = vertices[0][0];
    y1 = vertices[0][1];
    a = x0 * y1 - x1 * y0;
    signedArea += a;
    centroid[0] += (x0 + x1) * a;
    centroid[1] += (y0 + y1) * a;

    signedArea *= 0.5;
    centroid[0] /= 6.0 * signedArea;
    centroid[1] /= 6.0 * signedArea;

    return centroid;
}

//Group packets by 24 period TODO: probably make this better with array.slice()
function groupPackets() {
    let temp = [];
    for (let i = 0; i < czml.length; i++) {
        if (czml[i].id !== czml[1].id) temp.push(czml[i]);
        else {
            result.push(temp);
            temp = [];
            temp.push(czml[i]);
        }
    }
    result.push(temp);
}

groupPackets();

let dayCount = 0;
test.process(result.shift()); //document packet
test.process(result[dayCount]); //1st satellites' packet

viewer.dataSources.add(test);

//Add drop down menu that lets user track any satellite that is loaded
function addTrackingMenu() {
    let options = result[1]
        .map(satellite => {
            return satellite.label.text;
        })
        .sort();

    let menu = document.createElement("select");
    menu.className = "tracking-menu";
    menu.onchange = () => {
        let item = options[menu.selectedIndex];
        viewer.trackedEntity = test.entities.getById("Satellite/" + item);
        viewer.trackedEntity.viewFrom = new Cesium.Cartesian3(-100, 0, 200000);
    };
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.textContent = options[i];
        menu.appendChild(option);
    }
    document.body.appendChild(menu);
}

addTrackingMenu();

let prevDay = Cesium.JulianDate.toGregorianDate(viewer.clock.startTime);

/**
 * This method leverages collective synergy to drive "out of the box"
 * thinking and formulate key objectives into a win-win game plan with a
 * quality-driven approach that focuses on empowering key players to drive-up
 * their core competencies and increase expectations with an all-around
 * initiative to drive down the bottom-line. I really wanted to work the word
 * "mandrolic" in there, but that word always makes me want to punch myself in
 * the face.
 */
viewer.clock.onTick.addEventListener(clock => {
    //Load the correct 24 packet of satellite data based on the current datetime
    let gregorianDate = Cesium.JulianDate.toGregorianDate(clock.currentTime);
    if (prevDay.day !== gregorianDate.day) {
        dayCount = Math.floor(
            Cesium.JulianDate.daysDifference(clock.currentTime, viewer.clock.startTime)
        );
        dayCount %= result.length; //so that it can loop from the end time back to start

        test.process(result[dayCount]);
    }
    prevDay.day = gregorianDate.day;

    polyInfo: for (let i = 0; i < polyInfo.length; i++) {
        let secDiff = Cesium.JulianDate.secondsDifference(polyInfo[i][0], clock.currentTime);
        //Only add polygons that are less than or equal to 4 minutes from being captured...
        if (secDiff <= 240) {
            //and have not already been captured
            if (secDiff > 0) {
                //Search through the entire array and if polygon is not there then add it https://jsperf.com/dankmemes
                geoJsonSources[i].show = false;
                for (let j = 0; j < nearPolys.length; j++)
                    if (
                        nearPolys[j][0].dayNumber == polyInfo[i][0].dayNumber &&
                        nearPolys[j][0].secondsOfDay == polyInfo[i][0].secondsOfDay
                    )
                        continue polyInfo;
                nearPolys.unshift(polyInfo[i]);
            } else {
                //Because there will only ever be 1 of each polygon in the array thanks to above, we only need to search until the first occurrence
                geoJsonSources[i].show = true;
                for (let j = 0; j < nearPolys.length; j++)
                    if (
                        nearPolys[j][0].dayNumber == polyInfo[i][0].dayNumber &&
                        nearPolys[j][0].secondsOfDay == polyInfo[i][0].secondsOfDay
                    ) {
                        viewer.scene.primitives.remove(primitives[nearPolys[j][1] + "cone"]);
                        nearPolys.splice(j, 1);
                        break;
                    }
            }
        } else {
            //Handle in case user clicks on timeline
            viewer.scene.primitives.remove(primitives[polyInfo[i][1] + "cone"]);
            geoJsonSources[i].show = false;
            let index = nearPolys.indexOf(polyInfo[i]);
            if (index > -1) nearPolys.splice(0, index + 1);
        }
    }

    //For each near-in-time polygon, figure out the position and orientation for the cone and render it
    for (let i = 0; i < nearPolys.length; i++) {
        posOfSat = satellites
            .getById("Satellite/" + nearPolys[i][1])
            .position.getValue(clock.currentTime);

        Cesium.Cartesian3.subtract(nearPolys[i][2], posOfSat, direction);
        let length = Cesium.Cartesian3.magnitude(direction);
        let halfLength = length / 2.0;
        Cesium.Cartesian3.normalize(direction, direction);

        rotationMatrix = Cesium.Transforms.rotationMatrixFromPositionVelocity(posOfSat, direction);
        Cesium.Matrix3.multiply(rotationMatrix, rot90, rotationMatrix);

        //Visualize direction
        Cesium.Cartesian3.multiplyByScalar(direction, length, directionRay);
        Cesium.Cartesian3.add(posOfSat, directionRay, directionRay);

        //Shift cone position so that the apex is at the satellite, cone should point to 'target' from 'origin'
        Cesium.Cartesian3.multiplyByScalar(direction, halfLength, shiftPos);
        Cesium.Cartesian3.add(posOfSat, shiftPos, shiftPos);

        if (Cesium.defined(primitives[nearPolys[i][1] + "cone"]))
            viewer.scene.primitives.remove(primitives[nearPolys[i][1] + "cone"]);

        primitives[nearPolys[i][1] + "cone"] = viewer.scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: new Cesium.CylinderGeometry({
                        length: length,
                        topRadius: 10,
                        bottomRadius: 9000
                    }),
                    attributes: {
                        color: new Cesium.ColorGeometryInstanceAttribute(0.0, 0.4, 1.0, 0.7)
                    }
                }),
                modelMatrix: Cesium.Matrix4.fromRotationTranslation(
                    rotationMatrix,
                    shiftPos,
                    coneMatrix
                ),
                appearance: new Cesium.PerInstanceColorAppearance({
                    flat: true,
                    translucent: true,
                    closed: true
                }),
                asynchronous: false,
                show: true
            })
        );
    }
});

// viewer.entities.add({
// 	polyline: {
// 		positions: [posOfSat, directionRay],
// 		width: 1,
// 		material: Cesium.Color.WHITE
// 	}
// });
