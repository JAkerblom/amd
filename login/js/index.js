/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function (e) {
  $('.drop-wrap').on('click', function () {
    if (isStudent()) {
      console.log('It was a student, showing student list.');
      $('#student_list ul').slideToggle();
    } else {
      console.log('It was an employee, ...');
      $('#employee_list ul').slideToggle();
    }
  });
});

$(function () {
  $('.program').keyup(function (e) {
    if (e.which === 13) {   //Enter key was pressed
      $('.drop-wrap').trigger('click');
    }
  });
});


  // When choice in dropdown is chosen it replaces text in drop div
function placeText(obj, str) {
  var placeholder = document.getElementById('program_holder');
  if (!str) {
    var element = obj;
    placeholder.innerHTML = element.context.innerHTML;
  } else {
    var text = str;
    placeholder.innerHTML = text;
  }
}
$(document).ready(function (e) {
  $('.progChoice').on('click', function (e) {
    placeText($(this));
  });
});


    // When type of user is chosen via radio buttons, i.e. changed from 
    //  automatic choice of student, then the form content is changed.
$(document).ready(function (e) {
  var $typeofUser = $('input:radio[name=typeofUser]');
  $typeofUser.on('change', function () {
    
    // Get all elements to change
    var $inputOne = $('#inputOne'), $inputTwo = $('#inputTwo'), $droplist = $('#program_holder');
    
    // Check which type of user that was changed into.
    if (isStudent()) {
      console.log("Changed to student");
      $inputOne.attr('placeholder', 'namn');
      $inputOne.attr('type', 'text');
      $inputTwo.attr('placeholder', 'email');
      $inputTwo.attr('type', 'email');
      
      placeText(null, 'Välj inriktning');
    } else {
      console.log("Changed to employee");
      $inputOne.attr('placeholder', 'email');
      $inputOne.attr('type', 'email');
      $inputTwo.attr('placeholder', 'lösenord');
      $inputTwo.attr('type', 'password');
      
      placeText(null, 'Din affärsområdestillhörighet');
    }
    
    var stud_uldisp = $('#student_ul').css('display');
    var empl_uldisp = $('#employee_ul').css('display');
    if (isStudent() && (empl_uldisp === 'block')) {
      $('#employee_list ul').slideToggle();
    } else if (!isStudent() && (stud_uldisp === 'block')) {
      $('#student_list ul').slideToggle();
    }
  });
});

function isStudent() {
  var isStudent = true;
  var $typeofUser = $('.accounttype :input');
  if (!$typeofUser[0]['checked']) {
    isStudent = false;
  }
  return isStudent;
}

