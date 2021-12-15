// Dom Elmenet refrence
var resultEl = document.getElementById("result");
var cityFormEl=document.getElementById("city-form");
var cityInputEl=document.getElementById("cityname");
var searchBtn =document.getElementById("searchBTn");

// creating Element dynamically for weather infromation 
var nameEl =document.createElement("h3");
nameEl.setAttribute("class","city-name");

var iconEl =document.createElement("img");
iconEl.setAttribute("src","");

var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var windEl= document.createElement("p");
// appending the dynamically create elment 
resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl);

//APi key 
    var apiKey ="5d1bf1cd99bc77abc1a5d1777f514808"
    // function to get the city name w
var getCity =function(event){
    // prevent the browser from performing thr default action 
    event.preventDefault();
    //get the city name from the ccity input snd trim it if there is any spacing 
    var cityName = cityInputEl.value.trim();
    //check if the user enter a city name 
    if(cityName){
        //run the get weather function 
        getWaetherInfo(cityName);
        //clear the input filed 
        cityInputEl.value="";
        // if there is no input for the user 
    }else{
        // alert the user to enster a valid city 
        alert("please enter a valid city")
    }
     // change the backgroun color based on the city name
    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + cityName + "')";
}

// get weather info function 
var getWaetherInfo =function (city,data){
    // api Url for the weather infromation 
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+apiKey;
//make a request to the url 
fetch(apiUrl).then(function(response){
    // if the response is okay 
    if (response.ok){
        //get the data 
        response.json().then(function(data){
            // run dsiplay weathr function 
            displayWeather(data,city);
        });
        // if the city name was wrong 
    }else{
        // alert the user 
        alert("error City not found");
    }
})
// if there is any network error
.catch(function(error){
    //alert the user 
    alert("Unable to connect to the server")
});
};

//display wather information on the website 
var displayWeather = function(data){
    //define valrable for the weather data 
    var {name} = data;
    var {icon}=data.weather[0];
    var {temp,humidity}=data.main;

    //write the infromation in each element 
    nameEl.innerText="Weather in " + name;
    iconEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText="Temp: "+ temp + "°F";
    humidityEl.innerText="Humidity "+ humidity; 
};
// display a defult city before the search 
getWaetherInfo("london");
// event listerner to start search 
searchBtn.addEventListener("click", getCity);
