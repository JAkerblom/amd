<?php  
  // The 'body' is sent via POST from the ajax script
  // It is built with javascript depending on what was 
  //  entered in the user form 
  $body = json_encode($_POST['body']);

  // Insert API credentials from Azure here. 
  // The URL to POST to and the related API key for 
  //  your deployed web service is needed 
  $url = 'https://europewest.services.azureml.net/workspaces/1ce72f845b6d4b40a0c44018ce41c9aa/services/9735b0f04f774429bbd751e5b980e2e1/execute?api-version=2.0&details=true';
  $api_key = 'EWSaBjWuRaJvu4iCPzvbyqxDYuAJjHimDu31qNWidTvCs1v34eXan/Cmok1KCDTXn8y4/gi14DlgmCUcMbVGKQ==';
  //$headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));
  $headers = array('Content-Type: application/json', 'Authorization:Bearer ' . $api_key, 'Content-Length: ' . strlen($body));

  // This is the CURL call to your Azure deployed web service. 
  // It can be made in various other ways, but this one works.
  // If you're doing it in another way and experience problems,
  //  it might have something to do with SSL_VERIFYPEER. 
  //  >> Without it my call didn't work very well from a deployed website
  //     However, it worked fine when having the web site on my localhost..
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  

  // The response is returned as a JSON string.
  // The ajax callback function parses it as a JSON object later on.
  $response = curl_exec($curl);
  curl_close($curl);

  // Echo the response. This will be percepted by the ajax callback.
  echo $response;
?>
