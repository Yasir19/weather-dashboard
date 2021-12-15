var resultEl = document.getElementById("result");
var cityFormEl=document.getElementById("city-form");
var cityInputEl=document.getElementById("cityname");
var searchBtn =document.getElementById("searchBTn");
    var apiKey ="5d1bf1cd99bc77abc1a5d1777f514808"
var getCity =function(event){
    event.preventDefault();
    var cityName=cityInputEl.value.trim();
    if(cityName){
        getWaetherInfo(cityName);
        cityInputEl.value="";
    }else{
        alert("please enter a valid city")
    }
}
var getWaetherInfo =function (city,data){
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+apiKey;
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

    var nameEl =document.createElement("h3");
    nameEl.setAttribute("class","city-name");
    var iconEl =document.createElement("img");
    iconEl.setAttribute("src","");
    var tempEl= document.createElement("p");
    var humidityEl= document.createElement("p");
    var windEl= document.createElement("p");
    resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl);
 
var displayWeather = function(data){
    var {name} = data;
    var {icon}=data.weather[0];
    var {temp,humidity}=data.main;
    console.log(name,icon,temp,humidity)
    nameEl.innerText="Weather in " + name;
    iconEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText="Temp: "+ temp + "°F";
    humidityEl.innerText="Humidity "+ humidity;
    
};
getWaetherInfo("london");
searchBtn.addEventListener("click", getCity);
