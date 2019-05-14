//var url = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/Routes";
var url = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService_2.1/Service/Routes";
var url2 = "js/RouteList.json";
jQuery.support.cors = true;
var roadImg = new Image();
roadImg.src = "images/roadTex2.png";
var can1BG= new Image();
can1BG.src = "images/canvas1BG3b.png";
var routes = [];
var currentMile = 0;
var minMiles, maxMiles, routeName, scaleFactor, mileStart, mileEnd, countyLine, interChange, rrXing, bridge, stream, signs, culv;
    var redraw = 0;
    var stages = null;
    var currPanel = 1;
    var offsets;
$(document).ready(function () {
    if (window.innerWidth > 1024) {
        $('#container').width(window.innerWidth - 20);
        $('#grayCover').width($('#container').width());
        $('#grayCover').height($('#container').height());
    } else {
        $('#container').width(1024);
        $('#grayCover').width(1024);
        $('#grayCover').height($('#container').height());
    }
    $('.header').css("width", $('#container').width());
    $(function () {
        $(window).resize(function () {
            if (window.innerWidth > 1024) {
                $('#container').width(window.innerWidth - 20);
                $('#canvas1').width($('#container').width());
                $('#canvas2').width($('#container').width());
                $('#grayCover').width($('#container').width());
                $('#grayCover').height($('#container').height());
                $('.header').css("width", $('#container').width());
            } else {
                $('#container').width(1024);
                $('#grayCover').width(1024);
                $('#grayCover').height($('#container').height());
                $('.header').css("width", $('#container').width());
            }
        });
    });
    
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
            signs = "MILEMARKER";
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
     stages = drawCanvas(routeName,mileStart,mileEnd,scaleFactor,countyLine,interChange,rrXing,bridge,stream,signs,culv,redraw,stages,1);
        $('#grayCover').hide();        
        $('#canvas1').toggle();
        $('#canvas2').toggle();
        $('.slide-out-div').toggle();
        $('#jqeasytrigger').toggle();
        $('.header').toggle();
        //offsets = stages[1]._getContainerPosition();
        
        return false;
    });
    $('#startModal').draggable();
    //$('#mapModal').draggable();
    $("input[name='featFilter1']").attr("checked", "checked");
    $("input[name='rtFilter']").bind("click", radioClicks);
    $('.INPfeatOthers').bind("click", featClickOthers);
    $('.INPfeatAll').bind("click", featClickAll);
    $('#linkMap').hover(function() {
        $('#routeHeader').attr("src","images/routeSelHeaderON.png");
    }, function () {
        $('#routeHeader').attr("src", "images/routeSelHeaderOFF.png");
    });
    $('#linkMap').click(function () {
        $('#grayCover').hide();
        $('#canvas1').toggle();
        $('#canvas2').toggle();
    });
    $('#mapView').click(function () {
        //$('#grayCover').show();
        $('.handle').click(); 
        $('#startModal').hide();
        $('#mapModal').show();
        if (mapInit == false) {
            init();
            getPoints(routeName, mileStart, mileEnd, currentMile);
        } else {
            moveLocator(currentMile);
        }

        
    });
    
   
    $('#changeScale').change(changeScale//function () {
         //redraw = -1;
         //scaleFactor = $('#changeScale').val();
        //stages = drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv,redraw,stages);
         //alert('Handler for .change() called.');
    //});
    );
    $(function () {
        $('.slide-out-div').tabSlideOut({
            tabHandle: '.handle',                     //class of the element that will become your tab
            pathToTabImage: 'images/optionsTab2.jpg', //path to the image for the tab //Optionally can be set using css
            imageHeight: '130px',                     //height of tab image           //Optionally can be set using css
            imageWidth: '32px',                       //width of tab image            //Optionally can be set using css
            tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
            speed: 300,                               //speed of animation
            action: 'click',                          //options: 'click' or 'hover', action to trigger animation
            topPos: '100px',                          //position from the top/ use if tabLocation is left or right
            leftPos: '80px',                          //position from left/ use if tabLocation is bottom or top
            fixedPosition: true                      //options: true makes it stick(fixed position) on scroll
        });

    });
    $(function () {
        $('.horizontal-dropdown').animatedHorizontalNav({
            speed: 250,
            useHoverIntent: true
        });
    });
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
    $('#panelLinks').children().remove();
    scaleFactor = $('#changeScale').val();
    stages = drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv, redraw, stages,currPanel);

}
function changePanel(panNum) {
    redraw = -1;
    //scaleFactor = $('#changeScale').val();
    $('#panelLinks').children().remove();
    //currPanel = panNum;
    stages = drawCanvas(routeName, mileStart, mileEnd, scaleFactor, countyLine, interChange, rrXing, bridge, stream, signs, culv, redraw, stages,panNum);

}


