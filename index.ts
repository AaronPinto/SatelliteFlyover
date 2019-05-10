import czml from "./orbit.json";
import Cesium from './Cesium.js';

const viewer = new Cesium.Viewer('cesiumContainer', {
	shouldAnimate: true,
	skyAtmosphere: false,
	imageryProvider: new Cesium.UrlTemplateImageryProvider({
		url: `https://api.mapbox.com/styles/v1/skywatch-team/cjsgety8v0s2m1fo49t27s093/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2t5d2F0Y2gtdGVhbSIsImEiOiJjajgzMGlyNmk1ZTBqMnducWFidjNqZjU4In0.6f5beyt2YsWJcAPfxRYuEw`
	})
});
viewer.scene.fxaa = false;
viewer.scene.backgroundColor = Cesium.Color.WHITE;
viewer.scene.globe.baseColor = Cesium.Color.BLUE;
viewer.scene.highDynamicRange = false;
viewer.scene.fog.enabled = false;
viewer.scene.globe.showGroundAtmosphere = false;

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

// polys.features = polys.features.map(feature => {
// 	feature.id = feature.properties.product_name;
// 	return feature;
// }).sort((a, b) => {
// 	return a.properties.scene_start_time < b.properties.scene_start_time ? -1 : 1;
// });

// let polySatTimes = polys.features.map(feature => {
// 	//Figure out which source its from, then parse and return the datetime and which satellite it is
// 	switch (feature.properties.source) {
// 		case "SkySat": {
// 			let prodname = feature.properties.product_name.split("_");
// 			let st = prodname[0].concat(prodname[1]);
// 			let pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
// 			let dt = Cesium.JulianDate.fromDate(new Date(st.replace(pattern, '$1-$2-$3T$4:$5:$6Z')));
//
// 			return [Cesium.JulianDate.toGregorianDate(dt), "SKYSAT-".concat(prodname[2].slice(-2).toUpperCase())];
// 		}
// 		case "Kompsat": {
// 			//TODO Get sample data and figure out how to do this
// 			break;
// 		}
// 	}
// });

// viewer.dataSources.add(Cesium.GeoJsonDataSource.load(polys, {
// 	stroke: Cesium.Color.HOTPINK,
// 	fill: Cesium.Color.PINK,
// }));

const test = new Cesium.CzmlDataSource();
//TODO tracking, add new satellite packet every 24 hours and then swap tracking to the satellite that will fly overhead a polygon 1 min beforehand
//this lets you have useful non-random ID's so that you can track, because cesium is dumb af and doesn't let you track by name for some fucking reason

//Group packets by 24 period
// let temp = [], result = [];
// for (let i = 0; i < czml.length; i++) {
// 	if (czml[i].id !== czml[1].id)
// 		temp.push(czml[i]);
// 	else {
// 		result.push(temp);
// 		temp = [];
// 		temp.push(czml[i]);
// 	}
// }
// result.push(temp);
//
// let dayCount = 0;
// test.process(result.shift());//document packet
// test.process(result[dayCount++]);//1st satellites' packet

test.load(czml);
viewer.dataSources.add(test);

// //Add drop down menu that lets user track any satellite that is loaded
// let options = result[1].map(satellite => {
// 	return satellite.label.text;
// }).sort();
//
// let menu = document.createElement('select');
// menu.className = 'tracking-menu';
// menu.onchange = () => {
// 	let item = options[menu.selectedIndex];
// 	viewer.trackedEntity = test.entities.getById('Satellite/' + item);
// 	viewer.trackedEntity.viewFrom = new Cesium.Cartesian3(-100, 0, 100000);
// };
// for (let i = 0; i < options.length; i++) {
// 	let option = document.createElement('option');
// 	option.textContent = options[i];
// 	menu.appendChild(option);
// }
// document.body.appendChild(menu);
//
// let prevDay = Cesium.JulianDate.toGregorianDate(viewer.clock.startTime);
// viewer.clock.onTick.addEventListener(clock => {
// 	let gregorianDate = Cesium.JulianDate.toGregorianDate(clock.currentTime);
// 	if (prevDay.day != gregorianDate.day) {
// 		//FIX THIS BECAUSE IT BREAKS IF YOU CLICK ON THE TIMELINE
// 		//relate the current day to the index number of the array
// 		dayCount %= (result.length);//so that it can loop from the end time back to start
// 		test.process(result[dayCount++]);
// 	}
// 	prevDay.day = gregorianDate.day;
// });