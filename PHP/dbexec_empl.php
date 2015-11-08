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
    if(isset($_POST['empl_input'])) {
      $body = json_decode(json_encode($_POST['empl_input']));
      $creds = $body->credentials;
      $preds = $body->subjects;      
        
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
      $table = 'empl_tbl';
      $sql_insert = "INSERT INTO " . $table . ' ' . $colstr . 
                 " VALUES " . $valuestr;
      $stmt = $conn->prepare($sql_insert);
      //$stmt->bindValue(1, $name);
      echo $sql_insert;
      $stmt->execute();   // Execute the sql command
      
    } 
  } 
  catch(Exception $e) {
      die(var_dump($e));
  }
}
?>
