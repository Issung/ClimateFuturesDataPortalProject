require([
    "esri/Map", 
    "esri/views/MapView",
    "esri/geometry/support/webMercatorUtils",
    "dojo/dom"
], function(Map, MapView, webMercatorUtils, dom) {
    var map = new Map({
        basemap: "satellite" // More here: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
    });

    var view = new MapView({
        container: "mapDiv",
        map: map,
        zoom: 7,
        center: [146.4, -41.7] // longitude, latitude
    });

    //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
    view.on("click", function(event) {
        // Override default popup for our custom popup.
        view.popup.autoOpenEnabled = false;

        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        view.popup.open({
            title: "Reverse geocode: [" + lon + ", " + lat + "]",
            location: event.mapPoint,
            content: "This is a point of interest"
        });
    });
    
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