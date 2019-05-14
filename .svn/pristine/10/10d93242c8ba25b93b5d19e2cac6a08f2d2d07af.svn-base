var culvertUrl = "js/test.json";
//var StuffUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/XingFeatures/";
var StuffUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService_2.1/Service/XingFeatures/";
//var StatsUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/ElementInfo/";
var StatsUrl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService_2.1/Service/ElementInfo/";
jQuery.support.cors = true;



//Arrays for top panel items:
var county_lines = [];
var culverts = [];
var interchanges = [];
var rrCrossings = [];
var bridges = [];
var streams = [];
var signs = [];

// End arrays for top panel items.

//Arrays for bottom panel items:
var costCenter = [];
var constYear = [];
var array3 = [];
var medianType = [];
var medianWidth = [];
var array6 = [];
var array7 = [];
var suffRate = [];
var surfMat = [];
var numLanes = [];
//End arrays for bottom panel items.

//Get items for top panel.

function getItems(routeName, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, sign, culv) {
    getRoadStats(routeName);
    if (culv != null) {
        culverts = getCulverts(routeName, mileStart, mileEnd,culv);
    }
    if (countyLine != null) {
        county_lines = getCountyLines(routeName, mileStart, mileEnd, countyLine);
    }
    if (interChange != null) {
        interchanges = getXchanges(routeName, mileStart, mileEnd, interChange);
    }
    if (rrXing != null) {
        rrCrossings = getrrXings(routeName, mileStart, mileEnd, rrXing);
    }
    if (bridge != null) {
        bridges = getBridges(routeName, mileStart, mileEnd, bridge);
    }
    if (stream != null) {
        streams = getStreams(routeName, mileStart, mileEnd, stream);
    }
    if (sign != null) {
        signs = getSigns(routeName, mileStart, mileEnd, sign);
    }
    
    
}

function getCulverts(routeName, mileStart, mileEnd, culv) {
    var getUrl = StuffUrl + culv + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var culvertArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        var items = [];
        //alert("new");
        $.each(data, function (key, val) {
            var culvert = new Object();
            for (ea in val) {
                culvert[ea] = val[ea];
            }
            culvertArray.push(culvert);
        });

    });
    $.ajaxSetup({ "async": true });
    return culvertArray;

}

function getCountyLines(routeName, mileStart, mileEnd, countyLines) {
    var getUrl = StuffUrl + countyLines + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var cntyLines = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {

        $.each(data, function (key, val) {
            var cl = new Object();
            for (ea in val) {
                cl[ea] = val[ea];
            }
            cntyLines.push(culvert);
        });

    });
    $.ajaxSetup({ "async": true });
    return cntyLines;

}
function getXchanges(routeName, mileStart, mileEnd, interChange) {
    var getUrl = StuffUrl + interChange + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var intXchgArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
          //alert("new");
        $.each(data, function (key, val) {
            var xChg = new Object();
            for (ea in val) {
                xChg[ea] = val[ea];
            }
            intXchgArray.push(xChg);
        });

    });
    $.ajaxSetup({ "async": true });
    return intXchgArray;

}
function getrrXings(routeName, mileStart, mileEnd, rr) {
    var getUrl = StuffUrl + rr + "/" + routeName + "/" + mileStart + "/" + mileEnd;
   var rrX_Array = []
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        //alert("new");
        $.each(data, function (key, val) {
            var rrX = new Object();
            for (ea in val) {
                rrX[ea] = val[ea];
            }
            rrX_Array.push(rrX);
        });

    });
    $.ajaxSetup({ "async": true });
    return rrX_Array;

}
function getBridges(routeName, mileStart, mileEnd, br) {
    var getUrl = StuffUrl + br + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var brdgsArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        //alert("new");
        $.each(data, function (key, val) {
            var brdg = new Object();
            for (ea in val) {
                brdg[ea] = val[ea];
            }
            brdgsArray.push(brdg);
        });

    });
    $.ajaxSetup({ "async": true });
    return brdgsArray;
}
function getStreams(routeName, mileStart, mileEnd, str) {
    var getUrl = StuffUrl + str + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var strmsArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        //alert("new");
        $.each(data, function (key, val) {
            var strm = new Object();
            for (ea in val) {
                strm[ea] = val[ea];
            }
           strmsArray.push(strm);
        });

    });
    $.ajaxSetup({ "async": true });
    return strmsArray;
}
function getSigns(routeName, mileStart, mileEnd, sgn) {
    var getUrl = StuffUrl + sgn + "/" + routeName + "/" + mileStart + "/" + mileEnd;
    var signsArray = [];
    $.ajaxSetup({ "async": false });
    $.getJSON(getUrl, function (data) {
        //alert("new");
        $.each(data, function (key, val) {
            var sn = new Object();
            for (ea in val) {
                sn[ea] = val[ea];
            }
            signsArray.push(sn);
        });

    });
    $.ajaxSetup({ "async": true });
    return signsArray;

}
// End get items for top Panel

// Get items for bottom panel.
function getRoadStats(routename) {
    for (var s = 1; s < 11; s++) {
        var getUrl = StatsUrl +s + "/" + routeName;
        var thisArray = [];
        
        $.ajaxSetup({ "async": false });
        $.getJSON(getUrl, function (data) {
            var prevVal = null;
            var prevEnd = null;
            $.each(data[0].DATA, function (key, val) {
                var sn = new Object();
                
                if (val.ELEM_VALUE != prevVal) {
                for (ea in val) {                    
                    sn[ea] = val[ea];
                    if (prevEnd != null) {
                        thisArray[thisArray.length - 1].ENDREFPT = prevEnd;
                    }
                }
                //if (sn.ENDREFPT != prevEnd) {
                   // sn.ENDREFPT = prevEnd;
                //}
                
                prevVal = sn.ELEM_VALUE;
                thisArray.push(sn);
                
                }
                prevEnd = val.ENDREFPT;
               
            });

        });
        $.ajaxSetup({ "async": true });
       
        switch (s) {
            case 1:
                costCenter = thisArray;
                break;
            case 2:
                constYear = thisArray;
                break;
            case 3:
                array3 = thisArray;
                break;
            case 4:
                medianType = thisArray;
                break;
            case 5:
                medianWidth = thisArray;
                break;
            case 6:
                array6 = thisArray;
                break;
            case 7:
               array7 = thisArray;
               break;
            case 8:
                suffRate = thisArray;
                break;
            case 9:
                surfMat = thisArray;
                break;
            case 10:
                numLanes = thisArray;
                break;
        }

    }


}

//End get items for bottom panel.