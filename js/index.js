/*jslint browser: true*/
/*global $, jQuery, alert*/

// Fill drop down lists with content from data/data.json
// =====================================================
$(document).ready(function() {  
  // Student list
  $stud_list = $('#student_list ul');
  $stud_select = $('#student_list select');
  $stud_select.append('<option value="">Välj inriktning</option>');
  var i = 0;
  $.each(programs.progs, function(key, item) {
    var progname = item['name'];
    var progshort = item['short'];
    $stud_list.append('<li class="progChoice" value="' + progshort + '" tabindex="' + (i+4) + '">' + progname + '</li>');
    $stud_select.append('<option value="' + progshort + '">' + progname + '</option>');
    i = i + 1;
  });
  
  // Employee list
  $empl_list = $('#employee_list ul')[0]['children'];
  $empl_select = $('#employee_list select');
  $empl_select.append('<option value="">Din affärsområdestillhörighet</option>');
  i = 0;  
  $.each(areas, function(key, item) {
    var areaname = item[0]['title'];
    var areashort = item[0]['id'];
    $empl_list[i].innerHTML = areaname;
    $empl_list[i].setAttribute('value', areashort);
    $empl_select.append('<option value="' + areashort + '">' + areaname + '</option>');
    i = i + 1;
  });
});

// When type of user is chosen via radio buttons, i.e. changed from 
//  automatic choice of student, then the form content is changed.
// ============================================================
$(document).ready(function (e) {
  $typeofUser = $('input:radio[name=typeofUser]');
  $typeofUser.on('change', function () {
    // Get all elements to change
    var $inputOne = $('#inputOne'), $inputTwo = $('#inputTwo'), $anchor = $('#login');
    
    // Check which type of user that was changed into.
    $stud_select = $('#student_list select');
    $empl_select = $('#employee_list select');
    $programOrArea = !($typeofUser[0]['checked']) ? "program" : "busArea";
    credentials[$programOrArea] = '';
    $('#program_holder').attr('data-value', '');
    if (isStudent()) {
      console.log("Changed to student");
      $anchor.attr('href', 'student/');
      $anchor.text('Vidare till testet');
      $stud_select.attr('value', '');
      if ($(window).width() <= 768) {          
        $empl_select.css('display', 'none');
        $stud_select.css('display', 'inline-block');
      }
      placeText(null, 'Välj utbildning');
    } else {
      console.log("Changed to employee");
      $anchor.attr('href', 'employee/');
      $anchor.text('Vidare till enkäten');
      $empl_select.attr('value', '');
      if ($(window).width() <= 768) {
        $stud_select.css('display', 'none');
        $empl_select.css('display', 'inline-block');
      }
      placeText(null, 'Din affärsområdestillhörighet');
    }
    
    // To ensure that the drop downs does not stack on top of
    //  each other when switching from student to employee.
    var stud_uldisp = $('#student_ul').css('display');
    var empl_uldisp = $('#employee_ul').css('display');
    if (isStudent() && (empl_uldisp === 'block')) {
      $('#employee_list ul').slideToggle();
    } else if (!isStudent() && (stud_uldisp === 'block')) {
      $('#student_list ul').slideToggle();
    }
  });
});

// When either the drop-down div or a list element was pressed
//  the drop-down slider should be toggled
// ===========================================================
$(document).ready(function (e) {
  $('.main-drop').on('click', doSlideToggle);
  $('.drop-list ul').on('click', doSlideToggle);
});
$(function () {
  $('.program').keyup(function (e) {
    if (e.which === 13) {   //Enter key was pressed
      $('.main-drop').trigger('click');
    }
  });
});
var doSlideToggle = function() {
  if (isStudent()) {
      console.log('It was a student, showing student list.');
      $('#student_list ul').slideToggle();
    } else {
      console.log('It was an employee, ...');
      $('#employee_list ul').slideToggle();
    }
}
// When list element is pressed, this should change text
//  of drop down container and become the current choice.
// ======================================================
$(document).on('click', '.progChoice', function (e) {
  placeText($(this));
});
$(document).on('click', '.emplChoice', function (e) {
  placeText($(this));
});

$(document).on('click', '.login', function (e) {
  e.preventDefault();
  $typeofUser = $('input:radio[name=typeofUser]');
  if ($typeofUser[0]['checked']) {
    //e.preventDefault();
    //alert("Student test function is not released yet."); 
  }
  $name = $('#inputOne');
  $email = $('#inputTwo');
  $gradYear = $('#inputThree');
  credentials['gradYear'] = $gradYear.val();
  $droplist = $('#program_holder');
  $alert = false;
  $alertstr = '';
  if ($name.val()) {
    credentials['name'] = $name.val();
  } else {e.preventDefault(); $alert = true; $alertstr = $alertstr + "Please type your name. \n";}
  
  if ( isValidEmail($email.val()) ) {
    credentials['email'] = $email.val();
  } else {e.preventDefault(); $alert = true; $alertstr = $alertstr + "Please type a valid email. \n";}

  $programOrArea = $typeofUser[0]['checked'] ? "program" : "busArea";
  
  if ($(window).width() > 768) {
    $placeholderValue = $('#program_holder').attr('data-value');
    if ($placeholderValue != '') {
      credentials[$programOrArea] = $placeholderValue;
    } else {e.preventDefault(); $alert = true; $alertstr = $alertstr + "Please choose a program. \n";}
  } else {
    $select = $typeofUser[0]['checked'] ? $('#student_list select') : $('#employee_list select');
    $selstr = $typeofUser[0]['checked'] ? "Please choose a program. \n" : "Please choose a business area. \n";
    if ($select.val() != '') {
      credentials[$programOrArea] = $select.val();
    } else {e.preventDefault(); $alert = true; $alertstr = $alertstr + $selstr;}
  }
  console.log("Your name is: " + credentials['name']);
  console.log("Your email is: " + credentials['email']);
  console.log("Business area is: " + credentials['busArea']);
  console.log("Program is: " + credentials['program']);
  console.log("GradYear is: " + credentials['gradYear']);
  
  var usercreds = JSON.stringify(credentials);
  console.log(JSON.parse(usercreds));
  console.log(usercreds);
  var usercredsstr = '{"credentials":' + usercreds + '}';
  console.log(usercredsstr);
  usercredsstr = JSON.parse(usercredsstr);
  
  /* The ajax call to store session variables 
    url: "/php/session.php", */
  var isDone = false;
  $.ajax({
    type: "POST",
    url: "/php/session.php",
    data: usercredsstr, 
    success: function (msg) {
      console.log('Success:' + msg);
      isDone = true;
    },
    error: function (err){
      //alert('Error');
    }
  });
  if ($alert) {alert($alertstr);}
  if (isDone) {$(this).trigger('click');}
});
  

// Helper functions
// ====================
  // Check whether or not student radio button is checked or not
function isStudent() {
  var isStudent = true;
  var $typeofUser = $('.accounttype :input');
  if (!$typeofUser[0]['checked']) {
    isStudent = false;
  }
  return isStudent;
}

  // When choice in dropdown is chosen it replaces text in drop div
function placeText(obj, str) {
  //var placeholder = document.getElementById('program_holder');
  $placeholder = $('#program_holder');
  if (!str) {
    var element = obj;
    $placeholder.text(element.context.innerHTML);
    $placeholder.attr('data-value', obj.attr('value'));
  } else {
    var text = str;
    $placeholder.text(text);
  }
}

function isValidEmail(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};


/*for (i = 0; i < programs.prognames.length; i++) {
    var progname = programs.prognames[i];
    var progshort = programs.progshort[i];
    $stud_list.append('<li class="progChoice" value="' + progshort + '" tabindex="' + (i+4) + '">' + progname + '</li>');
    $stud_select.append('<option value="' + progshort + '">' + progname + '</option>');
  }*/