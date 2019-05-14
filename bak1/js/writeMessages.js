//Write Messages for testing.

function writeMessage(messageLayer, message, x , y) {
        var context = messageLayer.getContext();
        messageLayer.clear();
        context.font = "18pt Calibri";
        context.fillStyle = "black";
        context.fillText(message + " x= " + x + " y= " + y, x, y);
      }
	  
	  function updateXval(stage,messageLayer){
	                  alert("test");
                     var x = stage.getMousePosition();
					 writeMessage(messageLayer,x,y);
			         stage.draw();
								   }