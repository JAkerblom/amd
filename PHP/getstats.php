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
try {
  $table = 'empl_tbl';
  $resarr = array();
  
  //$stmt = $conn->query("SELECT * FROM " . $table);
  //$stmt = $conn->query('SELECT COUNT(projektledn) AS "Blabla" FROM '. $table .' WHERE projektledn=1 AND busArea="BT"');
  //$stmt = $conn->prepare('SELECT COUNT(*) AS "Blabla", busArea FROM '. $table .' WHERE infomod=1 GROUP BY busArea');
  $predarr = array(
    'projektledn',
    'interaktionsdesign',
    'webbutv',
    'processutv',
    'BIanalytics',
    'verksamhetsutv',
    'kravanalys',
    'utbildning',
    'infomod',
    'systemutveckling',
    'forandringsledn',
    'ITstrategi',
    'behovsanalys',
    'testledn',
    'systemarkitektur'
  );
  $i = 1;
  foreach ($predarr as $preds) {
    //$sql_select = "SELECT COUNT(*) AS '".$preds."', busArea FROM empl_tbl WHERE ".$preds."=1 GROUP BY busArea";
    $sql_select = "SELECT COUNT(*) AS 'col', busArea FROM empl_tbl WHERE ".$preds."=1 GROUP BY busArea";
    $stmt = $conn->prepare($sql_select);
    $stmt->execute();
    $count = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //debug_to_console("BA is for ".$preds. " " . $count[0]['col']);
    
    array_push($resarr, array(
      $count[0]['busArea'] => $count[0]['col'],
      $count[1]['busArea'] => $count[1]['col'],
      $count[2]['busArea'] => $count[2]['col'],
      $count[3]['busArea'] => $count[3]['col']
    ));
  }
  /*
  for ($i = 0; $i < 2; $i++) {
    //debug_to_console($resarr[$i]['BA']);
    foreach($resarr[$i] as $area) {
      //debug_to_console($area);
    }
  }*/
  echo json_encode($resarr);
}  
catch(Exception $e) {
  var_dump($stmt);
  die(var_dump($e));
}
?>