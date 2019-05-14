function drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, sign, culv,redraw,stages) {
    //function drawCanvas() {
    var stage,stage2;

    // This tests to see if the two stages have been instantiated and drawn to, if the stages array exists and has two
    // items in it, then we are redrawing the stage(s).
    if (stages != null && stages.length == 2) {
        stage = stages[0];
        stage2 = stages[1];
    } else {
        getItems(routeName, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, sign, culv);
    }
    $('#scaleDiv').css("display", "block");
    var scale = figureScaleFeet(scaleFactor);
    var scaleUnits = figureScaleUnits(scaleFactor);
    var windowWidth,bottWindowHeight;
    var totalMiles = mileEnd - mileStart;
    var totalFeet = totalMiles * 5280;
    var totalPixels = (totalFeet / scale) * 72;
    if (totalPixels > 8064) {
        $('#canvas1').css("width", 8064);
        $('#canvas2').css("width", 8064);
        $('#canvas1Div').css("width", 960);
        $('#canvas2Div').css("width", 960);
        //$('#canvasDIV1').css("width", totalPixels);
        windowWidth = 8064;
    } else {
        $('#canvas1').css("width", totalPixels);
        $('#canvas2').css("width", totalPixels);
        $('#canvas1Div').css("width", 960);
        $('#canvas2Div').css("width", 960);

        windowWidth = totalPixels;
    }

    var stage1Height = 210;
    var stage2Height = 800;
    if (stage == null) {
        stage = new Kinetic.Stage({
            container: "canvas1",

            width: windowWidth,
            height: stage1Height
        });
    } else {
        //stage.children[4].clear();
        //stage.children[5].clear();
        stage.removeChildren();
        stage.setSize(windowWidth, 210);
        //stage.attrs.width = windowWidth;
        stage.draw();
    }
    if (stage2 == null) {
        var stage2 = new Kinetic.Stage({
            container: "canvas2",
            width: windowWidth,
            height: stage2Height
        });
    } else {
        stage2.removeChildren();
        //stage2.attrs.width = windowWidth;
        stage2.setSize(windowWidth, stage2Height);
        stage2.draw();

    }
    
    // Moving in a different direction. three new layers to use for the Map and specifications bars.
    var mapViewLayer = new Kinetic.Layer();
    var specViewLayer = new Kinetic.Layer();
    var ticksLayer = new Kinetic.Layer();
    var ticksLayer2 = new Kinetic.Layer();

    // GUI Elements... Dragbars, etc...

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
   
    var streetLayer = new Kinetic.Layer();
    var messageLayer = new Kinetic.Layer();
    var messageLayer2 = new Kinetic.Layer();
    var dataElementsLayer = new Kinetic.Layer();
    bottWindowHeight = addDataBars(stage2, dataElementsLayer, scale, scaleUnits, windowWidth, messageLayer2);

    // Bubble for Data layers toolTIP
    var dataBubble = new Image();
    var dataBubbleL = new Image();
    var dataBubbleR = new Image();
    var image;
    dataBubble.src = "images/stats-Bubble1.png";
    dataBubbleL.src = "images/stats-BubbleLeft.png";
    dataBubbleR.src = "images/stats-BubbleRight.png";
    //imageObj.onload = function () {
    bubble = new Kinetic.Image({
        x: 0,
        y: 0,
        image: dataBubble,
        width: 160,
        height: 78,
        visible: false
    });
    bubbleL = new Kinetic.Image({
        x: 0,
        y: 0,
        image: dataBubbleL,
        width: 160,
        height: 72,
        visible: false
    });
    bubbleR = new Kinetic.Image({
        x: 0,
        y: 0,
        image: dataBubbleR,
        width: 160,
        height: 72,
        visible: false
    });
    var tooltip = new Kinetic.Text({
        x: 7,
        y:7,
        text: "",
        textFill: "black",
        fontFamily: "Arial",
        fontSize: 9,
        padding: 5,
        visible: false,
        alpha: 0.75
    });
    var tooltip2 = new Kinetic.Text({
        x: 7,
        y: 20,
        text: "",
        textFill: "black",
        fontFamily: "Arial",
        fontSize: 9,
        padding: 5,
        visible: false,
        alpha: 0.75
    });
    var tooltip3 = new Kinetic.Text({
        x: 7,
        y: 33,
        text: "",
        textFill: "black",
        fontFamily: "Arial",
        fontSize: 9,
        padding: 5,
        visible: false,
        alpha: 0.75
    });
    messageLayer2.add(bubble);
    messageLayer2.add(bubbleL);
    messageLayer2.add(bubbleR);
    messageLayer2.add(tooltip);
    messageLayer2.add(tooltip2);
    messageLayer2.add(tooltip3);

    //Line Objects for yellow drag boxes

    var blackLine = new Kinetic.Line({
        points: [8, 0, 8, stage1Height],
        stroke: "black",
        strokeWidth: .25
    });
    var blackLine2 = new Kinetic.Line({
        points: [8, 0, 8, bottWindowHeight+20],
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
        width: 15,
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
        width: 15,
        height: bottWindowHeight+20,
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

    // GUI elements.
    ticksLayer.clear();
    messageLayer.clear();
    //culvertLayer.clear();
    streetLayer.add(street);
    stage.add(streetLayer);
   addStripes(stage, streetLayer, street, 0, 40);
   addTickMarks(stage, stage2, ticksLayer, ticksLayer2, messageLayer, scale, scaleUnits, windowWidth);
   
   stage2.setSize(windowWidth, bottWindowHeight+20);
    //Adding elements from the DB:
    
    if (interchanges.length > 0) {
        var interchangesLayer = new Kinetic.Layer();
        addInterchanges(stage, interchangesLayer, scale, totalPixels, windowWidth, messageLayer, interchanges);
        stage.add(interchangesLayer);
    }
    if (culverts.length > 0) {
        var culvertLayer = new Kinetic.Layer();
        addCulverts(stage, culvertLayer, scale, totalPixels, windowWidth, messageLayer, culverts);
        stage.add(culvertLayer);
    }
    if (signs.length > 0) {
        var signsLayer = new Kinetic.Layer();
        addSigns(stage, signsLayer, scale, totalPixels, windowWidth, messageLayer, signs);
        stage.add(signsLayer);
    }
    
    stage.add(dragBarLayer);
    stage2.add(dragBarLayer2);
    stage.add(messageLayer);
    stage2.add(messageLayer2);
    stage.draw();
    stage2.draw();

    var stages = new Array(stage,stage2);
    return stages;

   

}