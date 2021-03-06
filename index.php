<?php 
session_name('login');
session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Forefront Arbetsmarknadsdagarna</title>
    
  <!--<link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>-->
  <link rel="shortcut icon" href="images/ffcgicon.ico">
  <link href="http://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet">

  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/normalize.css">

  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  
  <script src="data/data.json"></script>
  <script src="js/index.js"></script>
  
 <style>
   /*.container {
     box-shadow: 0 0 20px rgba(0, 0, 0, .1);
   }*/
   
    #student_list select,
    #employee_list select 
    {
      display: none;
      /*background: #fff;*/
      /*background: url('../images/drop-green(4).png') no-repeat right #fff;
  background-size: 45px 45px;*/
      color: #6a6969;
      width: 100%;
      height: 43px;
      font-size: 1.2em;
      padding: 10px 10px 10px 10px;
      /*padding:10px 10px 15px 20px;*/
      border: 0;
      border-radius: 0 !important;
      -webkit-appearance: none;
    }
    
    @media (min-width: 769px) {
      #student_list select,
      #employee_list select 
      {
        display: none !important;
      }
    }
    
    @media (max-width: 768px) {
      .main-drop    { display: none; }
      #student_list select
      { 
        display: inline-block; 
      }
    }
    
    #student_ul, 
    #employee_ul 
    {
      overflow: scroll;
      height: 200px;
    }
  </style>
</head>
<body onload="deleteCookie()">
  
  <div class="container main">
    <div class="row">
      <div class="col-md-6 col-md-offset-3 text-center title">
      <!--<h1>Vilket affärsområde tillhör du?</h1>-->
        <h1>Vill du veta var du<br><span style="font-size:1.5em">passar in hos oss?</span></h1>
          <!--<h1>Vill du veta vilket <br><span style="font-size:1.5em">affärsområde <br>DU tillhör?</span></h1>-->
        <div class="bar"></div>
        <div class="row" style="display:none;">
          <div class="col-md-6 col-md-offset-3 form accounttype">
            <table style="width:100%">
              <tr>
                <td>
                  <input type="radio" value="student" id="radioOne" name="typeofUser" checked="checked" />
                  <label for="radioOne" class="radio" id="radioIcon">Student</label>
                </td>
                <td>
                  <input type="radio" value="employee" id="radioTwo" name="typeofUser" />
                  <label for="radioTwo" class="radio" id="radioIcon">Anställd</label>          
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--<div class="bar"></div>-->
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-md-offset-3 form">
        <h2>Ange dina uppgifter</h2>
        <input type="text" name="inputOne" id="inputOne" tabindex="1" placeholder="namn"/><br/>
        <input type="email" name="inputTwo" id="inputTwo" tabindex="2" placeholder="email"/><br/>
        <input type="number" name="inputThree" id="inputThree" tabindex="3" placeholder="examensår" style="color:#464646; width:100%; border:none; padding:6px; font-size:1.2em;padding-left:10px"/><br/>
        <p>
        <div class="drop-wrap">
          <div class="main-drop program" tabindex="4">
            <div id="program_holder" data-value="">Välj utbildning</div>
            <span>
              <img src="images/drop-green(4).png" width="45px" height="45px" class=""/>
            </span>
          </div>
          <div class="drop-list" id="student_list">
            <ul id="student_ul"></ul>
            <select></select>
          </div> 
          <div class="drop-list" id="employee_list">
            <ul id=employee_ul>
              <li class="emplChoice" tabindex="4"></li>
              <li class="emplChoice" tabindex="5"></li>
              <li class="emplChoice" tabindex="6"></li>
              <li class="emplChoice" tabindex="7"></li>
            </ul>
            <select></select>
          </div>
        </div>
        </p>
        <a href="student/" class="btn btn-default login" id="login">Vidare till testet</a>
      </div>
    </div>
  </div>
  <div style="display:none;"><a href="student/" class="continue"></a></div>
</body>
</html>
