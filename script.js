var cityInput = JSON.parse(localStorage.getItem("1"));;
var APIKey = "8bebd070f80dace3c5498124f468dc36";
var lat = 0;
var lon = 0;
var x = "";
forecast();

$("#hist1").text(JSON.parse(localStorage.getItem("2")));
$("#hist2").text(JSON.parse(localStorage.getItem("3")));
$("#hist3").text(JSON.parse(localStorage.getItem("4")));
$("#hist4").text(JSON.parse(localStorage.getItem("5")));
$("#hist5").text(JSON.parse(localStorage.getItem("6")));
$("#hist6").text(JSON.parse(localStorage.getItem("7")));

function uvCall() {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
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

function forecast(){
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + ",us&APPID=8bebd070f80dace3c5498124f468dc36"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    var str = response.list[0].dt_txt;
    var date = str.split(" ");
    var tempF = Math.round((response.list[0].main.temp * 9) / 5 - 459.67);
    $("#temp").text("Temp: " + tempF + "°f");
    $("#cityDisplay").text(cityInput + " " + date[0]);
    $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " mph");

    lat = response.city.coord.lat.toFixed(2)
    lon = response.city.coord.lon.toFixed(2)
    console.log(response);
    x = response;
    uvCall();
    forecastInjection();
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
    var y = "http://openweathermap.org/img/w/" + x.list[conditionArray[i]].weather[0].icon + ".png";
    $("#tile"+[i]+"Icon").attr("src", y);
  }
}

$("#searchBtn").on("click", function() {
  var x1 = $("#search").val();
  var x2 = JSON.parse(localStorage.getItem("2"));
  var x3 = JSON.parse(localStorage.getItem("3"));
  var x4 = JSON.parse(localStorage.getItem("4"));
  var x5 = JSON.parse(localStorage.getItem("5"));
  var x6 = JSON.parse(localStorage.getItem("6"));
  var x7 = JSON.parse(localStorage.getItem("7"));
  cityInput = x1;
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
});
