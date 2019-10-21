var cityInput = JSON.parse(localStorage.getItem("1"));;
var zipInput = 0;
var APIKey = "8bebd070f80dace3c5498124f468dc36";
var lat = 0;
var lon = 0;
var x = "";
var n = "";
var zip = false;
forecast();
for (i = 1; i < 7; i++){
  $("#hist"+[i]).text(JSON.parse(localStorage.getItem(i+1)));}

function uvCall() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&APPID=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var x = response.value.toFixed(1);
    $("#uvIndex").text("UV Index: ");
    $("#indexHolder").text(x);
    if (x > 0 && x < 3) {
      $("#indexHolder").attr("style", "background: green");
    }
    if (x >= 3 && x < 6) {
      $("#indexHolder").attr("style", "background: yellow");
    }
    if (x >= 6 && x < 8) {
      $("#indexHolder").attr("style", "background: orange");
    }
    if (x >= 8 && x < 10.1) {
      $("#indexHolder").attr("style", "background: red");
    }
  });
}

function currentStats(){
  var queryURL = "";
  if(zip === true){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&APPID=8bebd070f80dace3c5498124f468dc36"}
  else
  {var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + ",us&APPID=8bebd070f80dace3c5498124f468dc36"}
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response){
    var y = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    $("#mainIcon").attr("src", y);
    var tempF = Math.round((response.main.temp * 9) / 5 - 459.67);
    $("#temp").text("Temp: " + tempF + "°f");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.wind.speed.toFixed(1) + " mph");
    n = response;
    console.log(n);
})}

function forecast(){
  currentStats();
  var queryURL = "";
  if(zip === true){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipInput + ",us&APPID=8bebd070f80dace3c5498124f468dc36"}
  else
  {var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + ",us&APPID=8bebd070f80dace3c5498124f468dc36"}
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response){
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    $("#cityDisplay").text(response.city.name + " " + date);
    lat = response.city.coord.lat.toFixed(2);
    lon = response.city.coord.lon.toFixed(2);
    x = response;
    uvCall();
    forecastInjection();
    
  })
  .fail(function(){
    $("#cityDisplay").text("Please Enter City");
  })
}

function forecastInjection(){
  var conditionArray = [0, 5, 13, 21, 29, 37];
  for(var i = 0; i < conditionArray.length; i++){
    var str = x.list[conditionArray[i]].dt_txt;
    var y = str.split(" ");
    var str = y[0];
    var z = str.split("-");
    $("#tile"+[i]+"Date").text(z[1]+"-"+z[2]+"-"+z[0]);
    var y = "https://openweathermap.org/img/w/" + x.list[conditionArray[i]].weather[0].icon + ".png";
    $("#tile"+[i]+"Icon").attr("src", y);
    $("#tile"+[i]+"Temp").text("Temp: " + Math.round((x.list[i].main.temp * 9) / 5 - 459.67)+ " °f");
    $("#tile"+[i]+"Humidity").text("Humidity: "+x.list[i].main.humidity+"%");
  }
}

function search(){
  var x1 = $("#search").val();
  if(zip == true){x1 = $("#searchZip").val();}
  var x2 = JSON.parse(localStorage.getItem("2"));
  var x3 = JSON.parse(localStorage.getItem("3"));
  var x4 = JSON.parse(localStorage.getItem("4"));
  var x5 = JSON.parse(localStorage.getItem("5"));
  var x6 = JSON.parse(localStorage.getItem("6"));
  var x7 = JSON.parse(localStorage.getItem("7"));
  cityInput = x1
  localStorage.setItem("1", JSON.stringify(x1));
  localStorage.setItem("2", JSON.stringify(x1));
  localStorage.setItem("3", JSON.stringify(x2));
  localStorage.setItem("4", JSON.stringify(x3));
  localStorage.setItem("5", JSON.stringify(x4));
  localStorage.setItem("6", JSON.stringify(x5));
  localStorage.setItem("7", JSON.stringify(x6));
  $("#hist1").text(x1);
  $("#hist2").text(x2);
  $("#hist3").text(x3);
  $("#hist4").text(x4);
  $("#hist5").text(x5);
  $("#hist6").text(x6);
  forecast();
}

$("#searchBtn").on("click", function() {
  zip = false;
  search();
});

$("#searchBtnZip").on("click", function() {
  zip = true;
  zipInput = $("#searchZip").val();
  search();
});

$(".searchHist").on("click", function(){
  var y = $(this).text();
  if(isNaN(y) === true){
  cityInput = $(this).text();
  $("#search").val(cityInput);
  zip = false}else{
    zipInput = $(this).text();
    $("#searchZip").val(zipInput);
    zip = true;
  }console.log(isNaN(y));
  search();
})