var cityInput = "";
$("#hist1").text(JSON.parse(localStorage.getItem("2")));
$("#hist2").text(JSON.parse(localStorage.getItem("3")));
$("#hist3").text(JSON.parse(localStorage.getItem("4")));
$("#hist4").text(JSON.parse(localStorage.getItem("5")));
$("#hist5").text(JSON.parse(localStorage.getItem("6")));
$("#hist6").text(JSON.parse(localStorage.getItem("7")));


$("#searchBtn").on("click", function() {
  var x1 = $("#search").val();
  var x2 = JSON.parse(localStorage.getItem("2"));
  var x3 = JSON.parse(localStorage.getItem("3"));
  var x4 = JSON.parse(localStorage.getItem("4"));
  var x5 = JSON.parse(localStorage.getItem("5"));
  var x6 = JSON.parse(localStorage.getItem("6"));
  var x7 = JSON.parse(localStorage.getItem("7"));
  cityInput = x1;
  if(x4 === null){
      alert("null, bruh");
  }
  localStorage.setItem("1", JSON.stringify(x1));
  localStorage.setItem("2", JSON.stringify(x1));
  localStorage.setItem("3", JSON.stringify(x2));
  localStorage.setItem("4", JSON.stringify(x3));
  localStorage.setItem("5", JSON.stringify(x4));
  localStorage.setItem("6", JSON.stringify(x5));
  localStorage.setItem("7", JSON.stringify(x6));
  $("#hist1").text(cityInput);
    $("#hist2").text(x2);
    $("#hist3").text(x3);
    $("#hist4").text(x4);
    $("#hist5").text(x5);
    $("#hist6").text(x6);
});
