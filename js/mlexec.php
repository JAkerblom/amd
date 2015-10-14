
<?php

if(isset($_POST['first'], $_POST['second'], $_POST['third'])) {
        $first  = $_POST['first'];
        $second = $_POST['second'];
	$third  = $_POST['third'];
	$fourth = $_POST['fourth'];
	$fifth  = $_POST['fifth'];
}

echo $first;

$data = array(
  'Inputs'=> array(
      'input1'=> array(
          'ColumnNames' => array("X1", "X2", "X3", "X4", "X5", "Y"),
          'Values' => array( array($first , $second, $third, $fourth, $fifth, 0))
      ),
  ),
  'GlobalParameters'=> null
);

$body = json_encode($data);

$url = 'https://europewest.services.azureml.net/workspaces/1ce72f845b6d4b40a0c44018ce41c9aa/services/f72d0fb1e47d4b3fbdf1d2d1cb4b54ac/execute?api-version=2.0&details=true';
$api_key = '6fdbBStLMO4EbSTC5eb7BfaeLd6XuB0ppzXnPLU8jPuVghrZQMtMTxjyU17vWrBKRnhwuJfp3VPCLLQga8K5eQ==';
$headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));

$this->responseArray['body'] = $body;

$curl = curl_init($url); 
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($curl);

echo $result;
