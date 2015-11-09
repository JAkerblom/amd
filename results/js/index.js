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
