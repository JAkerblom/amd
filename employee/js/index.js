// Set name in title on load
// Also add the SESSION variables to the
//  json variable that holds these user credentials
$(document).ready(function(e) {
  $hiddeninput = $('#inphidd');
  $name = $hiddeninput.attr('name-value');
  $email = $hiddeninput.attr('email-value');
  $busArea = $hiddeninput.attr('area-value');
  
  $namespan = $('#emp_name');
  $firstname = $name.split(' ')[0];
  $namespan.text($firstname);
  
  credentials['name'] = $hiddeninput.attr('name-value');
  credentials['email'] = $hiddeninput.attr('email-value');
  credentials['busArea'] = $hiddeninput.attr('area-value');
  
  console.log(credentials['name']);
  console.log(credentials['email']);
  console.log(credentials['busArea']);
  
});


/* Helper function that builds the json 
    request body from the global variable
    -> 'model' (data.json).
================================== */
function buildJSON() {
  $str = '';
  
  $mdobj = models.predictors[0];
  $mdstr = JSON.stringify(models.predictors[0]);
  //$str += '{"empl_input":{"credentials":' + JSON.stringify(credentials) + ',"subjects":{';
  $str += '{"empl_input":{"credentials":{"name":"' + credentials['name'] + '","email":"' + credentials['email'] + '","busArea":"' + credentials['busArea'] + '"},"subjects":{';
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
    //ev.preventDefault();
    var json = buildJSON();
    console.log(json);
    json = JSON.parse(json);
    console.log(json);
    
    /* The ajax call to dbexec_empl.php 
      url: "/php/dbexec_empl.php",*/
    $.ajax({
      url: "/php/dbexec_empl.php",
      type: "post",
      data: json,
      success: function(data) {
        console.log('Succeded with storing employee input data.');
        console.log("SQL query results: " + data);
      },
      error: function() {
        console.log('Failed to store data.');
        alert('Error: Failed to store data. Try to start over and cleanse with refresh.');
      }
    });
  });
});

function setResults(response) {
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
