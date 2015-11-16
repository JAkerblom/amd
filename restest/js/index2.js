$(document).ready(function(e) {
  $('progress').trigger('click');
});
    

$(document).ready(function(e) {
  $areaHolders = $('.area_holder');
  $resultHolders = $('.area_result');
  console.log($resultHolders);
  console.log($areaHolders);
  
  $c = JSON.parse(getCookie('user-response'));
  setResults();
  
  var keystr;
  var i;
  for (i = 0; i < 4; i++) {
    keystr = Object.keys(result.dropRelation[0])[i];
    value = result.areascores[0][result.dropRelation[0][keystr]];
    console.log(value);
    $('#'+keystr+'_holder').text(areas[result.dropRelation[0][keystr]][0]['title']);
    $('#'+keystr+'_result').text(value*100+"%");
    $('progress[area-index="'+(i+1)+'"').attr('value', value*100);
  }
    
  //$areaHolders[i].textContent = '';
  //$resultHolders[i].textContent = '';
  //console.log($areaHolders[i].textContent);
  //console.log($resultHolders[i].textContent);
});


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

function setResults() {
  // Set areascores
  $c = JSON.parse(getCookie('user-response'));
  $('#result-area').text(areas[$c['predicted']][0]['title']);
  
  result['areascores'][0]['BA'] = $c['isBA'];
  result['areascores'][0]['BD'] = $c['isBD'];
  result['areascores'][0]['BS'] = $c['isBS'];
  result['areascores'][0]['BT'] = $c['isBT'];
  console.log(result['areascores'][0]);
  //var tmp = result['areascores'][0];
  var tmp;
  var keyarr = Object.keys(result.areascores[0]);
  var valarr = new Array();
  //var newjson = "{";
  var maxVal = -1;
  var i;
  $.each(result['areascores'][0], function(key, value){ 
    valarr.push(value);
  });
  console.log(valarr);
  console.log(keyarr);
  for (i = 0; i < 4; i++) {
    if (valarr[i] < valarr[i+1]) {
      tmpval = valarr[i+1];
      valarr[i+1] = valarr[i];
      valarr[i] = tmpval;
      
      tmpkey = keyarr[i+1];
      keyarr[i+1] = keyarr[i];
      keyarr[i] = tmpkey;
      i = i-2;
    }
  }
  
  i = 0;
  $.each(result['dropRelation'][0], function(key, value) {
    result['dropRelation'][0][key] = keyarr[i];
    i++;
  });
         
  console.log(keyarr);
  console.log(result['dropRelation'][0]);
  
    /*if (value > maxVal) {
      maxVal = value;
      newjson += key + ":" + value;
      //newjson.push(key+':'+value);
       
    }
    i++;
    */

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

