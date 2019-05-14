// JavaScript Document

// Add Culverts
	  function addCulverts(stage,culvertLayer,messageLayer,culverts) {
	   var imageObj = new Image();
	   var imageObj2 = new Image();
	   var culvertIdArray = culverts;
	   
	    
         //alert(culvertIdArray.length);
	   for (var i = 0; i < culvertIdArray.length; i++) {
	       //
	       (function () {
	          
	           var idKey = culvertIdArray[i].ID;
	           var placementType = culvertIdArray[i].D_CULV_PLACEMENT_TY_ID;
	           var yLocation = 0;
	           var xLocation = culvertIdArray[i].MILEPOST * 100;
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
	                   yLocation = 50;
	                   break;
	           }
	           
	           if (placementType == "4") {
	               addCulvert(stage, culvertLayer, messageLayer, xLocation, yLocation, idKey, 90)

	           } else {
	               addCulvert(stage, culvertLayer, messageLayer, xLocation, yLocation, idKey, 0);
	           }

	       }());
	   }
       //addCulvert(stage, culvertLayer,messageLayer, 0, 0);
	   //culvertLayer.draw();


   }

	   
// Add Culvert Lines.
	  function addCulvert(stage, culvertLayer, messageLayer, xVar, y, id, rotate) {
	      //alert("addculvert");
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
	          points: [10, 10, 42, 10],
	          stroke: "black",
	          strokeWidth: 1
	      });
	      rightCulEnd.move(42, 0);

	      var hitRect = new Kinetic.Rect({
	          width: 52,
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
	      stage.draw();


	  }
// Add stripes

	  function addStripes(stage,streetLayer,street,scale_x,scale_y) {
		  
		  var ctx = streetLayer.getContext();
		  var numStripes = street.getWidth()/scale_y;
		  
		  streetLayer.clear();
		  //alert(street.getWidth()/180);
		  var stripeX = 0;
	      for(i=0;i<numStripes;i++)
	      {
		    ctx.fillRect  (stripeX,104, 20, 2);
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