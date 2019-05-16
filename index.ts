import czml from "./orbit.json";

declare var Cesium: any;

const viewer = new Cesium.Viewer('cesiumContainer', {
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

const polys = {
	"type": "FeatureCollection",
	"features": [
		{
			"id": "3ad4bb1e-653f-11e9-ab8f-931ab064d08e",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.684329518506,
							49.3531991320591
						],
						[
							16.8231907938923,
							49.3510917449607
						],
						[
							16.813605781116,
							49.0899288496113
						],
						[
							16.6754736682237,
							49.0920170296222
						],
						[
							16.684329518506,
							49.3531991320591
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190422_124428_ssc8_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-22T08:44:28.761-04:00"//Skysat C8
			}
		},
		{
			"id": "4d1e753c-66b9-11e9-9a15-b3459543d5c3",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.5487577839596,
							49.5100114209987
						],
						[
							16.8563177688673,
							49.5054841445847
						],
						[
							16.8534732461127,
							49.4301681353662
						],
						[
							16.5463840460467,
							49.4346834569556
						],
						[
							16.5487577839596,
							49.5100114209987
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190423_093614_ssc2_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-23T05:36:14.939-04:00"//Skysat C2
			}
		},
		{
			"id": "36229b82-6778-11e9-902f-27b11a8dbb77",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.6562559706977,
							49.2279886803489
						],
						[
							16.7816446711278,
							49.2261222933622
						],
						[
							16.7728366098145,
							48.9795425445878
						],
						[
							16.648067091976,
							48.981392876583
						],
						[
							16.6562559706977,
							49.2279886803489
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190425_093207_ssc4_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-25T05:32:07.385-04:00"//Skysat C4
			}
		},
		{
			"id": "155c90b0-66ba-11e9-8685-1b852229804d",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.6287238379485,
							49.7059880680719
						],
						[
							16.7558391933738,
							49.7041303339559
						],
						[
							16.7466323593146,
							49.4469010577707
						],
						[
							16.620182799348,
							49.4487420818486
						],
						[
							16.6287238379485,
							49.7059880680719
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190424_122403_ssc9_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-24T08:24:03.134-04:00"//Skysat C9
			}
		},
		{
			"id": "a100a14a-6798-11e9-b971-0768d821c9fd",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.595956087764,
							49.3116414140985
						],
						[
							16.7143662600647,
							49.3099451052511
						],
						[
							16.7062625964765,
							49.0749484141484
						],
						[
							16.5884115425794,
							49.0766308073314
						],
						[
							16.595956087764,
							49.3116414140985
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190425_123305_ssc11_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-25T08:33:05.297-04:00"//Skysat C11
			}
		},
		{
			"id": "8aa11fd8-66bc-11e9-84b7-6f8c152af4aa",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.2262185858662,
							49.7409993975507
						],
						[
							16.5194258135946,
							49.7375242651875
						],
						[
							16.5116026517736,
							49.4852584634352
						],
						[
							16.2199040538085,
							49.4887029307305
						],
						[
							16.2262185858662,
							49.7409993975507
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190424_123854_ssc10_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-24T08:38:54.362-04:00"//Skysat C10
			}
		},
		{
			"id": "706cd9e4-6799-11e9-9a45-f35ebcffb87b",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.6315766951624,
							49.3253570409926
						],
						[
							16.7471235224098,
							49.3236676658795
						],
						[
							16.7383760749958,
							49.074785755718
						],
						[
							16.6234071212927,
							49.0764604562217
						],
						[
							16.6315766951624,
							49.3253570409926
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190425_123139_ssc11_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-25T08:31:39.301-04:00"//Skysat C11
			}
		},
		{
			"id": "75e3c800-7005-11e9-b094-0fea437b3c69",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							-97.8211597144768,
							30.3632478051884
						],
						[
							-97.6897710430842,
							30.3619966433198
						],
						[
							-97.6922499443018,
							30.1751788207701
						],
						[
							-97.8233901812642,
							30.1764206938463
						],
						[
							-97.8211597144768,
							30.3632478051884
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190505_170650_ssc4_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-05-05T13:06:50.167-04:00"//Skysat C4
			}
		},
		{
			"id": "ef0b4704-6ba9-11e9-8a47-3326fa6a2b7d",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.4691855677588,
							49.7224780378755
						],
						[
							16.6171002966163,
							49.7205071268472
						],
						[
							16.6089923704476,
							49.4747548357746
						],
						[
							16.4618185884615,
							49.4767088041668
						],
						[
							16.4691855677588,
							49.7224780378755
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190430_124705_ssc6_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-30T08:47:05.814-04:00"//Skycat C6
			}
		},
		{
			"id": "3c8c6958-6c2d-11e9-87ad-6bff64da80d5",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.7045826818325,
							49.2235000309816
						],
						[
							16.8077863723052,
							49.2219305320959
						],
						[
							16.8010882710747,
							49.0374219077108
						],
						[
							16.698266502228,
							49.0389812918125
						],
						[
							16.7045826818325,
							49.2235000309816
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190501_100621_ssc1_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-05-01T06:06:21.32-04:00"//Skysat C1
			}
		},
		{
			"id": "28d67136-6c2f-11e9-a504-8b6ca9120d25",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							16.6317229748762,
							49.7024413515085
						],
						[
							16.7488600510482,
							49.7007314248164
						],
						[
							16.7405770858544,
							49.4685240964588
						],
						[
							16.6239941780171,
							49.470220131995
						],
						[
							16.6317229748762,
							49.7024413515085
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190501_100652_ssc1_u0001",
				"final_resolution": 0.8,
				"scene_start_time": "2019-05-01T06:06:52.435-04:00"//Skysat C1
			}
		},
		{
			"id": "4edc650a-6ce5-11e9-9795-c32ce2a00f6e",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							73.7095555132557,
							18.519353301628
						],
						[
							73.8279497773742,
							18.5201243382124
						],
						[
							73.8292775211227,
							18.3239923134439
						],
						[
							73.7110172921879,
							18.3232300090661
						],
						[
							73.7095555132557,
							18.519353301628
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190422_053948_ssc3_u0002",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-22T01:39:48.396-04:00"//Skysat C3
			}
		},
		{
			"id": "c34d79f6-6cea-11e9-8b29-d7cb12f2995c",
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[
							73.7156190001055,
							18.5526698982835
						],
						[
							73.8367953791127,
							18.5534554805575
						],
						[
							73.8381032773311,
							18.3591741855225
						],
						[
							73.71706306126,
							18.3583974026817
						],
						[
							73.7156190001055,
							18.5526698982835
						]
					]
				]
			},
			"properties": {
				"source": "SkySat",
				"product_name": "20190422_052127_ssc2_u0002",
				"final_resolution": 0.8,
				"scene_start_time": "2019-04-22T01:21:27.531-04:00"//Skysat C2
			}
		}
	]
};

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
polys.features = polys.features.map(feature => {
	feature.id = feature.properties.product_name;
	return feature;
}).sort((a, b) => {
	return a.properties.scene_start_time < b.properties.scene_start_time ? -1 : 1;
});

const polyInfo = polys.features.map(feature => {
	//Figure out which source its from, then parse and return the datetime and which satellite it is
	switch (feature.properties.source) {
		case "SkySat": {
			let prodname = feature.properties.product_name.split("_");
			let st = prodname[0].concat(prodname[1]);
			let pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;//Parse to ISO 8601 in UTC
			let dt = Cesium.JulianDate.fromDate(new Date(st.replace(pattern, '$1-$2-$3T$4:$5:$6Z')));

			let vertices = feature.geometry.coordinates[0];//smh GeoJSON with its array nesting
			let targetPoints = compute2DPolygonCentroid(vertices, vertices.length);

			return [dt, "SKYSAT-".concat(prodname[2].slice(2).toUpperCase()),
				Cesium.Cartesian3.fromDegrees(targetPoints[0], targetPoints[1])];
		}
		case "Kompsat": {
			//TODO Get sample data and figure out how to do this
			break;
		}
		default: {
			alert("This source, ${feature.properties.source}, isn't supported yet");
		}
	}
});

const test = new Cesium.CzmlDataSource();
/*
TODO get the cone working, orientation is going to be in javascript because its so much easier, translation might be a bit harder
then you can set the length of the cone again programmatically based on the distance between the satellite and the nearest not showing polygon
we only do this calculation for the current satellite that is being tracked to be more efficient or for the polygon(s) that is/are upcoming.
there can be multiple polygons that were taken at the same time so we should have an array of polygons, storing the ones that are coming up
the most recently probably within the next lets say 5 min to start tho this value could change. this will happen inside the onTick() function
so we want it to be as efficient as possible so that we lose as little fps as possible. this is why we don't calculate directions and such
for every single polygon because we don't know the number of polygons there could be. to get the array of polygons within the next little bit,
we can take advantage of the fact that the polygons are sorted in chronological order, so that when we hit the first polygon that isn't in the
next little bit, we just break out of the loop. once the time passes of course, we can remove the polygon from the array. we can (possibly)
show the line in advance just to show that the satellite is targeting this area next, and then flash the cone for about 1 second starting 1
second before the capture time. then animate (probably a fade just cuz I know how to do them) the polygon getting filled in at the same time
the cone is visible

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
	let x0 = 0.0; // Current vertex X
	let y0 = 0.0; // Current vertex Y
	let x1 = 0.0; // Next vertex X
	let y1 = 0.0; // Next vertex Y
	let a = 0.0;  // Partial signed area

	// For all vertices except last
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

	// Do last vertex separately to avoid performing an expensive
	// modulus operation in each iteration.
	x0 = vertices[i][0];
	y0 = vertices[i][1];
	x1 = vertices[0][0];
	y1 = vertices[0][1];
	a = x0 * y1 - x1 * y0;
	signedArea += a;
	centroid[0] += (x0 + x1) * a;
	centroid[1] += (y0 + y1) * a;

	signedArea *= 0.5;
	centroid[0] /= (6.0 * signedArea);
	centroid[1] /= (6.0 * signedArea);

	return centroid;
}

//Group packets by 24 period TODO: probably make this better with array.slice()
let temp = [], result = [];
for (let i = 0; i < czml.length; i++) {
	if (czml[i].id !== czml[1].id)
		temp.push(czml[i]);
	else {
		result.push(temp);
		temp = [];
		temp.push(czml[i]);
	}
}
result.push(temp);

let dayCount = 0;
test.process(result.shift());//document packet
test.process(result[dayCount]);//1st satellites' packet

viewer.dataSources.add(test);

//Add drop down menu that lets user track any satellite that is loaded
let options = result[1].map(satellite => {
	return satellite.label.text;
}).sort();

let menu = document.createElement('select');
menu.className = 'tracking-menu';
menu.onchange = () => {
	let item = options[menu.selectedIndex];
	viewer.trackedEntity = test.entities.getById('Satellite/' + item);
	viewer.trackedEntity.viewFrom = new Cesium.Cartesian3(-100, 0, 200000);
};
for (let i = 0; i < options.length; i++) {
	let option = document.createElement('option');
	option.textContent = options[i];
	menu.appendChild(option);
}
document.body.appendChild(menu);

const rot90 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-90));
let posOfSat = new Cesium.Cartesian3(), direction = new Cesium.Cartesian3(),
	directionRay = new Cesium.Cartesian3(), shiftPos = new Cesium.Cartesian3();
let rotationMatrix = new Cesium.Matrix3();
let nearPolys = [], newPrimitives: { [id: string]: any } = {};
let satellites = test.entities;
let coneMatrix = new Cesium.Matrix4();

let sources = [];
for (let i = 0; i < polys.features.length; i++) {
	Cesium.GeoJsonDataSource.load(polys.features[i], {
		stroke: Cesium.Color.HOTPINK,
		fill: Cesium.Color.PINK,
	}).then(myDataSource => {
		myDataSource.show = false;
		viewer.dataSources.add(myDataSource);
		sources.push(myDataSource);
	});
}

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
	let gregorianDate = Cesium.JulianDate.toGregorianDate(clock.currentTime);
	if (prevDay.day !== gregorianDate.day) {
		dayCount = Math.floor(Cesium.JulianDate.daysDifference(clock.currentTime, viewer.clock.startTime));
		dayCount %= result.length;//so that it can loop from the end time back to start

		test.process(result[dayCount]);
	}
	prevDay.day = gregorianDate.day;

	polyInfo: for (let i = 0; i < polyInfo.length; i++) {
		let secDiff = Cesium.JulianDate.secondsDifference(polyInfo[i][0], clock.currentTime);
		if (secDiff <= 240) {//Only add polygons that are less than or equal to 5 minutes from being captured
			if (secDiff > 0) {//and have not already been captured
				//Search through the entire array and if polygon is not there then add it https://jsperf.com/dankmemes
				sources[i].show = false;
				for (let j = 0; j < nearPolys.length; j++)
					if (nearPolys[j][0].dayNumber == polyInfo[i][0].dayNumber && nearPolys[j][0].secondsOfDay == polyInfo[i][0].secondsOfDay)
						continue polyInfo;
				nearPolys.push(polyInfo[i]);
			} else {
				//Because there will only ever be 1 of each polygon in the array thanks to above, we only need to search until the first occurrence
				sources[i].show = true;
				for (let j = 0; j < nearPolys.length; j++)
					if (nearPolys[j][0].dayNumber == polyInfo[i][0].dayNumber && nearPolys[j][0].secondsOfDay == polyInfo[i][0].secondsOfDay) {
						viewer.scene.primitives.remove(newPrimitives[nearPolys[j][1] + "cone"]);
						nearPolys.splice(j, 1);
						break;
					}
			}
		} else {
			viewer.scene.primitives.remove(newPrimitives[polyInfo[i][1] + "cone"]);
			sources[i].show = false;
			let index = nearPolys.indexOf(polyInfo[i]);
			if (index > -1)
				nearPolys.splice(index);
		}
	}

	for (let i = 0; i < nearPolys.length; i++) {
		posOfSat = satellites.getById('Satellite/' + nearPolys[i][1]).position.getValue(clock.currentTime);

		Cesium.Cartesian3.subtract(nearPolys[i][2], posOfSat, direction);
		let length = Cesium.Cartesian3.magnitude(direction);
		let halfLength = length / 2.0;
		Cesium.Cartesian3.normalize(direction, direction);

		rotationMatrix = Cesium.Transforms.rotationMatrixFromPositionVelocity(posOfSat, direction);
		Cesium.Matrix3.multiply(rotationMatrix, rot90, rotationMatrix);

		// Visualize direction
		Cesium.Cartesian3.multiplyByScalar(direction, length, directionRay);
		Cesium.Cartesian3.add(posOfSat, directionRay, directionRay);

		//Shift cone position so that the apex is at the satellite, cone should point to 'target' from 'origin'
		Cesium.Cartesian3.multiplyByScalar(direction, halfLength, shiftPos);
		Cesium.Cartesian3.add(posOfSat, shiftPos, shiftPos);

		if (Cesium.defined(newPrimitives[nearPolys[i][1] + "cone"])) {
			viewer.scene.primitives.remove(newPrimitives[nearPolys[i][1] + "cone"]);
		}

		newPrimitives[nearPolys[i][1] + "cone"] = viewer.scene.primitives.add(new Cesium.Primitive({
			geometryInstances: new Cesium.GeometryInstance({
				geometry: new Cesium.CylinderGeometry({
					length: length,
					topRadius: 10,
					bottomRadius: 9000,
				}),
				attributes: {
					color: new Cesium.ColorGeometryInstanceAttribute(0.0, 0.4, 1.0, 0.7)
				},
			}),
			modelMatrix: Cesium.Matrix4.fromRotationTranslation(rotationMatrix, shiftPos, coneMatrix),
			appearance: new Cesium.PerInstanceColorAppearance({
				flat: true,
				translucent: true,
				closed: true
			}),
			asynchronous: false,
			show: true,
		}));
	}
});

const flags = new Set();
const uniquePolyInfo = polyInfo.filter(entry => {
	if (flags.has(entry[1]))
		return false;
	flags.add(entry[1]);
	return true;
});

for (let i = 0; i < uniquePolyInfo.length; i++) {
	newPrimitives[uniquePolyInfo[i][1] + "cone"] = viewer.scene.primitives.add(new Cesium.Primitive({
		geometryInstances: new Cesium.GeometryInstance({
			geometry: new Cesium.CylinderGeometry({
				length: length,
				topRadius: 0,
				bottomRadius: 3000,
			}),
			attributes: {
				color: new Cesium.ColorGeometryInstanceAttribute(0.0, 0.4, 1.0, 0.7)
			},
		}),
		appearance: new Cesium.PerInstanceColorAppearance({
			flat: true,
			translucent: true,
			closed: true
		}),
		show: false,
		releaseGeometryInstances: false
	}));
}

// viewer.entities.add({
// 	polyline: {
// 		positions: [posOfSat, directionRay],
// 		width: 1,
// 		material: Cesium.Color.WHITE
// 	}
// });