
(function () {
	var clockViewModel = new Cesium.ClockViewModel();
	var viewOptions = {
		homeButton: false,
		infoBox: false,
		navigationHelpButton: true,
		fullscreenButton : true,
		sceneModePicker : false,
		geocoder: false,
		animation: false,
		selectionIndicator: false,
		clockViewModel: clockViewModel,
		shouldAnimate: false,	 
		scene3DOnly: true,

	}
    var viewOptionsLeft = viewOptions;
    viewOptionsLeft.homeButton = false;
    viewOptionsLeft.navigationHelpButton = false;

	var options3D = {
		homeButton : true, 
		fullscreenButton : false,
		sceneModePicker : false,
		baseLayerPicker: false,
		infoBox : false,
		geocoder : false,
		navigationHelpButton : false,
		selectionIndicator: false,
		scene3DOnly: true,
		imageryProvider: Cesium.createWorldImagery(),
		clockViewModel : clockViewModel
	};
	var options2D = {
		homeButton : true,
		sceneModePicker : false, 
		fullscreenButton : true,
		baseLayerPicker: false,
		infoBox : false,
		geocoder : false,
		navigationHelpButton : false,
		animation : false,
		selectionIndicator: false,
		scene3DOnly: true,
		timeline: false,
		imageryProvider: Cesium.createWorldImagery(),
		clockViewModel : clockViewModel
	};

	var viewLeft = new Cesium.Viewer('viewLeft', options3D);

    viewLeft.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask : true,
        requestVertexNormals : true
    });
    viewLeft.scene.globe.depthTestAgainstTerrain = true;
    viewLeft.scene.globe.enableLighting = true;
    
    /* Zoom in a bit */
    viewLeft.camera.zoomIn(3000000.0);
	
    $("#viewLeft .cesium-viewer-bottom").hide()

	var czmlDataSourceLeft = new Cesium.CzmlDataSource();
    viewLeft.dataSources.add(czmlDataSourceLeft);
    czmlDataSourceLeft.load('Source/data/run0/autosat-1.czml').then(function() {
	
		//https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=CZML%20Custom%20Properties.html&label=CZML	
		var scoreLeftObject = czmlDataSourceLeft.entities.getById('score');
		var scorePropLeft = scoreLeftObject.properties['score'];
	
		var updateScoreLeft = function(time) {
			result = scorePropLeft.getValue(time);
			if (result) {
				$("#scoreUntrained").text((parseInt(result)).toString());
			}
		}

		//Setup Callback
		//FIXME: Eventually fix this so that there isn't an event sent out ever milisecond or whatever ...
		var leftScoreCallback = function(time) {
			/* Update every minute */
			if (parseInt(time.secondsOfDay) % 10 == 0) {
				updateScoreLeft(time);
			}
		};
		//Add time change event listener
		clockViewModel.clock.onTick.addEventListener(function(clock) {
			leftScoreCallback(clock.currentTime);	
		});	

		function updateScoreLeftMouseMove() {
			updateScoreLeft(clockViewModel.clock.currentTime);
		}
		//Add timeline click mouseup listener
		$("body").on("mousedown", '.cesium-timeline-icon16', function(event) {
			$("body").on('mousemove', updateScoreLeftMouseMove); 
			$("body").one('mouseup', function(event) {
				$("body").off('mousemove', updateScoreLeftMouseMove); 
			});
		});
		
		$("#leftSpinner").hide();
	});

	var viewRight = new Cesium.Viewer('viewRight', options2D)
    viewRight.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask : true,
        requestVertexNormals : true
    });
    viewRight.scene.globe.depthTestAgainstTerrain = true;
    viewRight.scene.globe.enableLighting = true;

    viewRight.camera.zoomIn(3000000.0);

	var czmlDataSourceRight = new Cesium.CzmlDataSource();
    viewRight.dataSources.add(czmlDataSourceRight);
    //czmlDataSourceRight.load('Source/data/autosat_run99.czml');
    czmlDataSourceRight.load('Source/data/run99/autosat-1.czml').then(function() {
		//https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=CZML%20Custom%20Properties.html&label=CZML	
		var scoreRightObject = czmlDataSourceRight.entities.getById('score');
		var scorePropRight = scoreRightObject.properties['score'];
		
		var updateScoreRight = function(time) {
			result = scorePropRight.getValue(time);
			if (result) {
				$("#scoreTrained").text((parseInt(result)).toString());
			}
		}

		//Setup Callback
		var rightScoreCallback = function(time) {
			/* Update every minute */
			if (parseInt(time.secondsOfDay) % 10 == 0) {
				updateScoreRight(time);
			}
		};
		
		//Add time change event listener
		clockViewModel.clock.onTick.addEventListener(function(clock) {
			rightScoreCallback(clock.currentTime);	
		});	
		
		function updateScoreRightMouseMove() {
			updateScoreRight(clockViewModel.clock.currentTime);
		}
		//Add timeline click mouseup listener
		$("body").on("mousedown", '.cesium-timeline-icon16', function(event) {
			$("body").on('mousemove', updateScoreRightMouseMove); 
			$("body").one('mouseup', function(event) {
				$("body").off('mousemove', updateScoreRightMouseMove); 
			});
		});
		
		$("#rightSpinner").hide();
	});

	//Split view
	//https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Multiple%20Synced%20Views.html

	var worldPosition;
	var distance;

	function syncLeftViews() {
		// The center of the view is the point that the 3D camera is focusing on
		var viewCenterLeft = new Cesium.Cartesian2(Math.floor(viewLeft.canvas.clientWidth / 2), Math.floor(viewLeft.canvas.clientHeight / 2));
		// Given the pixel in the center, get the world position
		var newWorldPosition = viewLeft.scene.camera.pickEllipsoid(viewCenterLeft);
		if (Cesium.defined(newWorldPosition)){
			// Guard against the case where the center of the screen
			// does not fall on a position on the globe
			worldPosition = newWorldPosition;
		}
		// Get the distance between the world position of the point the camera is focusing on, and the camera's world position
		distance = Cesium.Cartesian3.distance(worldPosition, viewLeft.scene.camera.positionWC);
		// Tell the 2D camera to look at the point of focus. The distance controls how zoomed in the 2D view is
		// (try replacing `distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)
		viewRight.scene.camera.lookAt(worldPosition, new Cesium.Cartesian3(0.0, 0.0, distance));
	}

	// Apply our sync function every time the 3D camera view changes
	viewLeft.camera.changed.addEventListener(syncLeftViews);
	// By default, the `camera.changed` event will trigger when the camera has changed by 50%
	// To make it more sensitive, we can bring down this sensitivity
	viewLeft.camera.percentageChanged = 0.01;

	// Since the 2D view follows the 3D view, we disable any
	// camera movement on the 2D view
	viewRight.scene.screenSpaceCameraController.enableRotate = false;
	viewRight.scene.screenSpaceCameraController.enableTranslate = false;
	viewRight.scene.screenSpaceCameraController.enableZoom = false;
	viewRight.scene.screenSpaceCameraController.enableTilt = false;
	viewRight.scene.screenSpaceCameraController.enableLook = false;

    var slide1Title = $("#cogModalTitle").html();
    var slide1Body = $("#cogModalBody").html();

    $('body').on('click', '#button1', function(event) {
        $(".modalBtn").removeClass("btn-danger");
        $("#button1").addClass("btn-danger");
        $("#cogModalTitle").html(slide1Title);
        $("#cogModalBody").html(slide1Body);
    });
    $('body').on('click', '#button2', function(event) {
        $(".modalBtn").removeClass("btn-danger");
        $("#button2").addClass("btn-danger");
        $("#cogModalTitle").html("Harnessing the Power of AI");
        $("#cogModalBody").html($("#slide2Body").html());
    });
    $('body').on('click', '#button4', function(event) {
        $(".modalBtn").removeClass("btn-danger");
        $("#button4").addClass("btn-danger");
        $("#cogModalTitle").html("Enabling the Future in Space");
        $("#cogModalBody").html($("#slide4Body").html());
    });

	$('#viewLeft .cesium-home-button').hide();
	$('body').on('click', '#viewRight .cesium-home-button', function(event) {
		$("#viewLeft .cesium-home-button").click();
		//viewLeft.homeButton.viewModel.command();
		event.stopPropagation();
	});

	$('#introModal').modal('show');
}());
