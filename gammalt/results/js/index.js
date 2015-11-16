// Set name in title on load
// Also add the SESSION variables to the
//  json variable that holds these user credentials
$(document).ready(function(e) {
  $hiddeninput = $('#inphidd');
  $name = $hiddeninput.attr('name-value');
  $email = $hiddeninput.attr('email-value');
  $busArea = $hiddeninput.attr('area-value');
  $program = $hiddeninput.attr('program-value');
  
  credentials['name'] = $name;
  credentials['email'] = $email;
  credentials['busArea'] = $busArea;
  credentials['program'] = $program;
  
  console.log(credentials['name']);
  console.log(credentials['email']);
  console.log(credentials['busArea']);
  console.log(credentials['program']);
  
});
