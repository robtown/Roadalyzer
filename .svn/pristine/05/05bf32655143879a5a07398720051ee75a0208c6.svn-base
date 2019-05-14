var mapInit = false;
var routePoints = [];
dojo.require("esri.map");
dojo.require("esri.layers.agstiled");
dojo.require("esri.toolbars.draw");


function getPoints(routeName,min,max,curMile) {
    var getPointsUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/LatLong/"+routeName+"/"+min+"/"+max;
    //$.ajaxSetup({ "async": false });
    var tempPt;
    
    $.getJSON(getPointsUrl, function (data) {
        
        $.each(data, function (key, val) {
            var point = new Object();
            for (ea in val) {
                point[ea] = val[ea];
            }
            if (point.M == curMile || routePoints.length == 0) {
                tempPt = point;
            } else {
                var arrayInd = routePoints.length - 1;
                if (parseFloat(curMile) > routePoints[arrayInd].M && parseFloat(curMile)< point.M) {
                    tempPt = point;
                }
            }
            routePoints.push(point);
        });
        drawRoute(routePoints);
        drawLocationPoint(tempPt.X, tempPt.Y);
    });
    
}

//function drawLocationPoint(X, Y) {  //determine point location 

//    //map.graphics.remove(locatorGraphic);

//    // must convert X,Y coords to webmercator to plot correctly 
//    var convertGeom = esri.geometry.geographicToWebMercator(new esri.geometry.Point(X, Y, map.spatialReference));

//   // var sym = new esri.symbol.SimpleMarkerSymbol().setSize(20).setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND).setColor(new dojo.Color("#ff0000"));
//    var sym = new esri.symbol.PictureMarkerSymbol('images/SandC.png', 25, 25);
//    this.locatorGraphic = new esri.Graphic(convertGeom, sym);
//    this.locatorGraphic.id = "locatorGraphic";


//    dojo.forEach(map.graphics.graphics, function (g) {
//        if (g && g.id === "locatorGraphic") {
//            //remove graphic with specific id
//            map.graphics.remove(g);
//        }
//    }, this);

//    this.map.graphics.add(this.locatorGraphic);

//    // locatorLayer.clear();
//    //map.getLayer('locatorLayer').clear();
//    //map.graphics.remove(map.graphics.graphics[map.graphics.graphics.length -1]);

//    // locatorLayer.add(locatorGraphic);
//    // map.graphics.add(locatorGraphic);
//}

function drawLocationPoint(X, Y) {  //determine point location

    //map.graphics.remove(locatorGraphic);

    // must convert X,Y coords to webmercator to plot correctly
    var convertGeom = esri.geometry.geographicToWebMercator(new esri.geometry.Point(X, Y, map.spatialReference));

    var sym = new esri.symbol.PictureMarkerSymbol('images/SandC.png', 25, 25);

    this.locatorGraphic = new esri.Graphic(convertGeom, sym);
    this.locatorGraphic.id = "locatorGraphic";


    dojo.forEach(map.graphics.graphics, function (g) {
        if (g && g.id === "locatorGraphic") {
            //remove graphic with specific id
            map.graphics.remove(g);
        }
    }, this);
     this.map.graphics.add(this.locatorGraphic);
    //var newwidth = map.extent.width * .1;
    //var newheight = map.extent.height * .1;

    //var newminx = map.extent.xmin + newwidth;
    //var newminy = map.extent.ymin + newheight;
    //var newmaxx = map.extent.xmax - newwidth;
    //var newmaxy = map.extent.ymax - newheight;

    var newextent = map.extent;

   // var newextent = new esri.geometry.Extent(newminx, newminy, newmaxx, newmaxy);
  if (!newextent.contains(convertGeom)) {
        map.centerAt(convertGeom);
    }

    


}


var map, tb;
function init() {
    if (mapInit == false) {
        var initExtent = new esri.geometry.Extent({ "xmin": -12836528.782095946, "ymin": -939258.2035679615, "xmax": 7200979.560687953, "ymax": 9079495.967823988, "spatialReference": { "wkid": 4326 } });
        map = new esri.Map("map", { extent: initExtent });
        dojo.connect(map, "onLoad", initToolbar);

        map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"));
        //map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer"));
        mapInit = true;
    }
}

// assumes ROUTE is an array of ESRI.Geometry.Points
function setMapExtents(route) {
    var minX, maxX, minY, maxY;
    //	debugger;	
    //prime values before loop
    minX = maxX = route[0].x;
    minY = maxY = route[0].y;

    for (var i = 1; i < route.length; i++) {

        if (route[i].x < minX) {
            minx = route[i].x;
        }
        if (route[i].x > maxX) {
            maxX = route[i].x;
        }
        if (route[i].y < minY) {
            minY = route[i].y;
        }
        if (route[i].y > maxY) {
            maxY = route[i].y;
        }

    }
    //	var zoomExtent = new esri.geometry.Extent(minX, minY, maxX, maxY,
    //      new esri.SpatialReference({wkid:4326}) );
    var tmpWidth = maxX - minX;
    var tmpHeight = maxY - minY;
    minX = minX - tmpWidth / 20;
    maxX = maxX + tmpWidth / 20;
    minY = minY - tmpHeight / 20;
    maxY = maxY + tmpHeight / 20;

    map.setExtent(new esri.geometry.Extent({
        "xmin": minX,
        "ymin": minY,
        "xmax": maxX,
        "ymax": maxY,
        "spatialReference": {
            "wkid": 4326
        }
    }), true);


    // map.setExtent(zoomExtent,true);
    // map.setExtent(minX,minY,maxX,maxY);

}

function initToolbar(map) {
    tb = new esri.toolbars.Draw(map);
    dojo.connect(tb, "onDrawEnd", addGraphic);
    testPoint();

}

function zoomToLocation(X, Y) {
    var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(X, Y));
    // addGraphic(pt);     

    map.centerAndZoom(pt, 12);
}



function drawRoute(jsonPoints) {
    var arr = [];
    var polyline = new esri.geometry.Polyline(new esri.SpatialReference({ wkid: 4326 }));
    var polylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 205]), 4);
    // var tmpPoint = new esri.geometry.Point( 0, 0, map.spatialReference);
    var attrName;
    var attrValue;


    //	alert("jsonPoints.length " + jsonPoints.length);
    for (var i = 0; i < jsonPoints.length ; i++) {
        var obj = jsonPoints[i];
        var tmpPoint = new esri.geometry.Point(0, 0, map.spatialReference);

        for (var key in obj) {
            attrName = key;
            attrValue = obj[key];


            if (attrName.toUpperCase() == "X") {
                tmpPoint.X = attrValue;

            }
            if (attrName.toUpperCase() == "Y") {
                tmpPoint.Y = attrValue;


                var baseGeom = new esri.geometry.Point(tmpPoint.X, tmpPoint.Y, map.spatialReference);
                // must convert X,Y coords to webmercator to plot correctly 
                var convertGeom = esri.geometry.geographicToWebMercator(baseGeom);

                arr.push(convertGeom);
            }

        }
    }
    //alert(arr);
    setMapExtents(arr);
    polyline.addPath(arr);
    //map.graphics.clear();
    map.graphics.add(new esri.Graphic(polyline, polylineSymbol));
    //map.centerAndZoom(polyline, 12); 

}

function testPoint() {  //determine point location of Mustang, OK
    // alert(map.spatialReference.wkid);
    var baseGeom = new esri.geometry.Point(-97.722778, 35.392778, map.spatialReference);
    // must convert X,Y coords to webmercator to plot correctly 
    var convertGeom = esri.geometry.geographicToWebMercator(baseGeom);
    var sym = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 205]));
    sym.Color = new dojo.Color("blue")


    var gr = new esri.Graphic(convertGeom, sym);
    map.graphics.add(gr);
}

function drawPoint(location) {  //determine point location of Mustang, OK
    // alert(map.spatialReference.wkid);
    var baseGeom = new esri.geometry.Point(location.X, location.Y, map.spatialReference);
    // must convert X,Y coords to webmercator to plot correctly 
    var convertGeom = esri.geometry.geographicToWebMercator(baseGeom);
    var sym = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 205]));
    sym.Color = new dojo.Color("blue")


    var gr = new esri.Graphic(convertGeom, sym);
    map.graphics.add(gr);
}



function addGraphic(geometry) {
    //alert(geometry.x + " - " + geometry.y);
    var symbol = dojo.byId("symbol").value;
    if (symbol) {
        symbol = eval(symbol);
    }
    else {
        var type = geometry.type;
        if (type === "point" || type === "multipoint") {
            symbol = tb.markerSymbol;
        }
        else if (type === "line" || type === "polyline") {
            symbol = tb.lineSymbol;
        }
        else {
            symbol = tb.fillSymbol;
        }
    }

    map.graphics.add(new esri.Graphic(geometry, symbol));
}
function closeMap() {
    $('#grayCover').hide();
    $('#startModal').hide();
    $('#mapModal').hide();
}
//dojo.addOnLoad(init);