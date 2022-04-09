
Your First AJAX Request
Profile
Search
Your First AJAX Request
⏱ 30 minutes

Your First AJAX Request
You're going to dive more into AJAX in a bit, but we need to give you a taste before building jQuery lite in a few days.

Part 1: Up and Running
Download the skeleton. Open index.html in the browser and pop open the console (command + option + J or command + option + I). You should see a welcome message.

Part 2: AJAX of One Trade
Write an AJAX request underneath the top console.log. Some guidelines:

It should be a GET request.
It should get the New York weather from this url: http://api.openweathermap.org/data/2.5/weather?q=new%20york,US&appid=bcb83c4b54aee8418983c2aff3073b3b
If the request fails, sign up for your own API key here and stick that key in place of bcb83c4b54aee8418983c2aff3073b3b.
It should take a success callback
In the success callback, console.log out what the weather is.
Write another console.log at the bottom of the file (outside of the AJAX request). Your file should have this rough structure:

console.log("Hello from the JavaScript console!");

// your AJAX request
// --> including a console.log for the data in the success callback

// another console.log down here
Notice the order that the console.logs run.

Make sure you can answer the following questions:

When does the request get sent?
When does the response come back?
What's the current weather in New York?
Did the page refresh?
How could we use different HTTP methods in our request?
Did you find this lesson helpful?

No

Yes
✔︎ Submit Project
No file chosen
Download Solution
Archive your file into a .zip folder and click Submit Project to upload.

Solutions become available after uploading.