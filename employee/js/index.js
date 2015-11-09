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

/* Helper function to insert area
    description in the paragraph that
    it is destined to reside by id
================================= */
function replaceDescr(obj, id) {
  var descr = areas[id][0]['description'];
  obj.html(descr);
}
function replaceTitle(obj, id) {
  var title = areas[id][0]['title'];
  console.log(obj);
  obj.html(title);
}

/* Use the response and set global 
    json variables.
  Goal is to set 'areascores' with 
    the probabilities, as well to
    set  
=================================== */
function setResults(response) {}

/* Helper function that builds the json 
    request body from the global variable
    -> 'model' (data.json).
================================== */
function buildJSON() {
  $str = '';
  
  $mdobj = models.predictors[0];
  $mdstr = JSON.stringify(models.predictors[0]);
  $str += '{"empl_input":{"credentials":' + JSON.stringify(credentials) + ',"subjects":{';
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
    var json = buildJSON();
    console.log(json);
    json = JSON.parse(json);
    console.log(json);
    //ev.preventDefault();
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
        alert('Error');
      }
    });
  });
});

// Depr: Not used currently, might be useful later
//  if SESSION variables are used. 
function getInput() {
  var inData = [];
  $.each(models.predictors[0], function(key, value) {
    console.log(key + ": " + value['value']);
  });
  return inData;
}
