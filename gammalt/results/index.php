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
    <!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">-->
    <!--<link rel="stylesheet" href="css/style2.css">-->
    <!--
    <style>
      a {
        /*text-decoration: none;*/
        color: #fff;
        display:block; 
        width:100px; 
        margin:0 auto;
      }
    </style>
    -->
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
    <script src="../data/data.json"></script>
    <script src="js/index.js"></script>
</head>
<body>
  <div class="container">
    <div class="result-head">
      <h1>Grattis!</h1>
      <h2>Du är med <span id="result-percent">85%</span> sannolikhet en <span id="result-area">Business Application</span>-konsult.</h2>
      <h3>Klicka på fälten nedan för att få reda på mer information om ditt affärsområde.</h3>
    </div>
    <div class="bar"></div>
    
    <a href="../">Till startsidan</a>
    <input type="hidden" id="inphidd" 
           name-value="<?php echo $_SESSION['user_name'];?>"
           email-value="<?php echo $_SESSION['user_email']; ?>"
           area-value="<?php echo $_SESSION['user_program']; ?>"/>
  </div>
</body>
</html>
