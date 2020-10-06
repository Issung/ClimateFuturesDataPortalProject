var map;
var view;
var sketch;
var wbmu;

require([
    "esri/Map", 
    "esri/views/MapView",
    "dojo/dom",
    "esri/geometry/support/webMercatorUtils",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/widgets/BasemapToggle"
], function(Map, MapView, dom, webMercatorUtils, Sketch, GraphicsLayer, BasemapToggle) {
    const layer = new GraphicsLayer();

    wbmu = webMercatorUtils;
    
    // More basemaps here: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
    map = new Map({
        basemap: "hybrid",
        layers: [layer]
    });

    view = new MapView({
        container: "mapDiv",
        map: map,
        zoom: 7,
        center: [146.4, -41.7] // longitude, latitude
    });

    //https://developers.arcgis.com/javascript/latest/sample-code/intro-widgets/index.html 
    var toggle = new BasemapToggle({
        // 2 - Set properties
        view: view, // view that provides access to the map's 'topo-vector' basemap
        nextBasemap: "topo-vector" // allows for toggling to the 'hybrid' basemap
    });

    view.ui.add(toggle, "top-right");

    sketch = new Sketch({
        layer: layer,
        view: view,
        container: document.getElementById('map-controls'),
        creationMode: "update",
        availableCreateTools: ["rectangle"],
        defaultUpdateOptions: {
            enableRotation: false,
            toggleToolOnClick: false
        }
    });

    //Don't add to view anymore because it is part of the outer DOM (options box).
    //view.ui.add(sketch, "top-right");

    //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
    /*view.on("click", function(event) {
        // Override default popup for our custom popup.
        view.popup.autoOpenEnabled = false;

        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        view.popup.open({
            title: "Reverse geocode: [" + lon + ", " + lat + "]",
            location: event.mapPoint,
            content: "This is a point of interest"
        });
    });*/
    
    //https://community.esri.com/thread/213365-show-coordinates-wont-work-in-4x
    view.on("pointer-move", showCoordinates);

    function showCoordinates(evt) {
        var point = view.toMap({x: evt.x, y: evt.y});
        
        //The map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(point);
        
        //Display mouse coordinates
        dom.byId("info").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
    }
});