<?php
define ('HOSTNAME', 'http://www.webservicex.net/');
echo 'Hello World';
$path = ($_POST['ws_path']) ? $_POST['ws_path'] : $_GET['ws_path'];

$url = HOSTNAME.$path;

// Open the Curl session

$session = curl_init($url);

if ($_POST['ws_path']) {
     $postvars = '';
     while ($element = current($_POST)) {
          $postvars .= key($_POST).'='.$element.'&';
          next($_POST);
     }
     curl_setopt ($session, CURLOPT_POST, true);
     curl_setopt ($session, CURLOPT_POSTFIELDS, $postvars);
}
// Return the call not the headers
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
// call the data

$xml = curl_exec($session);
header("Content-Type: text/xml");
echo $xml;

curl_close($session);

?>