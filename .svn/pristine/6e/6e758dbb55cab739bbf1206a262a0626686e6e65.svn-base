
function drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, sign, culv, redraw, stages,currPanel) {
    //function drawCanvas() {
    var stage, stage2;
    var totpanels = 0;
    var streetWidth = 0;
    var dragBarInitX = 0;
    var tempPanel = currPanel;
    
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
    var perPixel = scale / 72;
    
    var windowWidth,bottWindowHeight;
    var totalMiles = mileEnd - mileStart;
    var totalFeet = totalMiles * 5280;
    var totalPixels = (totalFeet / scale) * 72 + 16;
    streetWidth = totalPixels - 16;
    if (scaleUnits == "mi") {
        var tempPixel = perPixel * .000189393940;
        perPixel = tempPixel;
    }
    if (totalPixels > 8064) {
        if (totalPixels % 8064 == 0) {            
            totpanels = totalPixels / 8064;
        } else {
            totpanels = parseInt(totalPixels / 8064) + 1;
        }
        //streetWidth = totalpixels - ((currPanel-1)*8064)
    } else {
        totpanels = 1;
        
    }
   // if (currPanel > totpanels) {
        //currPanel = 1;
    //}
    var toppanels = addPanels(totpanels);
    var bottompanels = addPanels(totpanels);
    

    // Go ahead and figure out the width of the street to display here:
    var street = addStreet(totpanels, currPanel, streetWidth);
     if (street.getWidth() < 1012) {
            windowWidth = 1020;
     } else if (currPanel > 1 && currPanel != totpanels && totpanels > 1) {
         windowWidth = street.getWidth();
     }else {
         windowWidth = street.getWidth() + 8;
     }
     $('#canvas1').css("width", windowWidth);
     $('#canvas2').css("width", windowWidth);

    // Create Panel Links for tiling
    if (totpanels > 1) {
        for (var o = 1; o < totpanels + 1; o++) {
           var pMiles =  getPanelMiles(totpanels, totalMiles, totalFeet,totalPixels, o, scale,scaleUnits);
            var oLink = o;
            var link = $('<li><a href=\'javascript:changePanel(' + o + ');\'>' + pMiles.begMile + '-' + pMiles.endMile + '</a></li>');
            
            link.appendTo("#panelLinks");
        }
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
        var contOffset = $("#container").offset();
        var canvasOffset = $("#canvas2").offset();
        stage.removeChildren();
        stage.setSize(windowWidth, 210);
        dragBarInitX = Math.abs(contOffset.left - canvasOffset.left);
        if (dragBarInitX > windowWidth) {
            dragBarInitX = windowWidth - 26;
        }
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
        stage2.setSize(windowWidth, stage2Height);
        stage2.draw();

    }
    
    // Moving in a different direction. three new layers to use for the Map and specifications bars.
    
    var mapViewLayer = new Kinetic.Layer();
    var specViewLayer = new Kinetic.Layer();
    var ticksLayer = new Kinetic.Layer();
    var ticksLayer2 = new Kinetic.Layer();

    // GUI Elements... Dragbars, etc...
    var streetLayer = new Kinetic.Layer();
    var messageLayer = new Kinetic.Layer();
    var messageLayer2 = new Kinetic.Layer();
    var dataElementsLayer = new Kinetic.Layer();
    bottWindowHeight = addDataBars(stage2, dataElementsLayer, scale, scaleUnits, windowWidth, messageLayer2,currPanel);

    // Bubble for Data layers toolTIP
    var dataBubble = new Image();
    var dataBubbleL = new Image();
    var dataBubbleR = new Image();
    var image;
    dataBubble.src = "images/stats-Bubble1.png";
    dataBubbleL.src = "images/stats-BubbleLeft.png";
    dataBubbleR.src = "images/stats-BubbleRight.png";
   

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

    //Objects for yellow drag boxes
    var dragBarLayer = new Kinetic.Layer({
        draggable: true,
        dragConstraint: "horizontal",
        x: dragBarInitX,
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
        x: dragBarInitX,
        dragBounds: {
            top: 0,
            right: stage.getWidth() - 25,
            bottom: 0,
            left: 0
        },
    });
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
        moveBox2(dragBarLayer2, this.attrs.x,perPixel,scaleUnits,currPanel);
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
        moveBox1(dragBarLayer, this.attrs.x,perPixel,scaleUnits,currPanel);
    });

    // GUI elements.
    ticksLayer.clear();
    messageLayer.clear();
    //culvertLayer.clear();
    
    streetLayer.add(street);
    stage.add(streetLayer);
    
    
   
   stage2.setSize(windowWidth, bottWindowHeight+20);
    //Adding elements from the DB:
    
    if (interchanges.length > 0) {
        var interchangesLayer = new Kinetic.Layer();
        addInterchanges(stage, interchangesLayer, scale, totalPixels, windowWidth, messageLayer, interchanges,currPanel);
        stage.add(interchangesLayer);
        interchangesLayer.draw();
    }
    if (culverts.length > 0) {
        var culvertLayer = new Kinetic.Layer();
        addCulverts(stage, culvertLayer, scale, totalPixels, windowWidth, messageLayer, culverts,currPanel);
        stage.add(culvertLayer);
        culvertLayer.draw();
    }
    if (signs.length > 0) {
        var signsLayer = new Kinetic.Layer();
        addSigns(stage, signsLayer, scale, totalPixels, windowWidth, messageLayer, signs,currPanel);
        stage.add(signsLayer);
        signsLayer.draw();
    }
    stage.add(dragBarLayer);
    stage2.add(dragBarLayer2);
    stage.add(messageLayer);
    stage2.add(messageLayer2);
    addTickMarks(stage, stage2, ticksLayer, ticksLayer2, messageLayer, scale, scaleUnits, windowWidth, currPanel);

    stage.draw();
    stage2.draw();
    // This function relocates the yellow bar(s) on inititialization and panel updates.
    $(function () {
       // var oldHUDpos = HUDtest.attrs.x;
        var position1 = $("#container").offset();
        var position1b = $("#canvas1").offset();
        var canX = (dragBarLayer.attrs.x + ((currPanel - 1) * 8064));
        canX = canX * perPixel;
        canX = canX.toFixed(2);
        currentMile = canX;
        $("#bar1").text("Yellow Bar location: " + canX + " " + scaleUnits);
        if (routePoints.length > 0) {
            if (scaleUnits == "ft") {
                var canX2 = canX / 5280;
                moveLocator(canX2);
            } else {
                moveLocator(canX);
            }
         }
       // $("#testText2").text("Container DIV: " + position1.left);
            
        $('#canvas1Div').scroll(function () {
            
            var position2 = $("#canvas1").offset();
            var position2 = $("#canvas2").offset();
            var rightSide = $('#canvas1Div').width()-20;
            if (dragBarLayer.attrs.x < Math.abs(position1.left - position2.left)) {
                $("#bar2").text("Scrolling: " + position2.left);
                var newX = (Math.abs(position1.left - position2.left) * perPixel)/5280 + " " + scaleUnits;
                moveBox1(dragBarLayer, Math.abs(position1.left - position2.left),perPixel,scaleUnits,tempPanel);
                moveBox2(dragBarLayer2, Math.abs(position1.left - position2.left),perPixel,scaleUnits,tempPanel);
               }
            if (dragBarLayer.attrs.x > Math.abs(position1.left - position2.left)+rightSide) {
                $("#bar3").text("Scrolling: " + (Math.abs(position1.left - position2.left) + rightSide));
                moveBox1(dragBarLayer, Math.abs(position1.left - position2.left)+(rightSide-16),perPixel,scaleUnits,tempPanel);
                moveBox2(dragBarLayer2, Math.abs(position1.left - position2.left)+(rightSide-16),perPixel,scaleUnits,tempPanel);
            }
        });
    })
    var stages = new Array(stage,stage2);
    return stages;

   

}