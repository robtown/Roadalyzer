var url = "http://ec2-23-20-37-199.compute-1.amazonaws.com/IowaMavricService/IowaMavricService.svc/XingFeatures/CULV/I%2029%20N/0/151.8";
var url2 = "js/test.json";
jQuery.support.cors = true;
var culverts=[];


function newgetJson() {

    $(document).ready(function () {
        $.getJSON(url, function (data) {
            var items = [];
            alert("new");
            $.each(data, function (key, val) {
                var culvert = new Object();
                for (ea in val) {
                    culvert[ea] = val[ea];
                }
                culverts.push(culvert);
            });

        });
    });


}