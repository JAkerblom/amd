/* The drop-downs of area description 
    and picture. 'On click'
================================= */
$(document).ready(function(e) {
  $('.main-drop').on('click', function() {
    var areaDropPressed = $(this).parent().attr('id');
    closeAllSliders();
    
    // Try to populate divs with title first when result has been given. 
    // Then when div is pressed you can populate with paragraph 
    //  title and description, + image
    
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


