<?php
session_name('login');
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="../images/ffcgicon.ico">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/styleloading.css">
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="../data/data.json"></script>
    <!--<script src="js/getstats.js"></script>-->
    
  </head>
  <body>
    <div class="container text-center" style="display:none;">
      <div class="row">
        <div class="col-sm-2">
        <div class="sp sp-slices"><span style="position:relative; top:3em; right:13px">Loading</span></div>
      </div>
      </div>
    </div>
    <div id='dashboard'></div>
    <!--<script src="js/index.js"></script>-->
    <script src="js/getstats.js"></script>
    <!--<script>dashboard('#dashboard',result.freqData);</script>-->
  </body>
</html>

