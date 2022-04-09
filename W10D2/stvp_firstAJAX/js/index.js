console.log("Hello from the JavaScript console!");

// Your AJAX request here
var sucess = function(resp){
    $('.target').append(`<p>${resp.name}\n Feel like: ${resp.main.feels_like}</p>`)
    console.log(resp.main);
    console.log('inside the AJAX request')
}
var req = $.ajax({
    method: 'GET',
    url: "http://api.openweathermap.org/data/2.5/weather?q=new%20york,US&appid=bcb83c4b54aee8418983c2aff3073b3b",

});

req.then(sucess);
console.log('Hello from JS console!')

// Add another console log here, outside your AJAX request
