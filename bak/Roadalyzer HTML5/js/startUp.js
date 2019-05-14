var url = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/Routes";
var url2 = "js/RouteList.json";
jQuery.support.cors = true;
var routes = [];
var minMiles, maxMiles, routeName, scaleFactor, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, signs, culv;
    var redraw = 0;
    var stages = null;
$(document).ready(function () {
    
    
    getRoutes();
    $('#startForm').submit(function () {
         routeName= $('#routesSelect').val();
         scaleFactor = $('#scaleSelect').val();
         $('#changeScale').val(scaleFactor);
        //alert(scaleFactor);
        
        countyLine = null;
        interChange = null;
        rrXing = null;
        bridge = null;
        stream = null;
        signs = null;
        culv = null;
        
        if ($('input:radio[name=featFilter1]:checked').val()) {
            //alert("all is checked");
            countyLine = "COLN";
            interChange = "INT";
            rrXing = "RRXNG";
            bridge = "BRDG";
            stream = "STRM";
            signs = "SIGN";
            culv = "CULV";
        } else {
            if ($('input:radio[name=featFilter2]:checked').val()) {
              countyLine = $('input:radio[name=featFilter2]').val();
            }
            if ($('input:radio[name=featFilter3]:checked').val()) {
                interChange = $('input:radio[name=featFilter3]').val();
            }
            if ($('input:radio[name=featFilter4]:checked').val()) {
                rrXing = $('input:radio[name=featFilter4]').val();
            }
            if ($('input:radio[name=featFilter5]:checked').val()) {
                bridge = $('input:radio[name=featFilter5]').val();
            }
            if ($('input:radio[name=featFilter6]:checked').val()) {
                stream = $('input:radio[name=featFilter6]').val();
            }
            if ($('input:radio[name=featFilter7]:checked').val()) {
                signs = $('input:radio[name=featFilter7]').val();
            }
            if ($('input:radio[name=featFilter8]:checked').val()) {
                culv = $('input:radio[name=featFilter8]').val();
            }
        }
        if (routeName == "Select a Route") {
            alert("You haven't selected a route");
            return;
        }
        if ($('#mileStart').val() == 0 || $('#mileStart').val() == null) {
           mileStart = minMiles;
        } else {
            mileStart = $('#mileStart').val();
        }
        if ($('#mileEnd').val() == 0 || $('#mileEnd').val() == null) {
            mileEnd = maxMiles;
        } else {
            mileEnd = $('#mileEnd').val();
        }
        
        //drawCanvas();
      // testDraw();
     stages = drawCanvas(routeName,mileStart,mileEnd,scaleFactor,countyLine,interChange,rrXing,bridge,stream,signs,culv,redraw,stages);
        $('#grayCover').hide();        
        $('#canvas1').toggle();
        $('#canvas2').toggle();
        
        return false;
    });
    $('#startModal').draggable();
    $("input[name='featFilter1']").attr("checked", "checked");
    $("input[name='rtFilter']").bind("click", radioClicks);
    $('.INPfeatOthers').bind("click", featClickOthers);
    $('.INPfeatAll').bind("click", featClickAll);
    $('#Map').hover(function() {
        $('#routeHeader').attr("src","images/routeSelHeaderON.png");
    }, function () {
        $('#routeHeader').attr("src", "images/routeSelHeaderOFF.png");
    });
    $('#Map').click(function () {
        $('#grayCover').hide();
        $('#canvas1').toggle();
        $('#canvas2').toggle();
    });

   
    $('#changeScale').change(changeScale//function () {
         //redraw = -1;
         //scaleFactor = $('#changeScale').val();
        //stages = drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv,redraw,stages);
         //alert('Handler for .change() called.');
    //});
    );

});

function swapSource() {
    alert($(this).getattr("src"));
}
function getRoutes() {
    
    $.ajaxSetup({ "async": false });
    $.getJSON(url, function (data) {
        var items = [];
        //alert("new");
        $.each(data, function (key, val) {           
                routes.push(val.ROUTE_NAME);
        });

    });
    $.ajaxSetup({ "async": true });
    
    popRoutesSelection("none");
   

}

function radioClicks() {
    var filterVar;
    switch ($(this).val()) {
        case "Interstate":
            filterVar = "I ";
            break;
        case "US":
            filterVar = "US";
            break;
        case "State":
            filterVar = "IA";
            break;
        case "None":
            filterVar = "none";
            break;

    }
    popRoutesSelection(filterVar);

}
function popRoutesSelection(filter) {
    $('#minMiles').text("");
    $('#maxMiles').text("");
    $('#routesSelect').empty();
    if (filter != "none") {
        $('<option/>').val("Select a Route").html("Select a Route").appendTo('#routesSelect');
        for (i = 0; i < routes.length; i++) {
            if (routes[i].indexOf(filter) != -1) {
                $('<option/>').val(routes[i]).html(routes[i]).appendTo('#routesSelect');
            }
        }
    } else {
        $('<option/>').val("Select a Route").html("Select a Route").appendTo('#routesSelect');
        for (i = 0; i < routes.length; i++) {           
                $('<option/>').val(routes[i]).html(routes[i]).appendTo('#routesSelect');
            }
    }
    
}
function featClickAll() {
   
    $('.INPfeatOthers').removeAttr("checked");
    
}
function featClickOthers() {
    $('.INPfeatAll').removeAttr("checked");
}
function getMinMax() {    
    var minMaxurl = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/MinMaxValues/" + $('#routesSelect').val();
    //$.ajaxSetup({ "async": false });
    $.getJSON(minMaxurl, function (data) {
        var items = [];
        //alert("new");
        $.each(data, function (key, val) {
            minMiles = val.MIN;
            maxMiles = val.MAX;
            $('#minMiles').text(" Min: " + val.MIN);
            $('#maxMiles').text(" Max: " + val.MAX);
        });

    });
   // $.ajaxSetup({ "async": true });

}
function changeScale() {
    redraw = -1;
    scaleFactor = $('#changeScale').val();
    stages = drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv, redraw, stages);

}


