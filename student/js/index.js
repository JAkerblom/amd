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

/* Helper function that builds the json 
    request body from the global variable
    -> 'model' (data.json).
================================== */
function buildJSON(input) {
  // JSON body parts
  var jsonparts = {
    str:'{"empl_input":{"credentials":{',
    str:'"name":, "email":, "busarea":',
    str:'},"subjects":{}',
  }
  var json = {
    "empl_input":
    {
      "credentials":
      {
        "name":"", 
        "email":"", 
        "busarea":"",
      },
      "subjects":
      {
      }
    }
  };
  
  /*var json = {
    str = '"empl_input":{"credentials":{"name":"", 
        "email":"", 
        "busarea":"",
      },
      "subjects":
      {
      }
    }
  };*/
  
  // JSON string start here
  var str = jsonparts['start'];
  
  // Predictor names from (data.json)
  //var preds = model['predictors'][0]['names'];
  //preds.push(model['response'][0]['name'][0]);
  
  // For later:
  //Use index to retrieve the name for the model to run. 
  //preds.push(model['response'][0]['name'][index]);
  
  // Array: Inputed data from the form
  var data = input;
  var data = ["1", "0", "1", "0", "1", "1", "0", "1", "0", "1", "1", "0", "1", "0", "1", "0"];
  
  // Build json string with predictor names
  //  and input values.
  $.each(preds, function(index, value) {
    if (!(index === preds.length-1)) {
      str += '"' + value + '"' + ',';
    } else {
      str += '"' + value + '"' + jsonparts['middle'];
    }
  });
  $.each(data, function(index, value) {
    if (!(index === data.length-1)) {
      str += '"' + value + '"' + ',';
    } else {
      str += '"' + value + '"' + jsonparts['end'];
    }
  });
  return str;
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
  //console.log(models.predictors[0][$subject]['name'] + " is now " + models.predictors[0][$subject]['value']);
});
  
/* Pass the employee input form data to PHP script (via ajax)
  -> This PHP script in turn makes a 
  PDO db access to a Azure MySQL db.
================================= */
$(document).ready(function(e) {
  $('#dbexec').on('click', function() {
    var json = buildJSON(getInput());
    console.log(json);
    json = JSON.parse(json);
    
    /* The ajax call to dbexec_empl.php */
    $.ajax({
      url: "/amd/php/dbexec_empl.php",
      type: "post",
      data: json,
      success: function(data) {
        console.log('Succeded with storing employee input data.');
      },
      error: function() {
        console.log('Failed to store data.');
      }
    });
  });
});

// Depr: Not used currently, might be useful later
//  if SESSION variables are used. 
function getInput() {
  var inData = [];
  //$lengthOfSubs = model.predictors[0].names.length;
  $lengthOfSubs = Object.keys(models.predictors[0]).length;
  $items = $('.items')[0].children;
  $.each($items, function(index, value) {
    if (!$(this).is('h2') && index % 2 === 0) {
      //console.log(index + ": " + this.checked);
      inData.push(this.checked);  
      var val = this.value;
      //model.predictors[0].values[0][val] = this.checked;
      models.predictors[0][val] = this.checked;
    }
  });
  return inData;
}
