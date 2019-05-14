// JavaScript Document This is where we add all of our Features from the database.
var xChangeImg = new Image();
xChangeImg.src = "images/Interchang.png";
function addStreet(totPans,curPan,streetWidth) {
    var streetx = 0;
    var sWid = 0;
    if (totPans == 1) {
        sWid = streetWidth;
        streetx = 8;
    }else if (curPan == totPans && totPans != 1) {
        sWid = streetWidth - (8064 * (curPan - 1));
    } else if(curPan > 1 && curPan != totPans && totPans >1 ){ //sWid = streetWidth 
        sWid = 8064;
        streetx = 0;
    }else{
        sWid = 8064;
        streetx = 8;
    }

    var street = new Kinetic.Rect({
        x: streetx,
        y: 90,
        width: sWid,
        height: 34,
        //fill: "#999",
        fill: {
            image: roadImg,
            offset: [0, 0]
        },
        draggable: false
    });
    return street;

}
    //Add Signs.
function addSigns(stage, signsLayer, scale, totalPixels, windowWidth, messageLayer, signs,currPan) {
    for (var e = 0; e < signs.length; e++) {
        var absXLocation = Math.round(((5280 * signs[e].REFPT) / scale) * 72)+8;
        var xLocation;
        if (currPan > 1) {
            xLocation = absXLocation - ((currPan - 1) * 8064);
        } else {
            xLocation = absXLocation;
        }
            
            var id = signs[e].ID;
            //var xVar = Math.round(((5280 * signs[e].REFPT) / scale) * 72);
            var yVar = 60;
            var test;
            if (xLocation > 0 && xLocation < 8064) {
           //(function () {
             test = addSign(stage, signsLayer, messageLayer, xLocation, yVar, id);
          // }());
            }
            //signsLayer.add(test);
           
    }
    //stage.draw();
}
// Add Interchanges
function addInterchanges(stage, interchangeLayer, scale, totalPixels, windowWidth, messageLayer, interchanges,currPan) {
    var interChgArray = interchanges;
    for (var g = 0; g < interChgArray.length;g++)
    {
        var featureName = interChgArray[g].FEATURE_NAME;
        var id = interChgArray[g].ID;
        var absXLocation = Math.round(((5280 * interChgArray[g].REFPT) / scale) * 72)+8;
        var xVar;
        if (currPan>1) {
            xVar = absXLocation - ((currPan-1) * 8064);
        } else {
            xVar = absXLocation;
        }
        var yVar = 50;
        if (xVar > 0 && xVar < 8064) {(function () {
            addInterchange(stage, interchangeLayer, messageLayer, xVar, yVar, featureName);
       }()); }
    
    }
    //stage.draw();
}
// Add Culverts
function addCulverts(stage,culvertLayer,scale,totalPixels,windowWidth, messageLayer,culverts,currPan) {
	   var culvertIdArray = culverts;
	   for (var i = 0; i < culvertIdArray.length; i++) {
	       var absXLocation = Math.round(((5280 * culvertIdArray[i].MILEPOST) / scale) * 72)+8;
	       var xLocation;
	        if (currPan > 1) {
	           xLocation = absXLocation - ((currPan-1) * 8064);
	       } else {
	           xLocation = absXLocation;
	       }
	       if (xLocation > 0 && xLocation < 8064) {
	           (function () {
	               var idKey = culvertIdArray[i].ID;
	               var placementType = culvertIdArray[i].D_CULV_PLACEMENT_TY_ID;
	               var culLength = culvertIdArray[i].CULV_LENGTH_FT;
	               var yLocation = 0;                   
	               switch (placementType) {
	                   case "1":
	                       yLocation = 145;
	                       break;
	                   case "2":
	                       yLocation = 145;
	                       break;
	                   case "3":
	                       yLocation = 50;
	                       break;
	                   case "4":
	                       yLocation = 79;
	                       break;
	                   case "5":
	                       yLocation = 79;
	                       break;
	                   default:
	                       yLocation = 50;
	                       break;
	               }
	               if (placementType == "5") {
	                   addCulvert(stage, culvertLayer, messageLayer, xLocation, yLocation, culLength, scale, idKey, 90)

	               } else {
	                   addCulvert(stage, culvertLayer, messageLayer, xLocation, yLocation, culLength, scale, idKey, 0);
	               }
	           }());
	       }
	   }      
	  }

//Methods below draw and place the actual shapes of the individual features, County Line, Interchange, Rail Crossings, Bridges, Streams, Signs, Culverts.
// Add Sign shapes.
	  function addSign(stage, signsLayer, messageLayer, signX, signY, id) {
	      var intBox = new Kinetic.Rect({
	             width: 10,
	              height: 13,
	             x: signX,
	              y: signY,
	             fill: "red",
	             stroke: 0
	      });
	      intBox.on("mouseover", function () {
	          writeMessage(messageLayer, id, signX, signY);
	      });
	      intBox.on("mouseout", function () {
	          messageLayer.clear();
	      });
	     // return intBox;
	      signsLayer.add(intBox);
	      //signsLayer.draw();
	  }
// Add InterChange shapes.
	  function addInterchange(stage, interchangeLayer, messageLayer, xVar, yVar, id) {	     
	      //var imageObj = new Image();
	      var image;
	    // imageObj.src = "images/Interchang.png";
	     //imageObj.onload = function () {
	       image = new Kinetic.Image({
	             x: xVar,
	             y: yVar,
	             image: xChangeImg,
	             width: 13,
	             height: 110
	       });
	       image.on("mouseover", function () {
	           writeMessage(messageLayer, id, xVar, yVar);
	       });
	       image.on("mouseout", function () {
	           messageLayer.clear();
	       });
	       interchangeLayer.add(image);

	      // stage.draw();
	     //};
	    
	 // Methods below actually draw shapes for Interchanges representation, they caused the canvas to become unresponsive on longer routes.         
	      //var intGroup = new Kinetic.Group();
	      //var intBox = new Kinetic.Rect({
	      //    width: 110,
	      //    height: 13,
	      //    x: 0,
	      //    y: 0,
          //    fill: "#000",
	      //    stroke: 0
	      //});
	      ////intGroup.add(image);
	      //intGroup.add(intBox);
	      //var tempX = 0;
	      //for (var d = 0; d < 11; d++) {
	      //    var intStripe = new Kinetic.Rect({
	      //        width: 5,
	      //        height: 1,
	      //        x: tempX,
	      //        y: 6,
	      //        fill: "yellow",
	      //        stroke: 0
	      //    });
	      //    tempX += 10;
	      //    intGroup.add(intStripe);
	      //}
	      //intGroup.on("mouseover", function () {
	      //    writeMessage(messageLayer, id, xVar, yVar);
	      //});
	      //intGroup.on("mouseout", function () {
	      //    messageLayer.clear();
	      //});
	      //var degrees = 90 * (Math.PI / 180);
	      //intGroup.rotate(degrees);
	      
	      //    xVar = parseInt(xVar);
	      //    xVar += 20;
	      ////imageObj.move(xVar,yVar)
          //intGroup.move(xVar, yVar);
	     
	      //interchangeLayer.add(intGroup);
	      //stage.draw();
	  }
	   
// Add Culvert Lines.
	  function addCulvert(stage, culvertLayer, messageLayer, xVar, y,len,culScale, id, rotate) {
	      //alert("addculvert");

	      var culLen;
	      if(rotate != 0){
	          culLen = 36;
	      }else{
         culLen   = (len / culScale) * 72;  
	      }
	      var culgroup = new Kinetic.Group();

	      var leftCulEnd = new Kinetic.Line({
	          points: [0, 0, 10, 10, 0, 20],
	          stroke: "black",
	          strokeWidth: 1
	      });
	      var rightCulEnd = new Kinetic.Line({
	          points: [10, 0, 0, 10, 10, 20],
	          stroke: "black",
	          strokeWidth: 1
	      });
	      var culMiddle = new Kinetic.Line({
	          points: [10, 10, culLen+10, 10],
	          stroke: "black",
	          strokeWidth: 1
	      });
	      rightCulEnd.move(culLen+10, 0);

	      var hitRect = new Kinetic.Rect({
	          width: culLen+20,
	          height: 20,
	          x: 0,
	          y: 0,
              stroke:0

	      });
	      //var xVar = x;
	      var degrees = rotate * (Math.PI / 180);
	      culgroup.rotate(degrees);
	      if (degrees > 0) {
	          xVar = parseInt(xVar);
	          xVar += 20;
	      }

	      culgroup.move(xVar, y);
	      
	     hitRect.on("mouseover", function () {
	          writeMessage(messageLayer, id, xVar, y);
	      });
	     hitRect.on("mouseout", function () {
	         messageLayer.clear();

	          //writeMessage(messageLayer, "", xVar, y);
	      });
	      culgroup.add(hitRect);
	      //culgroup.draggable(true);
	      culgroup.add(leftCulEnd);
	      culgroup.add(culMiddle);
	      culgroup.add(rightCulEnd);
	      culvertLayer.add(culgroup);
	      //stage.draw();
	  }
// Add stripes to roadway 

	  function addStripes(stage,streetLayer,street,scale_x,scale_y) {
		  
		 // var ctx = streetLayer.getContext();
		  var numStripes = street.getWidth()/scale_y;
		  
		  streetLayer.clear();
		  //alert(street.getWidth()/180);
		  var stripeX = 0;
	      for(i=0;i<numStripes;i++)
	      {
		    //ctx.fillRect  (stripeX,104, 20, 2);
		  var stripe = new Kinetic.Rect({
          x: stripeX,
          y: 104,
          width: 20,
          height: 2,
          fill: "yellow",          
          draggable: false
        });
		    stripeX += scale_y;
			streetLayer.add(stripe);
	      }	
		  
		  //ctx.fillStyle   = '#999'; // blue
	      //ctx.fillRect  (0,100, 960, 240);
		  
	  }

// Adding Tick Marks to the two canvases.

	  function addTickMarks(stage,stage2, ticksLayer, ticksLayer2,messageLayer, scalefactor, scaleUnits, wWidth,currPan) {
	      var xMark = 8;
	      var feetIndicator = 0;
	      totalInchMarks = Math.round(wWidth / 72);
	      if (currPan > 1) {

	      }
	      for (var j = 0; j < totalInchMarks + 1; j++) {
	          if (j == totalInchMarks) {
	              xMark -= 1;
	          }
	          (function () {
	              addTick(stage, stage2, ticksLayer, ticksLayer2, messageLayer, j, xMark, scalefactor, scaleUnits,currPan);
              }());
              xMark += 72;
	      }
	      stage.add(ticksLayer);
	      stage2.add(ticksLayer2);
	      stage.draw();
	      stage2.draw();
	  }

	  function addTick(stage, stage2, ticksLayer, ticksLayer2, messageLayer, newj, newx, scaleTicks, scaleUnits,currPan) {
	      
	      //var InchLine = new Kinetic.Line({
	      //    points: [newx, 190, newx, 210],
	      //    stroke: "black",
	      //    strokeWidth: .5
	      //});
	      var InchHit = new Kinetic.Rect({
	          x: newx - 2,
	          y: 190,
	          width: 4,
              height: 20
	      });
	      var InchHit2 = new Kinetic.Rect({
	          x: newx - 2,
	          y: 0,
	          width: 4,
	          height: 20
	      });
	      //var InchLine2 = new Kinetic.Line({
	      //    points: [newx, 0, newx, 20],
	      //    stroke: "black",
	      //    strokeWidth: .5
	      //});
	      var subXmark = newx + 18;
	      var subJ = Math.round(newj * scaleTicks) + (scaleTicks / 4) + ((currPan - 1) * (scaleTicks * 112));
	      for (var k = 0; k < 3; k++) {

	          (function () {
	             addSubTick(stage, stage2, ticksLayer, ticksLayer2, messageLayer, subXmark, scaleTicks, subJ, scaleUnits);

	          }());
	          subXmark += 18;
	          subJ += (scaleTicks / 4);
	      }
	      var xLoc = Math.round(newj * scaleTicks) + ((currPan-1) * (scaleTicks *112));
	      InchHit.on("mouseover", function () {
	          writeScale(messageLayer, xLoc, this.attrs.x, 185,scaleUnits);
	      });
	      InchHit.on("mouseout", function () {
	          messageLayer.clear();
	      });
	      InchHit2.on("mouseover", function () {

	          writeScale(messageLayer, xLoc, InchHit.attrs.x, 185, scaleUnits);
	      });
	      InchHit2.on("mouseout", function () {
	          messageLayer.clear();
	      });

	      ticksLayer2.add(InchHit2);
	      ticksLayer.add(InchHit);
	      //ticksLayer.add(InchLine);
	      //ticksLayer2.add(InchLine2);
	      //ticksLayer.draw();
	      //ticksLayer2.draw();
	      //stage.draw();
	      //stage2.draw();
	  }
	  function addSubTick(stage, stage2, ticksLayer, ticksLayer2, messageLayer, sx, scaleSubTicks, nJ,units) {
	    
	      //var subInchLine = new Kinetic.Line({
	      //    points: [sx, 200, sx, 210],
	      //    stroke: "black",
	      //    strokeWidth: .5
	      //});
	      var subInchHit = new Kinetic.Rect({
	          x: sx - 2,
	          y: 200,
	          width: 4,
	          height: 20
	      });
	      var subInchHit2 = new Kinetic.Rect({
	          x: sx - 2,
	          y: 0,
	          width: 4,
	          height: 20
	      });
	      //var subInchLine2 = new Kinetic.Line({
	      //    points: [sx, 0, sx, 10],
	      //    stroke: "black",
	      //    strokeWidth: .5
	      //});
	      subInchHit.on("mouseover", function () {
	          var xLoc = Math.round(sx * scaleSubTicks);
	          writeScale(messageLayer, nJ, this.attrs.x, 185,units);
	      });
	      subInchHit.on("mouseout", function () {
	          messageLayer.clear();
	      });
	      subInchHit2.on("mouseover", function () {
	          var xLoc = Math.round(sx * scaleSubTicks);
	          writeScale(messageLayer, nJ, subInchHit.attrs.x, 185, units);
	      });
	      subInchHit2.on("mouseout", function () {
	          messageLayer.clear();
	      });
	      ticksLayer.add(subInchHit);
	      
	      
	      ticksLayer2.add(subInchHit2);
	      
	  }

//Lets add some features to the bottom panel.

//First set up relevant colors for the feature bars.

	  function costBarColor(num) {
	      var color;
	      switch (true) {
	          case (num <= 551000):
	              color = "#b200ff";
	              break;
	          case ((num > 551000) &&(num <= 552000)):
	              color = "#4800ff";
	              break;
	          case ((num > 552000) &&(num <= 553000)):
	              color = "#0026ff";
	              break;
	          case ((num > 553000) &&(num <= 554000)):
	              color = "#0045ff";
	              break;
	          case ((num > 554000) &&(num <= 555000)):
	              color = "#0094ff";
	              break;
	          case ((num > 555000) &&(num <= 556000)):
	              color = "#00ffff";
	              break;
	          case ((num > 556000) &&(num <= 1000000)):
	              color = "#00ff90";
	              break;
	      }
	      return color;

	  }
	  function yearBarColor(num) {
	      var color;
	      switch (true) {
	          case (num <= 1920):
	              color = "#B200FF";
	              break;
	          case ((num > 1920) && (num <= 1930)):
	              color = "#00FF90";
	              break;
	          case ((num > 1930) && (num <= 1940)):
	              color = "#4CFF00";
	              break;
	          case ((num > 1940) && (num <= 1950)):
	              color = "#B6FF00";
	              break;
	          case ((num > 1950) && (num <= 1960)):
	              color = "#FFD800";
	              break;
	          case ((num > 1960) && (num <= 1970)):
	              color = "#0026FF";
	              break;
	          case ((num > 1970) && (num <= 1980)):
	              color = "#0026FF";
	              break;
	          case ((num > 1980) && (num <= 1990)):
	              color = "#0000FF";
	              break;
	          case ((num > 1990) && (num <= 2000)):
	              color = "#FF6AFF";
	              break;
	          case ((num > 2000) && (num <= 2010)):
	              color = "#FF00FF";
	              break;
	          case ((num > 2010) && (num <= 2020)):
	              color = "#FFFF00";
	              break;
	          case ((num > 2020) && (num <= 2030)):
	              color = "#FFFF0F";
	              break;
	      }
	      return color;

	  }
	  function medTypeBarColor(num) {
	      var color;
	      switch (true) {
	          case (num == 0):
	              color = "#FFFFFF";
	              break;
	          case (num == 1):
	              color = "#FFFFBB";
	              break;
	          case (num == 2):
	              color = "#FFFF88";
	              break;
	          case (num == 3):
	              color = "#FFFF44";
	              break;
	          case (num == 4):
	              color = "#FFFF00";
	              break;
	          case (num == 5):
	              color = "#FFBBFF";
	              break;
	      }
	      return color;

	  }
	  function medWidthBarColor(num) {
	      var color;
	      switch (true) {
	          case (num <= 50):
	              color = "#BB0005";
	              break;
	          case ((num > 50) && (num <= 100)):
	              color = "#00AA10";
	              break;
	          case ((num > 100) && (num <= 150)):
	              color = "#990100";
	              break;
	          case ((num > 150) && (num <= 200)):
	              color = "#0010FF";
	              break;
	          case ((num > 200) && (num <= 250)):
	              color = "#4800FF";
	              break;
	          case ((num > 250) && (num <= 300)):
	              color = "#BFD2FF";
	              break;
	          case ((num > 300) && (num <= 350)):
	              color = "#0026FF";
	              break;
	          case ((num > 350) && (num <= 400)):
	              color = "#FF00FF";
	              break;
	          case ((num > 400) && (num <= 450)):
	              color = "#FFFF00";
	              break;
	          case ((num > 450) && (num <= 500)):
	              color = "#FFD800";
	              break;
	          case ((num > 500) && (num <= 550)):
	              color = "#B6FF00";
	              break;
	          case ((num > 550) && (num <= 600)):
	              color = "#00FF90";
	              break;
	      }
	      return color;
	  }
	  function suffRatingBarColor(num) {
	      var color;
	      switch (true) {
	          case (num <= 10):
	              color = "#B200FF";
	              break;
	          case ((num > 10) && (num <= 20)):
	              color = "#00FF90";
	              break;
	          case ((num > 20) && (num <= 30)):
	              color = "#4CFF00";
	              break;
	          case ((num > 30) && (num <= 40)):
	              color = "#B6FF00";
	              break;
	          case ((num > 40) && (num <= 50)):
	              color = "#FFD800";
	              break;
	          case ((num > 50) && (num <= 60)):
	              color = "#0026FF";
	              break;
	          case ((num > 60) && (num <= 70)):
	              color = "#FF26FF";
	              break;
	          case ((num > 70) && (num <= 80)):
	              color = "#2626FF";
	              break;
	          case ((num > 80) && (num <= 90)):
	              color = "#26FFFF";
	              break;
	          case ((num > 90) && (num <= 100)):
	              color = "#FFFF26";
	              break;
	      }
	      return color;
	  }
	  function surfMatBarColor(num) {
	      var color;
	      switch (true) {
	          
	          case (num == 1):
	              color = "#0000FF";
	              break;
	          case (num == 2):
	              color = "#00FFFF";
	              break;
	          case (num == 3):
	              color = "#11FFFF";
	              break;
	          case (num == 4):
	              color = "#44FFFF";
	              break;
	          case (num == 5):
	              color = "#44FFFF";
	              break;
	          case (num == 6):
	              color = "#88FFFF";
	              break;
	          case (num == 8):
	              color = "#AAFFFF";
	              break;
	          case (num == 10):
	              color = "#DDFFFF";
	              break;
	          case (num == 12):
	              color = "#0044FF";
	              break;
	          case (num == 14):
	              color = "#FF44FF";
	              break;
	          case (num == 16):
	              color = "#FF88FF";
	              break;
	          case (num == 18):
	              color = "#FFAAFF";
	              break;
	          case (num == 20):
	              color = "#FFCCFF";
	              break;
	          case (num == 22):
	              color = "#FF0000";
	              break;
	          case (num == 24):
	              color = "#FF00FF";
	              break;
	          case (num == 26):
	              color = "#00FF00";
	              break;
	          case (num == 28):
	              color = "#44FF00";
	              break;
	          case (num == 30):
	              color = "#88FF00";
	              break;
	          case (num == 32):
	              color = "#AAFF00";
	              break;
	          case (num == 34):
	              color = "#DDD800";
	              break;
	          case (num == 36):
	              color = "#FF8800";
	              break;
	          case (num == 38):
	              color = "#FFAA00";
	              break;
	          case (num == 40):
	              color = "#0026FF";
	              break;
	          case (num == 42):
	              color = "#B200FF";
	              break;
	          case (num == 44):
	              color = "#00FF90";
	              break;
	          case (num == 46):
	              color = "#4CFF00";
	              break;
	          case (num == 48):
	              color = "#B6FF00";
	              break;
	          case (num == 50):
	              color = "#FFD800";
	              break;
	          case (num == 51):
	              color = "#F4D800";
	              break;
	          case (num == 52):
	              color = "#FAD80F";
	              break;
	      }
	      return color;

	  }
	  function numLanesBarColor(num) {
	      var color;
	      switch (true) {
	          case (num == 0):
	              color = "#BB0FFF";
	              break;
	          case (num == 1):
	              color = "#BB0005";
	              break;
	          case (num == 2):
	              color = "#00AA10";
	              break;
	          case (num == 3):
	              color = "#990100";
	              break;
	          case (num == 4):
	              color = "#0010FF";
	              break;
	          case (num == 5):
	              color = "#010FE0";
	              break;
	          case (num == 6):
	              color = "#1BC00A";
	              break;
	          case (num == 7):
	              color = "#11A0DD";
	              break;
	          case (num == 8):
	              color = "#D1DFE0";
	              break;
	          case (num == 9):
	              color = "#1BCDDA";
	              break;
	          
	      }
	      return color;

	  }
// Iowa bars color setup, still need to setup colors for Data elements 3, 6 and 7... 

// Add the actual bars here...
	  function addDataBars(stage2, dataBarLayer, scale, scaleUnits, windowWidth, messageLayer,currpan) {
	      var windowHt = 75;
	      var bar1Init = null;
	      var bar1x = 8;

          // Cost Center valuations:
	      for (var cst = 0; cst < costCenter.length; cst++) {
	          var barInitX = Math.round(((5280 * costCenter[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * costCenter[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          } 
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Cost per Mile: " + costCenter[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(costCenter[cst].REFPT*100)/100;
	          var barValue3 = "End Point: " + Math.round(costCenter[cst].ENDREFPT * 100) / 100;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, costBarColor(costCenter[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Construction Year:
	      for (var cst = 0; cst < constYear.length; cst++) {
	          var barInitX = Math.round(((5280 * constYear[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * constYear[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Construction Year: " + constYear[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(constYear[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round( constYear[cst].ENDREFPT* 100) / 100; 
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, yearBarColor(constYear[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Median Type:
	      for (var cst = 0; cst < medianType.length; cst++) {
	          var barInitX = Math.round(((5280 * medianType[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * medianType[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Median Type: " + medianType[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(medianType[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round(medianType[cst].ENDREFPT * 100) / 100;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, medTypeBarColor(medianType[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Median Width:
	      for (var cst = 0; cst < medianWidth.length; cst++) {
	          var barInitX = Math.round(((5280 * medianWidth[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * medianWidth[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Median Width: " + medianWidth[cst].ELEM_VALUE + " ft";
	          var barValue2 = "Start Point: " + Math.round(medianWidth[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round(medianWidth[cst].ENDREFPT * 100) / 100;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, medWidthBarColor(medianWidth[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Suffiency Ratings:
	      for (var cst = 0; cst < suffRate.length; cst++) {
	          var barInitX = Math.round(((5280 * suffRate[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * suffRate[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Suffiency Rating: " + suffRate[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(suffRate[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round(suffRate[cst].ENDREFPT * 100) / 100;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, suffRatingBarColor(suffRate[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Surface Material:
	      for (var cst = 0; cst < surfMat.length; cst++) {
	          var barInitX = Math.round(((5280 * surfMat[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * surfMat[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Surface Material: " + surfMat[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(surfMat[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round(surfMat[cst].ENDREFPT * 100) / 100;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, surfMatBarColor(surfMat[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
          // Number of Lanes:
	      for (var cst = 0; cst < numLanes.length; cst++) {
	          var barInitX = Math.round(((5280 * numLanes[cst].REFPT) / scale) * 72)+8;
	          var barEndX = Math.round(((5280 * numLanes[cst].ENDREFPT) / scale) * 72)+8;
	          if (currpan > 1) {
	              barInitX = barInitX - ((currpan - 1) * 8064);
	              barEndX = barEndX - ((currpan - 1) * 8064);
	          }
	          var barWidth = barEndX - barInitX;
	          //var barColor = costBarColor(costCenter[cst].ELEM_VALUE);
	          var barValue1 = "Number of Lanes: " + numLanes[cst].ELEM_VALUE;
	          var barValue2 = "Start Point: " + Math.round(numLanes[cst].REFPT * 100) / 100;
	          var barValue3 = "End Point: " + Math.round(numLanes[cst].ENDREFPT * 100) / 100;;
	          if (barInitX < windowWidth) {
	              addBar(stage2, dataBarLayer, scale, numLanesBarColor(numLanes[cst].ELEM_VALUE), barValue1, barValue2, barValue3, barInitX, barEndX, barWidth, messageLayer, windowHt,currpan);
	          }
	      }
	      windowHt += 40;
	      stage2.add(dataBarLayer);
	      dataBarLayer.draw();
	      return windowHt;
	  }
	  function addBar(stage2, dataBarLayer, scale, barColor, barValue1,barValue2,barValue3, barInitX, barEndX, barWidth, messageLayer,y,currpan) {
	      //stage2._getContainerPosition = function () {
	      //    var obj = this.attrs.container;
	      //    var top = $(obj).offset().top;
	      //    var left = $(obj).offset().left;
	      //    return {
	      //        top: top,
	      //        left: left
	      //    };
	      //};
	      

	      (function () {
	          var box = new Kinetic.Rect({
	              
	              x: barInitX,
	              y: y,
	              width: barWidth,
	              height: 25,
	              fill: barColor,
                  throttle:50,
	              strokeWidth: 0
	          });
	          box.on("mouseover", function () {
	              document.body.style.cursor = "pointer";
	          });

	          box.on("mousemove", function () {
	              var mousePos = stage2.getMousePosition();
	              //offsetN = stage2._getContainerPosition();
	              //writeScale(messageLayer, barValue, mousePos.x, 185, "units");
	              writeDataMessage(messageLayer, barValue1,barValue2,barValue3, mousePos.x, y);
	          });
	          box.on("mouseout", function () {
	              clearDataMessage(messageLayer);
	              document.body.style.cursor = "default";
	          });
	          dataBarLayer.add(box);

	      }());
	      
	      //stage2.draw();
	  }

