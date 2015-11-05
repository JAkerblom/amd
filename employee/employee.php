<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <Title>Kompetensenkät</Title>
	<script src="js/angular.js"></script>
	<script src="js/app2.js"></script>
	<!-- <script src="js/global.js"></script> -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<link rel="stylesheet" href="css/bootstrap.css"></link>
</head>
<body ng-app="MyApp">
    <div class="wrapper">
    <h1>Välkommen <span id="empName"></span>!</h1>
	<p>För att hjälpa Forefront bli bättre på att hitta nya talanger behöver du bara fylla i det här formuläret.</p>
    <p>Du ska markera de kompetens- eller intresseområden som är relevanta för dig i ditt dagliga arbete som en Forefront-konsult.</p>
    <label for="checkbox">
        <input id="checkbox" type="checkbox" ng-model="visible">Toggle me
    </label>
	<div show="visible">
		<p>Hello world!</p>
	</div>
	
        
        // Att lägga till som inlogg
	<form method="post" id="emp_form" action="<?php echo $_SERVER['REQUEST_URI']; ?>" enctype="multipart/form-data" >
      <input type="text" name="emp_name" id="emp_name" placeholder="Ditt namn"/></br>
      <input type="email" name="emp_email" id="emp_email" placeholder="Din emailadress"/></br>
      <input type="password" name="password" placeholder="password"/>
      <input type="submit" name="EmpSubmit" value="Skicka" />
	</form>
    
    //
	<form method="post" id="add" action="<?php echo $_SERVER['REQUEST_URI']; ?>"> 
		First: <input type="text" name="first" value=1></br>
        Second: <input type="text" name="second" value=2></br> 
        Third: <input type="text" name="third" value=3></br>
        Fourth: <input type="text" name="fourth" value=4></br>
        Fifth: <input type="text" name="fifth" value=5></br>
        <input type="submit" name="PredSubmit" value="Do calc">
	</form>
    </div>
	<p name="out_prob" id="out_prob">
        <?php include('php/mlexec.php'); ?>    
    </p>
    <div id="regdiv">
	   <?php include('php/dbexec.php');?>
    </div>
</body>
</html>

