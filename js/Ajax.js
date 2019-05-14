function initiateConversion()
{
    xmlhttp = createRequestObject();
    var path = 'http://www.webservicex.net/CurrencyConvertor.asmx/ConversionRate?FromCurrency='
 + document.getElementById("FromBox").value
 + "&ToCurrency="
 + document.getElementById("ToBox").value;

var url = 'http://www.robtown.com/road/curl_proxy.php?ws_path='
 + encodeURIComponent(path);
alert(url);
xmlhttp.open('GET', url, true); 

xmlhttp.onreadystatechange = getData;
    xmlhttp.send(null);
alert(xmlhttp);
}

function createRequestObject() 
{
        if (window.XMLHttpRequest) 
        {
                return xmlhttprequest = new XMLHttpRequest(); 
        } 
      else if (window.ActiveXObject) 
      {  
            return xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
      } 
}
function getData() 
{
  if ((xmlhttp.readyState == 4) &&( xmlhttp.status == 200))
  {
    var myXml = xmlhttp.responseXML;
    var xmlobject = null;
    var XMLText = null;
    if (window.ActiveXObject)
    {
        XMLText = myXml.childNodes[1].firstChild.nodeValue; 
    }
    else
    {
        XMLText = myXml.childNodes[0].firstChild.nodeValue;
    }
    
    var table = document.getElementById("table1");
    var row = table.insertRow(table.rows.length);
    var tablecell = row.insertCell(row.cells.length);
    tablecell.appendChild(document.createTextNode
 (document.getElementById("FromBox").value
 + " to "
 + document.getElementById("ToBox").value));
    var tablecell = row.insertCell(row.cells.length);
    tablecell.appendChild(document.createTextNode(XMLText));
    table.setAttribute("border", "2");
  } 
}