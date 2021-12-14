var apiKey ="5d1bf1cd99bc77abc1a5d1777f514808"
var getWaetherInfo =function (city){
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid="+apiKey;
//make a request to the url 
fetch(apiUrl).then(function(response){
    if (response.ok){
        response.json().then(function(data){
            console.log("data");
            displayWeather(data,city);
        });
    }else{
        alert("error City not found");
    }
})
.catch(function(error){
    alert("Unable to connect to the server")
});
};
getWaetherInfo();
var displayWeather = function(data){
    var {name}=data;
    var {icon}=data.weather[0];
    var {temp,humidity}=data.main;
    var {speed}=data.wind;
    console.log(name,icon,temp,humidity,speed)

}
