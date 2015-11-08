<?php 
session_name('login');
session_start(); 
?>
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Checkbox Trickery: To-Do List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="shortcut icon" href="../images/ffcgicon.ico">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style2.css">
    
    <style>
      a {
        /*text-decoration: none;*/
        color: #fff;
        display:block; 
        width:100px; 
        margin:0 auto;
      }
    </style>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="../data/data.json"></script>
    <script src="js/index.js"></script>
</head>
<body>
  <div class="container">
    <h1>Tack så mycket för din medverkan, <span id="emp_name"></span>!</h1>
    
    <div class="bar"></div>
    
    <h3>Återkom gärna för att ta testet och se inom vilket affärsområde det tror att du jobbar.</h3>
    <a href="../">Till startsidan</a>
    <input type="hidden" id="inphidd" 
           name-value="<?php echo $_SESSION['user_name'];?>"
           email-value="<?php echo $_SESSION['user_email']; ?>"
           area-value="<?php echo $_SESSION['user_busarea']; ?>"/>
  </div>
</body>
</html>
