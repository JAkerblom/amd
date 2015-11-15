<?php
session_name('login');
session_start();

if ( isset($_POST['credentials']) ) {
  $body = json_encode($_POST['credentials']);
  $obj = json_decode($body);
  $_SESSION['user_name'] = $obj->name;
  $_SESSION['user_email'] = $obj->email;
  if ($obj->program != '') {
    $_SESSION['user_program'] = $obj->program;
    // Watch out for this row, not implemented with JSON data yet
    $_SESSION['user_gradYear'] = $obj->gradYear;
  } else {
    $_SESSION['user_busarea'] = $obj->busArea;
  }
  echo "Session variable is now: " . $_SESSION['user_name'];
} else {
  $_SESSION['user_name'] = "";
  echo " but you weren't able to post anything.";
}
if ( isset($_POST['result']) ) {
  $body = json_encode($_POST['result']);
  $obj = json_decode($body);
  $_SESSION['BA'] = $obj->areaScores['BA'];
  $_SESSION['BD'] = $obj->areaScores['BD'];
  $_SESSION['BS'] = $obj->areaScores['BS'];
  $_SESSION['BT'] = $obj->areaScores['BT'];
  // Kanske inte behöver emailen.
  //$_SESSION['email'] = $obj->areaScores['email'];
  /*
  $_SESSION['area1'] = $obj->dropRelation.area1;
  $_SESSION['area2'] = $obj->dropRelation.area2;
  $_SESSION['area3'] = $obj->dropRelation.area3;
  $_SESSION['area4'] = $obj->dropRelation.area4;
  */
  echo "Session variable is now result: " . $_SESSION['BA'];
}

?>