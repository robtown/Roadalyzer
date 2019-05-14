var culvertUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/XingFeatures/CULV/I%2029%20N/0/151.8";
var StuffUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/XingFeatures/";
jQuery.support.cors = true;

var county_lines = [];
var culverts = [];
var interchanges = [];
var rrCrossings = [];
var bridges = [];
var streams = [];
var signs = [];

function getItems(routeName, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, signs, culv) {
    if (culv != null) {
        culverts = getCulverts(routeName, mileStart, mileEnd,culv);
    }
    if (countyLine != null) {
        county_lines = getCountyLines(routeName, mileStart, mileEnd, countyLine);
    }
    if (interChange != null) {
        interChanges = getXchanges(routeName, mileStart, mileEnd, interChange);
    }
    
}

function getCulverts(routeName, mileStart, mileEnd, culv) {
    var getUrl = StuffUrl + culv + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var culvertIdArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        var items = [];
        //alert("new");
        $.each(data, function (key, val) {
            var culvert = new Object();
            for (ea in val) {
                culvert[ea] = val[ea];
            }
            culverts.push(culvert);
        });

    });
    $.ajaxSetup({ "async": true });
    return culverts;

}

function getCountyLines(routeName, mileStart, mileEnd, countyLines) {
    var getUrl = StuffUrl + countyLines + "/" + routeName + "/" + mileStart + "/" + mileEnd;

    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {

        $.each(data, function (key, val) {
            var cl = new Object();
            for (ea in val) {
                cl[ea] = val[ea];
            }
            county_lines.push(culvert);
        });

    });
    $.ajaxSetup({ "async": true });
    return county_lines;

}
function getXchanges(routeName, mileStart, mileEnd, interChange) {
    var getUrl = StuffUrl + interChange + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var clIdArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
          //alert("new");
        $.each(data, function (key, val) {
            var xChg = new Object();
            for (ea in val) {
                xChg[ea] = val[ea];
            }
            interchanges.push(xChg);
        });

    });
    $.ajaxSetup({ "async": true });
    return interchanges;

}

