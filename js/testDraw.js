function testDraw() {
    var culvertss = [];
    culvertss = getCulverts("I 29 N",0,151.8,"CULV");
    var scaleFactor = 5000;
    var windowWidth;
    //var totalMiles = mileEnd - mileStart;
    var totalMiles = 151.8 - 0;
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
}