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
		      $headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));

                debug_to_console(strlen($body));

                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                
                //$response = json_decode(curl_exec($curl), true);
                
		        $response = curl_exec($curl);
                curl_close($curl);
                echo "<p>This is the response: " . $response . "</p>";
                //echo "This is var_dump: " . var_dump($response);
                
                $json = json_decode($response);
                echo "<p>This is the value 'type': " . $json->Results->output1->type . "</p>";
                
                $sought_arr = $json->Results->output1->value->Values;
                $list = array();
                foreach($sought_arr as $resp) {
                    $answer = new StdClass();
                    $answer->X1 = (float)$resp[0];
                    $answer->X2 = (float)$resp[1];
                    $answer->X3 = (float)$resp[2];
                    $answer->X4 = (float)$resp[3];
                    $answer->X5 = (float)$resp[4];
                    $answer->Y = (string)$resp[5];
                    $answer->ScoredLabel = (string)$resp[6];
                    $answer->ScoredProbabilities = (float)$resp[7];
                    
                    array_push($list, $answer);
                }
                echo $list[0]->ScoredProbabilities;
            }
        }
        catch(Exception $e) {
            die(var_dump($e));
        }
    }

    function debug_to_console( $data ) {
        if ( is_array( $data ) )
            $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
        else
            $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";
        echo $output;
    }
?>
