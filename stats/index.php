<?php
session_name('login');
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Forefront Arbetsmarknadsdagarna</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="../images/ffcgicon.ico">
    <link rel="stylesheet" href="css/stylestats.css">
    <link rel="stylesheet" href="css/styleloading.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="../data/data.json"></script>
    <script src="js/getstats.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Statistik på datan</h1>
      <div class="bar"></div>
      <div class="loadcontainer text-center">
        <div class="row">
          <div class="col-sm-2">
            <div class="sp sp-slices">
              <!--<span style="position:relative; top:3em; right:13px">Loading</span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="textcontent" style="display:none;">
        <h3>Här kan du få mer information om den data som modellen baseras på. Den är insamlad via den här hemsidan och hämtas från en databas på Azure cloudservices. Tryck på de olika intresseområdena eller affärsområdena för att dyka ner i datan.</h3>
        <h4>Stapeldiagrammet visar antal som fyllt i de olika intresseområdena som relevanta.</h4>
        <h4>Pajdiagrammet visar svarsfördelningen från varje affärsområde.</h4>
      </div>
      <div class="bar" id="secondbar" style="display:none;"></div>
      <div id='dashboard' class="items">
        <div id="bardiv"></div>
        <div id="piediv"></div>
        <div id="tablediv"></div>
      </div>
      <div id="nextbutton">
        <a href="../" id="a-stats" class="btn submit" onclick="">Tillbaka till startsidan ></a>
      </div>
    </div>
  </body>
</html>

