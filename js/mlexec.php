
<?php

if(!empty($_POST)) {
        try {
            if(isset($_POST['PredSubmit'])) {   
                if(isset($_POST['first'], $_POST['second'], $_POST['third'], $_POST['fourth'], $_POST['fifth'])) {
                    $first  = $_POST['first'];
                    $second = $_POST['second'];
                    $third  = $_POST['third'];
                    $fourth = $_POST['fourth'];
                    $fifth  = $_POST['fifth'];
                }
			
                error_reporting(E_ALL);
                ini_set('display_errors', 1);
                
                $data = array(
                  'Inputs'=> array(
                      'input1'=> array(
                          'ColumnNames' => array("X1", "X2", "X3", "X4", "X5", "Y"),
                          'Values' => array( array($first , $second, $third, $fourth, $fifth, "0"))
                      ),
                  ),
                  //'GlobalParameters'=> null
                  'GlobalParameters' => new StdClass(),
                );

                debug_to_console($first);

                $body = json_encode($data);
                debug_to_console($body);

                $url = 'https://europewest.services.azureml.net/workspaces/1ce72f845b6d4b40a0c44018ce41c9aa/services/f72d0fb1e47d4b3fbdf1d2d1cb4b54ac/execute?api-version=2.0&details=true';
                $api_key = '6fdbBStLMO4EbSTC5eb7BfaeLd6XuB0ppzXnPLU8jPuVghrZQMtMTxjyU17vWrBKRnhwuJfp3VPCLLQga8K5eQ==';
                //$headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));
                $headers = array('Content-Type: application/json', 'Authorization: Bearer '.$api_key, 'Accept: application/json'));
                
                debug_to_console(strlen($body));

                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers;
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //Important for ssl communication between web-app server and prediction model server.
                
                $response = curl_exec($curl);
                //$response = json_decode(curl_exec($curl), true);
                
                curl_close($curl);
                
                var_dump($response);

                echo $response;
                //debug_to_console(curl_exec($curl));
                //debug_to_console($curl);

                //$result = curl_exec($curl);

                //echo "curl_getinfo: " . curl_getinfo($result) . '<br/>';
                //echo "curl_errno: " . curl_errno($result) . '<br/>';
                //echo "curl_error: " . curl_error($result) . '<br/>';

                //echo "The var dump outputs the following: ";
                //var_dump($result);

                //$percent = floor($result * 100);

                //debug_to_console($result);
                //echo "<p>This is your result: " . $result . "</p>";
                #echo "<p>You are "$percent"% </p>;
                #header('Location: ');
            }
        }
        catch(Exception $e) {
            die(var_dump($e));
        }
        //echo "<h3>Your're registered!</h3>";
    }
?>