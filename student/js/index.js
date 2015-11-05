/* The drop-downs of area description 
    and picture. 'On click'
================================= */
$(document).ready(function(e) {
  $('.main-drop').on('click', function() {
    var areaDropPressed = $(this).parent().attr('id');
    closeAllSliders();
    
    //Try to populate divs with title first when result has been given. Then when div is pressed you can populate with paragraph title and description, + image
    
    //var identifier = 'BS';
    console.log($.type(result['dropRelation'][0][areaDropPressed]));
    var areaToGet = result['dropRelation'][0][areaDropPressed];
    console.log('The area to get: ' + areaToGet);
    
    // The list to fill with picture, and
    //  various area information
    var ul = '#' + areaDropPressed + '_list';
    var areaDesc = $(ul).find(' .area_description');
    var areaHolder = $(this).find('area_holder');
    if ($(ul).css('display') === 'none') {
      $(ul).slideToggle();
      replaceDescr(areaDesc, areaToGet);
      replaceTitle(areaHolder, areaToGet);
    }
  });
});

/* Helper function to drop downs 
    -> Closes all open slides so that
       when pressing new slide, other
       open sliders are closed.
================================= */
function closeAllSliders() {
  $('.drop-wrap ul').each(function(index) {
    if ($(this).css('display') === 'block') 
    {
      $(this).slideToggle();
    }
  });
}

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


/* getResults to pass the user input 
    form data to PHP script (via ajax)
  -> This PHP script in turn makes a 
  CURL call to the Azure ML web service.
  -> Returns response body which is stored
  in a global variable result (data.json).
================================= */
$(document).ready(function getResults($arr) {
  $response = '';
  $('#mlexec').on('click', function() {
    console.log('Du klickade');
    
    // Lägger till body så att man kan fånga json-variabeln med denna i $_POST.
    // Man kan säkert även lägga till andra variabler för det man kan tänka sig skicka med i POSTen.
    var json = buildJSON('');
    console.log(json);
    json = JSON.parse(json);
    
    /* The ajax call to mlexec2.php */
    $.ajax({
      url: "/amd/php/mlexec2.php",
      type: "post",
      data: json,
      success: function(data) { // data arrives as a string
        console.log("This is response from azure: " + data);
        var obj = JSON.parse(data); // Parse to JSON object
        
        $response = obj.Results.output1.value.Values[0][7];
        //$response = obj.Results.output1.value.Values[0];
        $resultArr = [];
        var probStart = model.predictors[0]['howmany'] + model.response[0]['howmany'];
        console.log(probStart);
        /*$.each($response, function(index, value) {
          if (index > probStart) {
            $resultArr.push($response[index])
          }
        });*/
      
        setResults($response);
      },
      error: function() {
        console.log('an error occurred.');
      }
    });
  });
});

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
    'start':'{"body":{"Inputs":{"input1":{"ColumnNames":[', 
    'middle':'],"Values":[[', 
    'end':']]}},"GlobalParameters":{}}}'
  };
  
  // JSON string start here
  var str = jsonparts['start'];
  
  // Predictor names from (data.json)
  var preds = model['predictors'][0]['names'];
  // For now only binary class predict (1 col)
  preds.push(model['response'][0]['name'][0]);
  
  // For later:
  //Use index to retrieve the name for the model to run. 
  //preds.push(model['response'][0]['name'][index]);
  
  // Array: Inputed data from the form
  var data = input;
  var data = ["1", "2", "3", "4", "5", "0"];
  
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

function getInput() {
  var inData = [];
  
  var lengthOfSubs = model.predictors[0]['howmany'];
  var subdiv = $('.test-subjects');
  var boxArr = subdiv[0].children;
  //var boxArr = subdiv[0].children.splice(0,2);
  $.each(boxArr, function(index, value) {
    if (index < 2*lengthOfSubs) {
      if (index % 2 === 0) {
        console.log(index + ": " + this.checked);
      } else {
        console.log(index + ": " + this.htmlFor);
      }
    }
  });
  //inData.push();
}


