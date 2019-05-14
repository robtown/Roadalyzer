function dynamicTag()
{
    var userinput = document.getElementById("userinput").value;
    var request = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/XingFeatures/CULV/I%2029%20N/0/151.8";
    var head = document.getElementsByTagName("head").item(0);
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    head.appendChild(script);
  
}
function getImages(JSONData) {
    if (JSONData != null)
    {
        var div = document.getElementById("PlaceImages");
        for (i=0; i<10; i++)
        {
            var image = document.createElement("image");
            image.setAttribute("src", JSONData.ResultSet.Result[i].Url);
            image.setAttribute("width", 100);
            image.setAttribute("height", 100);
            div.appendChild(image);
        }
    }
}