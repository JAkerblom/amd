<?php
date_default_timezone_set('Europe/Stockholm');
// DB connection info
//TODO: Update the values for $host, $user, $pwd, and $db
//using the values you retrieved earlier from the portal.
$host = "eu-cdbr-azure-west-c.cloudapp.net";
$user = "ba2ce77d80289a";
$pwd = "3a9e383e";
$db = "ffcgamd-db";
// Connect to database.
try {
    // Using PHP Data Objects (PDO) for DB access
    $conn = new PDO( "mysql:host=$host;dbname=$db", $user, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}
catch(Exception $e){
    die(var_dump($e));
}
    
  // Insert employee info and results
if(!empty($_POST)) {
    try {
      //Depr:: Checks if UserSubmit button was pressed
      if(isset($_POST['UserSubmit'])) {
        // Consider not using one variable for each value,
        // USe something similar to mlexec.php. There a JSON
        // is passed in POST and can be parsed by php
        $name = $_POST['name'];
        $email = $_POST['email'];
        
        // Insert data
        //$table = 'registration_tbl';
        $table = 'empl_tbl';
        $sql_insert = "INSERT INTO " . $table . "(name, email)
                   VALUES (?,?)";
        $stmt = $conn->prepare($sql_insert);
        $stmt->bindValue(1, $name);
        $stmt->bindValue(2, $email);
        $stmt->bindValue(2, $email);

        // Execute the sql command
        $stmt->execute();

        //echo "<h3>Your're registered!</h3>";
      } 
    } 
    catch(Exception $e) {
        die(var_dump($e));
    }
  }

function buildInsert() {
}
?>
