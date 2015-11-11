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
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skillsbar.css">

    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <link rel='stylesheet prefetch' href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css'>
    
    <script src="../data/data.json"></script>
    <script src="js/index.js"></script>
    <script>
      $(function() {
        $('progress').each(function() {
          var max = $(this).val();
          $(this).val(0).animate({ value: max }, { duration: 2000, easing: 'easeInOutQuart' });
  			});

        $('.area_result').toggleClass('area_result_vis');
        /*
        $('.area_result').each(function() {
          $(this).css('visibility','visible');
          $(this).css('opacity','1');
          $(this).css('transition','visibility 0s, opacity 0.5s linear');
        });*/
      });
    </script>
</head>
<body>
  <div class="container">
    <h1>Grattis!</h1>
    <div class="bar"></div>
    
    <h3>Om du hade jobbat hos oss hade du antagligen jobbat mot affärsområdet <span id="result-area"></span>.</h3> 
    <h4>Nedan kan du se matchings-resultaten. Du kan även klicka på de olika fälten för att få reda på mer information om de olika affärsområdena.</h4>
    <div class="bar"></div>
    
    <!--<div class="items" onclick=""></div>-->
    <!--<a href="#" id="dbexec" class="" onclick="getInput()">Kör test</a>-->
    
    <section id="skills">
					<progress value="80" max="100"></progress><span id="area1_holder">Business Application</span><span id="area1_result" class="area_result">80%</span>
					<progress value="70" max="100"></progress><span id="area2_holder">Business Design</span><span id="area1_result" class="area_result">70%</span>
					<progress value="60" max="100"></progress><span id="area3_holder">Business Solution</span><span id="area1_result" class="area_result">60%</span>
					<progress value="70" max="100"></progress><span id="area4_holder">Business Transformation</span>
      <span id="area1_result" class="area_result">70%</span>
    </section>
    <!--<a href="../statistics/" id="dbexec" class="btn btn-default submit" onclick="getInput()">Mer statistik</a>-->
<div id="nextbutton">
    <a href="../statistics/" id="a-stats" class="btn submit">Mer statistik ></a>
  </div>
    
    <input type="hidden" id="inphidd" 
           name-value="<?php echo isset($_SESSION['user_name']) ? $_SESSION['user_name'] : '';?>"
           email-value="<?php echo $_SESSION['user_email']; ?>"
           area-value="<?php echo $_SESSION['user_busarea']; ?>"/>
  </div>
  
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
</body>
</html>
