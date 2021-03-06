<!DOCTYPE html>
<html>
<head>
	<Title>Registration Form</Title>
	<script src="js/angular.js"></script>
	<script src="js/app2.js"></script>
	<!-- <script src="js/global.js"></script> -->
<!--	<script src="js/jquery.min.js"></script>-->
<!--	<script src="http://www.nuget.org/packages/jQuery/1.8.2"></script> -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<link rel="stylesheet" href="css/bootstrap.css"></link>
</head>
<body ng-app="MyApp">
	<!--<p><?php echo "http://" . $_SERVER['SERVER_NAME'] . "</p><p>". $_SERVER['REQUEST_URI'] . "<p></p>" . $_SERVER['PHP_SELF']; ?></p>-->
    <h1>Register here!</h1>
	<label for="checkbox">
        <input id="checkbox" type="checkbox" ng-model="visible">Toggle me
    </label>
	<div show="visible">
		<p>Hello world!</p>
	</div>
	<p>Fill in your name and email address, then click <strong>Submit</strong> to register.</p>
    
    
    // This form will be put in another page. Will be used for empl. questionnaire.
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>" enctype="multipart/form-data" >
      Name  <input type="text" name="name" id="name"/></br>
      Email <input type="text" name="email" id="email"/></br>
      <input type="submit" name="UserSubmit" value="Submit" />
	</form>
    
    //
	<form method="post" id="add" action="<?php echo $_SERVER['REQUEST_URI']; ?>"> 
		First: <input type="text" name="first" value=1></br>
        Second: <input type="text" name="second" value=2></br> 
        Third: <input type="text" name="third" value=3></br>
        Fourth: <input type="text" name="fourth" value=4></br>
        Fifth: <input type="text" name="fifth" value=5></br>
        <input type="submit" name="PredSubmit" value="Do calc">
	</form>
<<<<<<< HEAD
	<p name="out_prob" id="out_prob">
        <?php include('php/mlexec.php'); ?>    
    </p>
    <div id="regdiv">
	   <?php include('php/dbexec.php');?>
    </div>
=======
	<p name="out_par" id="out_par"></p>
<?php
    // DB connection info
    //TODO: Update the values for $host, $user, $pwd, and $db
    //using the values you retrieved earlier from the portal.
    $host = "eu-cdbr-azure-west-c.cloudapp.net";
    $user = "ba2ce77d80289a";
    $pwd = "3a9e383e";
    $db = "ffcgamd-db";
    // Connect to database.
    try {
        $conn = new PDO( "mysql:host=$host;dbname=$db", $user, $pwd);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }
    catch(Exception $e){
        die(var_dump($e));
    }
    // Insert registration info
    if(!empty($_POST)) {
        try {
            if(isset($_POST['UserSubmit'])) {
                $name = $_POST['name'];
                $email = $_POST['email'];
                $date = date("Y-m-d");
                // Insert data
                $sql_insert = "INSERT INTO registration_tbl (name, email, date)
                           VALUES (?,?,?)";
                $stmt = $conn->prepare($sql_insert);
                $stmt->bindValue(1, $name);
                $stmt->bindValue(2, $email);
                $stmt->bindValue(3, $date);
                $stmt->execute();
            } 
        } 
        catch(Exception $e) {
            die(var_dump($e));
        }
        echo "<h3>Your're registered!</h3>";
    }
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
                echo $response;
                //echo "This is var_dump: " . var_dump($response);
                $json = json_decode($response);
                echo $json->Results->output1->value->Values;
                //echo "This is the decoded JSON string: " . $json;
            }
        }
        catch(Exception $e) {
            die(var_dump($e));
        }
        //echo "<h3>Your're registered!</h3>";
    }
    // Retrieve data
    $sql_select = "SELECT * FROM registration_tbl";
    $stmt = $conn->query($sql_select);
    $registrants = $stmt->fetchAll();
    if(count($registrants) > 0) {
        echo "<h2>People who are registered:</h2>";
        echo "<table>";
        echo "<tr><th>Name</th>";
        echo "<th>Email</th>";
        echo "<th>Date</th></tr>";
        foreach($registrants as $registrant) {
            echo "<tr><td>".$registrant['name']."</td>";
            echo "<td>".$registrant['email']."</td>";
            echo "<td>".$registrant['date']."</td></tr>";
        }
        echo "</table>";
    } else {
        echo "<h3>No one is currently registered.</h3>";
    }
    
    function debug_to_console( $data ) {

		if ( is_array( $data ) )
			$output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
		else
			$output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

		echo $output;
	}
?>
>>>>>>> a1d069d7492709388ce8c19bd166b68f9471d70c
</body>
</html>

