$(document).ready(function(e) {
  $('progress').trigger('click');
});

$(document).ready(function(e) {
  console.log("tada: "+credentials['email']);
});
                  

/* The drop-downs of area description 
    and picture. 'On click'
================================= */
/*
$(document).ready(function(e) {
  $('progress').on('click', function() {
    var areaDropPressed = $(this).attr('area-index');
    var areaValue = $(this).attr('area-val');
    $textbox = $('#area' + areaDropPressed);
    if ( $textbox.children().length == 0 ) {
      $textbox.append($('<span class="area-title">'+ areas[areaValue][0]['title'] +'</span><span class="area-desc">'+ areas[areaValue][0]['description'] +'</span>'));
    }
    closeAllSliders();
    if ($textbox.css('display') === 'none') {
      console.log("it was none.");
      $textbox.slideToggle();
    }
  });
});
*/

/* Helper function to drop downs 
    -> Closes all open slides so that
       when pressing new slide, other
       open sliders are closed.
================================= */
function closeAllSliders() {
  $('.descrdiv').each(function(index) {
    console.log($(this).css('display'));
    if ($(this).css('display') === 'block') 
    {
      $(this).slideToggle();
    }
    console.log($(this).css('display'));
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


