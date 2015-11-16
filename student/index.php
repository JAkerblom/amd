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
    <link rel="stylesheet" href="css/styleloading.css">
    <link rel="stylesheet" href="css/style.css">

    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <script src="../data/data.json"></script>
    <script src="js/index.js"></script>
    
</head>
<body onload="deleteCookie()">
  <div class="container">
    <h1>Redo för testet <span class="stud_name"></span>?</h1>
    <div class="bar"></div>
    <h3>Välj de områden som känns relevanta för dig i din utbildning och/eller en framtida karriär.</h3>
    <h4>Du får klicka i så många alternativ som du känner passar.</h4>
    <div class="bar"></div>
    <div class="loadcontainer text-center" style="display: none;">
        <div class="row">
          <div class="col-sm-2">
            <div class="sp sp-slices">
              <!--<span style="position:relative; top:3em; right:13px">Loading</span>-->
            </div>
          </div>
        </div>
      </div>
    <div class="items" onclick=""></div>
    <!--<a href="#" id="dbexec" class="" onclick="getInput()">Kör test</a>-->
    <a href="" id="dbexec" class="btn btn-default submit" onclick="getInput()">Skicka</a>
  </div>
  <input type="hidden" id="inphidd" 
           name-value="<?php echo isset($_SESSION['user_name']) ? $_SESSION['user_name'] : '';?>"
           email-value="<?php echo isset($_SESSION['user_email']) ? $_SESSION['user_email'] : ''; ?>"
           program-value="<?php echo $_SESSION['user_program']; ?>"
           gradYear-value="<?php echo $_SESSION['user_gradYear']; ?>"/>
  <div style="display:none;"><a href="../restest/" class="continue"></a></div>
  </body>
  
</html>
