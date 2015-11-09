<?php 
session_name('login');
session_start(); 
?>
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Forefront Arbetsmarknadsdagarna</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="shortcut icon" href="../images/ffcgicon.ico">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style2.css">

    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <script src="../data/data.json"></script>
    <script src="js/index.js"></script>
    
</head>
<body>
  <div class="container">
    <h1>Hej <span id="emp_name"></span>!</h1>
    <div class="bar"></div>
    <input type="hidden" id="inphidd" 
           name-value="<?php echo isset($_SESSION['user_name']) ? $_SESSION['user_name'] : '';?>"
           email-value="<?php echo $_SESSION['user_email']; ?>"
           area-value="<?php echo $_SESSION['user_busarea']; ?>"/>
    <h3>Välj de områden som känns relevanta för dig:</h3> 
    <h3>1. i ditt dagliga jobb </h3>
    <h3>2. i din roll som konsult på Forefront.</h3>
    <h3>3. i en framtida konsultprofil</h3>
    <h4>Du får klicka i så många alternativ som du känner passar.</h4>
    <div class="bar"></div>
    <div class="items" onclick=""></div>
    <!--<a href="#" id="dbexec" class="" onclick="getInput()">Kör test</a>-->
    <a href="../statistics/" id="dbexec" class="btn btn-default submit" onclick="getInput()">Skicka</a>
  </div>
  <!--<div class="container">
    
    </div>-->
</body>
</html>
