function printSLD() {
    var canvas = document.getElementById("canvas1");
    alert(canvas.childElementCount);
    var can = canvas.children[1];
    var img = can.toDataURL("image/png");
    document.write('<img src="' + img + '"/>');
}