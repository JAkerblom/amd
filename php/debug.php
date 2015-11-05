<?php
function locationStripper() {
    $uri = $_SERVER['REQUEST_URI'];
    if(strpos($uri, "index.php")) {
        $uri = str_replace("index.php", "", $uri);
    }
    header('location: ' . "http://" . $_SERVER['SERVER_NAME'] . $uri); 
}
?>