// Set name in title on load
// Also add the SESSION variables to the
//  json variable that holds these user credentials
$(document).ready(function(e) {
  /*
  $hiddeninput = $('#inphidd');
  $name = $hiddeninput.attr('name-value');
  $email = $hiddeninput.attr('email-value');
  $program = $hiddeninput.attr('program-value');
  $gradYear = $hiddeninput.attr('gradYear-value');
  
  credentials['name'] = $name;
  credentials['email'] = $email;
  credentials['program'] = $program;
  credentials['gradYear'] = $gradYear;
  */
  credentials['name'] = getCookie('user-name');
  credentials['email'] = getCookie('user-email');
  credentials['program'] = getCookie('user-program');
  credentials['gradYear'] = getCookie('user-gradYear');
  
  console.log(credentials);
  
});

/* Helper function that builds the json 
    request body from the global variable
    -> 'model' (data.json).
================================== */
function buildJSONtoMySQL(result) {
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
      $str += '},"response":'+result+'}}';
    }
    i++;
  });
  return $str;
}

function buildJSONtoAzure() {
  // JSON body parts
  var jsonparts = {
    'start':'{"body":{"Inputs":{"input1":{"ColumnNames":["busArea"', 
    'middle':'],"Values":[["null"', 
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
    start += ', "' + key + '"';
    end += ', ' + ((value['value'])?1:0);
    /*
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
    */
  });
  totalstring = start + jsonparts['middle'] + end + jsonparts['end'];
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
    $('.items').css('display', 'none');
    $('.loadcontainer').css('display', 'block');
    doMLexec();
  });
});

function doMLexec() {
// Communicate with azure ML services
  //document.cookie = "user-response=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  var jsonaz = buildJSONtoAzure();
  console.log(jsonaz);
  jsonaz = JSON.parse(jsonaz);
  console.log(jsonaz);
  $.ajax({  
    //url: "/amd/php/mlexec_amd.php",
    url: "/php/mlexec_amd.php",
    type: "post",
    data: jsonaz,
    success: function(data) { // data arrives as a string
      console.log("This is response from azure: " + data);
      var obj = JSON.parse(data); // Parse to JSON object
      console.log(obj);
      $isBA = obj.Results.output1.value.Values[0][16];
      $isBD = obj.Results.output1.value.Values[0][17];
      $isBS = obj.Results.output1.value.Values[0][18];
      $isBT = obj.Results.output1.value.Values[0][19];
      //$isWhat = "'"+obj.Results.output1.value.Values[0][20]+"'";  
      $isWhat = obj.Results.output1.value.Values[0][20];  
      var res = {isBA:$isBA, isBD:$isBD, isBS:$isBS, isBT:$isBT, predicted:$isWhat};
      console.log(res);
      setCookie(JSON.stringify(res), 1);
      //console.log(JSON.parse(getCookie('user-response')));
      doDBexec();
    },
    error: function() {
      console.log('an error occurred.');
    }
  });
}

function doDBexec() {
 // Store student input
  var jsondb = buildJSONtoMySQL(getCookie('user-response'));
  console.log(jsondb);
  jsondb = JSON.parse(jsondb);
  console.log(jsondb);
  
  /*The ajax call to dbexec_stud.php */
  $.ajax({
    //url: "/amd/php/dbexec_stud.php",
    url: "/php/dbexec_stud.php",
    type: "post",
    data: jsondb,
    success: function(data) {
      console.log('Succeded with storing student input data.');
      console.log("SQL query number of affected rows: " + data);
      //$('.continue').trigger('click');
      //var domain = "http://" + window.location.hostname + "/amd/restest/";
      var domain = "http://" + window.location.hostname + "/restest/";
      window.location = domain;
    },
    error: function() {
      console.log('Failed to store data.');
      alert('Error: Failed to store data. Try to start over and cleanse with refresh.');
    }
  });
}

function setResults(response) {
  // Get the four probabilities
  
  // Store them in the result.areascores[0] array.
  
  // Decide which one is the largest (or sort from largest to smallest)
  
  // Store this stack in result.dropRelation[0] array
  
  // Get the predicted class
  
  // Set areascores
  result['areascores'][0]['BA'] = parseFloat($response['BA']);
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

function setCookie(cresp, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  //document.cookie = "user-response="+cresp+"; path=/amd; " + expires;
  document.cookie = "user-response="+cresp+"; path=/; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie() {
  //document.cookie = "user-response=; path=/amd; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "user-response=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}