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
var descEl= document.createElement("p");
var uviEl= document.createElement("p");
// appending the dynamically create elment 

resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl, descEl);

//APi key 
    var apiKey ="5d1bf1cd99bc77abc1a5d1777f514808";
    var weatherApiRootUrl = 'https://api.openweathermap.org';
    // function to get the city name w

//display wather information on the website 
var displayWeather = function(forecast){
    //define valrable for the weather data 
    var {unixTs}=forecast.dt
    var {icon,description}=forecast.weather[0].description;
    var {temp}=forecast.temp.day;
    var {humidity}=forecast;
    var {uvi}=forecast;


    //write the infromation in each element 
    nameEl.innerText=dayjs.unix(unixTs).format("M/D/YYYY");
    iconEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText="Temp: "+ temp + "°F";
    descEl.innerText=description; 
    humidityEl.innerText="Humidity "+ humidity; 
    uviEl.innerText= uvi;
    
};

// var rondomCity =function(i){
//     var cities= ["London","tokyo","paris","amsterdam","toronto", "moscow","dubai"];
//     var i = 0;
//     while(i < cities.length){
//         (function(i){
//             setTimeout(function(){
//                 getCoords(cities[i]);
//                 document.body.style.backgroundImage =
//                 "url('https://source.unsplash.com/1600x900/?" + cities[i] + "')";
//             },5000*(i+1));
           
//         })(i);
//         i++;
//     }

// }
var getcity = function(city,data){
    displayWeather(city ,data.current);
        var date =dayjs.format("M/D/YYYY");
    }

// get weather info function 
var getWaetherInfo =function (location){
    var lat = location;
    var lon = location;
    var city = location.name
    // api Url for the weather infromation 
    var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`;
//make a request to the url 
fetch(apiUrl).then(function(response){
    // if the response is okay 
    if (response.ok){
        //get the data 
        response.json().then(function(data){
          getcity(city, data);
        })
        // if the city name was wrong 
    }else{
       alert ("error occure");
    }
})
// if there is any network error
.catch(function(error){
    //alert the user 
    alert("Unable to connect to the server")
});
}

function getCoords(data,city){

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apiKey;
    //make a request to the url
    fetch(apiUrl)
    .then(function(response){ 
          // if the response is okay 
            if (response.ok){
                response.json().then(function(data){
                    console.log(data);
                });
            }else{
                alert("error City not found");
            }
          })
          
            // if there is any network error
            .catch(function(error){
                //alert the user 
                alert("Unable to connect to the server");
            });
}
var getCity =function(event,city){
    // prevent the browser from performing thr default action 
    event.preventDefault();
    //get the city name from the ccity input snd trim it if there is any spacing 
    var cityName = cityInputEl.value.trim();
    console.log(cityName);
    //check if the user enter a city name 
    if(cityName){
        //run the get weather function 
        getCoords(city);
        //clear the input filed 
        cityInputEl.value="";
        // if there is no input for the user 
    }else{
        // alert the user to enster a valid city 
        alert("please enter a valid city")
    }
     // change the backgroun color based on the city name
  
}

// rondomCity();
// display a defult city before the search 
// event listerner to start search 
searchBtn.addEventListener("click", getCity);
