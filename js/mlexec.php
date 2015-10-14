
<?php

if(isset($_POST['first'], $_POST['second'], $_POST['third'])) {
        $first  = $_POST['first'];
        $second = $_POST['second'];
	$third  = $_POST['third'];
}

$data = array(
  'Inputs'=> array(
      'input1'=> array(
          'ColumnNames' => array("userID", "placeID", "rating"),
          'Values' => array( array($first , $second, $third))
      ),
  ),
  'GlobalParameters'=> null
);

$body = json_encode($data);

$url = 'https://europewest.services.azureml.net/workspaces/1ce72f845b6d4b40a0c44018ce41c9aa/services/91fc5fbe91c54356b11a0cc5b072d56a/execute?api-version=2.0&details=true';
$api_key = '22arKOvwZlcqU/K8qh77cyu3xwduj5XJsnVAzHiPalWf+f+bt6GTZcTxDJr/vOznG9KtTvloQplSXP0pbsZN3w=='; 
$headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));

$this->responseArray['body'] = $body;

$curl = curl_init($url); 
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($curl);

echo $result;
