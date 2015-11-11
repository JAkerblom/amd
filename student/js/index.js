// Set name in title on load
// Also add the SESSION variables to the
//  json variable that holds these user credentials
$(document).ready(function(e) {
  $hiddeninput = $('#inphidd');
  $name = $hiddeninput.attr('name-value');
  $email = $hiddeninput.attr('email-value');
  $program = $hiddeninput.attr('program-value');
  $gradYear = $hiddeninput.attr('gradYear-value');
  
  
  credentials['name'] = $name;
  credentials['email'] = $email;
  credentials['program'] = $program;
  credentials['gradYear'] = $gradYear;
  
  console.log(credentials);
  
});

/* Helper function that builds the json 
    request body from the global variable
    -> 'model' (data.json).
================================== */
function buildJSONtoMySQL() {
  $str = '';
  
  $mdobj = models.predictors[0];
  $mdstr = JSON.stringify(models.predictors[0]);
  
  $str += '{"stud_input":{"credentials":' + JSON.stringify(credentials) + ',"subjects":{';
  var i = 1;
  $.each($mdobj, function(key, value) {
    $str += '"' + key + '"' + ':' + value['value'];
    if (i != Object.keys(models.predictors[0]).length) {
      $str += ', ';
    } else { 
      $str += '}}}';
    }
    i++;
  });
  return $str;
}

function buildJSONtoAzure() {
  // JSON body parts
  var jsonparts = {
    'start':'{"body":{"Inputs":{"input1":{"ColumnNames":[', 
    'middle':'],"Values":[[', 
    'end':']]}},"GlobalParameters":{}}}'
  };
  
  // JSON string start here
  var start = jsonparts['start'];
  var end = '';
  
  // Predictor names from (data.json)
  //var preds = model['predictors'][0]['names'];
  $mdobj = models.predictors[0];
  $mdstr = JSON.stringify($mdobj);
  var i = 1;
  $.each($mdobj, function(key, value) {
    start += '"' + key + '"';
    end += value['value'];
    if (i != Object.keys($mdobj).length) {
      start += ', ';
      end += ', ';
    } else {
      // Change depending on Y's
      start += ', "Y"' + jsonparts['middle']
      end += ', 0' + jsonparts['end'];
    }
    i++;
  });
  totalstring = start + end;
  return totalstring;
}

$(document).ready(function(e) {
  var i = 1;
  $items = $('.items')
  $.each(models.predictors[0], function(key, item) {
    $items.append('<input id="item' + i + '" type="checkbox" value="' + item.short + '">');
    $items.append('<label for="item' + i + '">' + item.name + '</label>');
    i = i + 1
  });
  $items.append('<h2 class="done" aria-hidden="true">Valda områden</h2>');
  $items.append('<h2 class="undone" aria-hidden="true">Ej valda områden</h2>');
});

$(document).on('click', 'label', function (e) {
  var itemnr = $(this).attr('for');
  $inputSibling = $(this).parent().find('#' + itemnr);
  $willbeValue = $inputSibling[0].checked;
  $subject = $inputSibling.attr('value');
  $isValue = models.predictors[0][$subject]['value'];
  models.predictors[0][$subject]['value'] = ($isValue && $willbeValue) ? false : true;
  console.log(models.predictors[0][$subject]['name'] + " is now " + models.predictors[0][$subject]['value']);
});
  
/* Pass the employee input form data to PHP script (via ajax)
  -> This PHP script in turn makes a 
  PDO db access to a Azure MySQL db.
================================= */
$(document).ready(function(e) {
  $('#dbexec').on('click', function(ev) {
    ev.preventDefault();
  
    // Store student input
    var jsondb = buildJSONtoMySQL();
    console.log(jsondb);
    jsondb = JSON.parse(jsondb);
    console.log(jsondb);
  
    /*The ajax call to dbexec_stud.php */
    $.ajax({
      url: "/amd/php/dbexec_stud.php",
      type: "post",
      data: jsondb,
      success: function(data) {
        console.log('Succeded with storing student input data.');
        console.log("SQL query number of affected rows: " + data);
      },
      error: function() {
        console.log('Failed to store data.');
        alert('Error: Failed to store data. Try to start over and cleanse with refresh.');
      }
    });
    
    // Communicate with azure ML services
    var jsonaz = buildJSONtoAzure();
    console.log(jsonaz);
    jsonaz = JSON.parse(jsonaz);
    console.log(jsonaz);
    $.ajax({  
      url: "/amd/php/mlexec.php",
      type: "post",
      data: jsonaz,
      success: function(data) { // data arrives as a string
        console.log("This is response from azure: " + data);
        var obj = JSON.parse(data); // Parse to JSON object
        console.log(obj);
        
        //$response = obj.Results.output1.value.Values[0][7];
        $response = obj.Results.output1.value.Values[0];
        setResults($response);
      },
      error: function() {
        console.log('an error occurred.');
      }
    });
    
    // Call the session.php script to store the interesting variables for next page
    //  i.e. student email??, and his results. In this page these are stored, in next 
    //  page they are displayed, except from the email.
    var userResult = JSON.stringify(result.areascores[0]);
    console.log("Stringified result json is: " + userResult);
    console.log(JSON.parse(userResult));
    var userResstr = '{"result":' + userResult + '}';
    console.log(userResstr);
    userResstr = JSON.parse(userResstr);
    // Ajax call to session variables
    $.ajax({
      type: "POST",
      url: "/amd/php/session.php",
      data: usercredsstr, 
      success: function (msg) {
        console.log('Success:' + msg);
      },
      error: function (err){
        alert('Något fel har inträffat i session.php');
      }
    });
  });
});

function setResults(response) {
  // Get the four probabilities
  
  // Store them in the result.areascores[0] array.
  
  // Decide which one is the largest (or sort from largest to smallest)
  
  // Store this stack in result.dropRelation[0] array
  
  // Get the predicted class
  
  // Set areascores
  result['areascores'][0]['BA'] = parseFloat($response[0]);
  result['areascores'][0]['BD'] = parseFloat($response[0])-0.15;
  result['areascores'][0]['BS'] = parseFloat($response[0])+0.15;
  result['areascores'][0]['BT'] = parseFloat($response[0])-0.6;
  
  // Set dropRelation
  var tmpRes = ['0.07', '0.723', '0.542'];
  result['dropRelation'][0]['area1'] = '';
}

// Depr: Not used currently, might be useful later
//  if SESSION variables are used. 
function getInput() {
  var inData = [];
  $.each(models.predictors[0], function(key, value) {
    console.log(key + ": " + value['value']);
  });
  return inData;
}
