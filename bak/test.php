<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>Ajax Currency Convertor</title>
<script type="text/javascript" src="Ajax.js"></script>
</head>
<body>
Currency To Convert From:
<select id="FromBox">
<option value="USD" selected="true">USD - U.S. Dollar</option>
<option value="GBP">GBP - British Pound</option>
<option value="EUR">EUR - Euro</option>
<option value="JPY">JPY - Japanese Yen</option>
</select>
Currency To Convert To:
<select id="ToBox">
<option value="USD">USD - U.S. Dollar</option>
<option value="GBP" selected="true">GBP - British Pound</option>
<option value="EUR">EUR - Euro</option>
<option value="JPY">JPY - Japanese Yen</option>
</select>
<br /><br />
<input id="button1" type="button" value="Click to convert currency"
 onclick="initiateConversion()" />
<br /><br />
<table id="table1">
</table>
</body>
</html>