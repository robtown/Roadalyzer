//Write Messages for testing.
function writeDataMessage(messageLayer2, message,message2,message3, x, y) {
    var context = messageLayer2.getContext();
    var newX = x;
    var newY = y;
    
    if (y < 80) {
        newY = 80;
    }
    if (x < 80) {
        messageLayer2.children[3].attrs.x = 10;
        messageLayer2.children[4].attrs.x = 10;
        messageLayer2.children[5].attrs.x = 10;
        messageLayer2.children[0].hide();
        messageLayer2.children[2].hide();
        newX = x;
        newY = newY - 74;
        messageLayer2.children[1].show();
    } else if (x > context.canvas.width - 84) {
        messageLayer2.children[3].attrs.x = 7;
        messageLayer2.children[4].attrs.x = 7;
        messageLayer2.children[5].attrs.x = 7;
        messageLayer2.children[0].hide();
        messageLayer2.children[1].hide();
        newX = x - 160;
        newY = newY - 74;
        messageLayer2.children[2].show();
    } else {
        messageLayer2.children[3].attrs.x = 7;
        messageLayer2.children[4].attrs.x = 7;
        messageLayer2.children[5].attrs.x = 7;
        messageLayer2.children[1].hide();
        messageLayer2.children[2].hide();
        newX = newX - 80;
        newY = newY - 79;
        messageLayer2.children[0].show();
    }
    messageLayer2.clear();
    //messageLayer.add(image);
    //context.font = "18pt Calibri";
    //context.fillStyle = "black";
    //context.fillText(message + " x= " + x + " y= " + y, x, y);
    messageLayer2.children[3].setText(message);
    messageLayer2.children[4].setText(message2);
    messageLayer2.children[5].setText(message3);
    
    messageLayer2.children[3].show();
    messageLayer2.children[4].show();
    messageLayer2.children[5].show();
    messageLayer2.setPosition(newX, newY);
    messageLayer2.draw();

}
function clearDataMessage(messageLayer) {
    messageLayer.clear();
    messageLayer.setPosition(-160,0);

}
function writeMessage(messageLayer, message, x , y) {
        var context = messageLayer.getContext();
        messageLayer.clear();
        context.font = "18pt Calibri";
        context.fillStyle = "black";
        context.fillText(message + " x= " + x + " y= " + y, x, y);
      }
	  
	  function writeScale(messageLayer,message, x , y,units){
	      var context = messageLayer.getContext();
	      messageLayer.clear();
	      context.font = "10pt Calibri";
	      context.fillStyle = "black";
	      if (units == "mi") {
	          message = parseInt(message) / 5280;
	      } else {
              
	      }
	      context.fillText(message + " " + units, x, y);
								   }