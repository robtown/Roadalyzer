function addPanels(panels) {
    var pansArray = [];
    for (var e = 0; e < panels; e++) {
        var pan = new Kinetic.Layer();
        pansArray.push(pan);
    }
    return pansArray;

}

function getPanelMiles(numPans, miles, feet, pixels, currPan ,scale, scaleUnits) {
    var panel = { begMile: 0, endMile: 0 };
    //var allButLast = (numPans-1) * 8064;
    var last = pixels - ((numPans-1)*8064)
    var begM,endM,begF,endF;
    if (currPan != numPans) {
        begM = ((currPan * 8064 / 72) * scale);
        endM = ((currPan * 8064 / 72) * scale)/5280;
    } else {
        begM = (((currPan) * 8064 / 72) * scale);
        endM = miles;
    }
        if (scaleUnits == "mi") {
            panel.begMile = (begM - ((8064 / 72) * scale)) / 5280;
            panel.endMile = endM;
    } else {
            panel.begMile = (begM - ((8064 / 72) * scale));
            panel.endMile = endM * 5280;
    }
        return panel;

}