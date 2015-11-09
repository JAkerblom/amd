<?php
date_default_timezone_set('Europe/Stockholm');
// DB connection info
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
    if(isset($_POST['stud_input'])) {
      $body = json_decode(json_encode($_POST['stud_input']));
      $creds = $body->credentials;
      $preds = $body->subjects; 
      
      // Use empl_tbl table
      $table = 'stud_tbl';
      $email = $creds->email;
      
      // Show all occurrences with this email
      $stmt = $conn->query('SELECT * FROM '. $table .' WHERE email="'. $email .'"');
      $row_count = $stmt->rowCount();
      
      if ($row_count > 0) {
        // Build data to update with
        $name = $creds->name;
        $program = $creds->program;
        $colvalstr .= "name='".$name."', program='".$program."'";

        foreach ($preds as $key => $value) {
          $colvalstr .= 
            ", ".$key."=".$value;
        }
        
        // Update data
        $stmt = $conn->exec("UPDATE ". $table ." SET ". $colvalstr ." WHERE email='". $email ."'");
        echo $stmt . " were affected."; 
      } else {      
        // Build data to insert
        $colstr = '(';
        $valuestr = '(';
        $i = 1;
        foreach ($creds as $key => $value) {
          if ($key != 'program') {
            if ($i == 1) {
              $colstr .= $key;
              $valuestr .= "'" . $value . "'";
            } else {
              $colstr .= ', ' . $key;
              $valuestr .= ', ' . "'" . $value . "'";
            }
          }
          $i++;
        }
        foreach ($preds as $key => $value) {
          $colstr .= ', ' . $key;
          $valuestr .= ', ' . $value;
        }
        $colstr .= ')';
        $valuestr .= ')';
        // Insert data
        $sql_insert = "INSERT INTO " . $table . ' ' . $colstr . " VALUES " . $valuestr;
        //$stmt = $conn->prepare($sql_insert);
        //$stmt->execute();
        $result = $conn->exec($sql_insert);
        $insertID = $conn->lastInsertId();
        echo $insertID;
      }
    } 
  } 
  catch(Exception $e) {
      die(var_dump($e));
  }
}
?>
