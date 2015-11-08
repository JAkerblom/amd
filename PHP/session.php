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
  } else {
    $_SESSION['user_busarea'] = $obj->busArea;
  }
  echo "Session variable is now: " . $_SESSION['user_name'];
} else {
  $_SESSION['user_name'] = "";
  echo " but you weren't able to post anything.";
}

?>