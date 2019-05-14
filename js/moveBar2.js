function moveBox2(stage2, x, perPix, units,curPan) {
    var context = stage2;
    var Xunits = (x + ((curPan - 1) * 8064)) * perPix;
    Xunits = Xunits.toFixed(2);
    context.attrs.x = x;
    if (units == "mi") {
        currentMile = Xunits;
    } else {
        currentMile = Xunits / 5280;
        currentMile = currentMile.toFixed(2);
    }
    if (routePoints.length > 0) {
        moveLocator(currentMile);
    }
    $("#bar1").text(Xunits);
    context.draw();
}
function moveBox1(stage1, x, perPix,units,curPan) {
    var context = stage1;
    var Xunits = (x + ((curPan - 1) * 8064)) * perPix;
    Xunits = Xunits.toFixed(2);
    context.attrs.x = x;
    if (units == "mi") {
        currentMile = Xunits;
    } else {
        currentMile = Xunits / 5280;
        currentMile = currentMile.toFixed(2);
    }
    if (routePoints.length > 0) {
        moveLocator(currentMile);
    }
    $("#bar1").text(Xunits);
    context.draw();
}

function moveLocator(curMile) {
    var tempPt;
    
    for (i = 0; i < routePoints.length;i++){
    if (i == 0) {
        tempPt = routePoints[i];
    } else {
        var arrayInd = i - 1;
        if (parseFloat(curMile) > routePoints[arrayInd].M && parseFloat(curMile) < routePoints[i].M){
            tempPt = routePoints[i];
        }
     }
   }
   // if ($('#mapModal').visible) {
        drawLocationPoint(tempPt.X, tempPt.Y);
    //}
}

function moveBox(dbLayer1, dbLayer2, thisBar, x, perPix, units, curPan) {
    var context,context2;
    if (thisBar == 1) {
      context = dbLayer2;
    } else if (thisBar == 2) {
        context = dbLayer1;
    } else {
        context = dbLayer1;
        context2 = dbLayer2;
    }
    var Xunits = (x + ((curPan - 1) * 8064)) * perPix;
    Xunits = Xunits.toFixed(2);
    if (thisBar != "both") {
        context.attrs.x = x;
        context.draw();
    } else {
        context.attrs.x = x;
        context2.attrs.x = x;
        context.draw();
        context2.draw();
    }
    
    if (units == "mi") {
        currentMile = Xunits;
    } else {
        currentMile = Xunits / 5280;
        currentMile = currentMile.toFixed(2);
    }
    if (routePoints.length > 0) {
        moveLocator(currentMile);
    }
    $("#bar1").text(Xunits);
    
}
//$(function () {
//    var oldHUDpos = HUDtest.attrs.x;
//    var position1 = $("#container").offset();
//    $("#testText").text("Blue Box location: " + HUDtest.attrs.x);
//    $("#testText2").text("Container DIV: " + position1.left);

//    $('#wrapper').scroll(function () {
//        var position = $("#container").offset();
//        var HUDpos = Math.abs(position1.left - position.left) + oldHUDpos;
//        HUDtest.setX(HUDpos);
//        stage.draw();
//        $("#testText").text("Blue Box location: " + HUDtest.attrs.x);
//        $("#testText2").text("Container DIV: " + position.left);
//        writeMessage(messageLayer, "Blue Box location: " + HUDtest.attrs.x, HUDpos + 50)
//    });
//})