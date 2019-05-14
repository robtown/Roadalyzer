function drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv) {
//function drawCanvas() {
    getItems(routeName, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, signs, culv);
    var culvertss=culverts;
    //culvertss = getCulverts(routeName, mileStart, mileEnd, "CULV");
    var windowWidth;
    var totalMiles = mileEnd - mileStart;
    var totalFeet = totalMiles * 5280;
    var totalPixels = (totalFeet / scaleFactor) * 72;
    if (totalPixels > 8000) {
        $('#canvas1').css("width", 8000);
        $('#canvas2').css("width", 8000);
        //$('#canvasDIV1').css("width", totalPixels);
        windowWidth = 8000;
    } else {
        $('#canvas1').css("width", totalPixels);
        $('#canvas2').css("width", totalPixels);
        windowWidth = 2000;
    }

    var stage1Height = 210;
    var stage2Height = 800;
    var stage = new Kinetic.Stage({
        container: "canvas1",

        width: windowWidth,
        height: stage1Height
    });
    var stage2 = new Kinetic.Stage({
        container: "canvas2",
        width: windowWidth,
        height: stage2Height
    });
    // Moving in a different direction. three new layers to use for the Map and specifications bars.
    var mapViewLayer = new Kinetic.Layer();
    var specViewLayer = new Kinetic.Layer();

    //

    var dragBarLayer = new Kinetic.Layer({
        draggable: true,
        dragConstraint: "horizontal",
        dragBounds: {
            top: 0,
            right: stage.getWidth() - 25,
            bottom: 0,
            left: 0
        },
    });
    var dragBarLayer2 = new Kinetic.Layer({
        draggable: true,
        dragConstraint: "horizontal",
        dragBounds: {
            top: 0,
            right: stage.getWidth() - 25,
            bottom: 0,
            left: 0
        },
    });

    var culvertLayer = new Kinetic.Layer();
    var streetLayer = new Kinetic.Layer();
    var messageLayer = new Kinetic.Layer();
    
    //Line Objects

    var blackLine = new Kinetic.Line({
        points: [13, 0, 13, stage1Height],
        stroke: "black",
        strokeWidth: .25
    });
    var blackLine2 = new Kinetic.Line({
        points: [13, 0, 13, stage2Height],
        stroke: "black",
        strokeWidth: .25
    });

    var street = new Kinetic.Rect({
        x: 0,
        y: 90,
        width: windowWidth,
        height: 30,
        fill: "#999",
        draggable: false
    });


    var dragBox = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 25,
        height: stage1Height,
        fill: "yellow",
        alpha: .5,
        strokeWidth: 0
    });

    dragBarLayer.on("dragmove", function () {
        moveBox2(dragBarLayer2, this.attrs.x);
    });
    dragBarLayer.add(dragBox);
    dragBarLayer.add(blackLine);

    var dragBox2 = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 25,
        height: stage2Height,
        fill: "yellow",
        alpha: .5,
        strokeWidth: 0,
        dragConstraint: "horizontal",
        draggable: true
    });
    dragBarLayer2.add(dragBox2);
    dragBarLayer2.add(blackLine2);
    dragBarLayer2.on("dragmove", function () {
        moveBox1(dragBarLayer, this.attrs.x);
    });
    streetLayer.add(street);
    addCulverts(stage, culvertLayer, messageLayer, culvertss);
    addStripes(stage, streetLayer, street, 0, 40);
    stage.add(streetLayer);
    stage.add(culvertLayer);
    stage.add(dragBarLayer);
    stage2.add(dragBarLayer2);
    stage.add(messageLayer);
    stage.draw();
    stage2.draw();


}