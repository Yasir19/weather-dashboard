var history =[];
// Dom Elmenet refrence
var resultEl = document.getElementById("result");
var cityFormEl=document.getElementById("city-form");
var cityInputEl=document.getElementById("cityname");
var searchBtn =document.getElementById("searchBTn");
var dailyContiner = document.getElementById("daily");
var historyContiner = document.getElementById("history");


  // creating Element dynamically for weather infromation 
  var nameEl =document.createElement("h3");
  nameEl.setAttribute("class","city-name");
  var iconEl =document.createElement("img");
  iconEl.setAttribute("src","");

var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var windEl= document.createElement("p");
var uviEl= document.createElement("p");
var descEl= document.createElement("p");

// appending the dynamically create elment 
resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl, descEl, uviEl);


//APi key 
    var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
    var weatherApiRootUrl = 'https://api.openweathermap.org';
    // function to get the city name w

    let historySection = function(){
        historyContiner. innerHTML =" ";
        //start at the end of the history array and count donwn to show the most recet searche city at the top 
        for (let i=history.length -1;i>=0;i-- ){
            let historyBtn = document.createElement('button');
            historyBtn.setAttribute("type", "button");
            historyBtn.setAttribute("aria-control","today forecast");
            // `data-search` allows access to city name when click handler is invoked
            searchBtn.setAttribute("data-search",history[i]);
            historyBtn.textContent=history[i];
            historyContiner.append(historyBtn);
        }
    }
    // Function to update history in local storage then updates displayed history.
    let setHistory = function(city){
       if (history.indexOf(city) !== -1 ){
           return;
       };
       history.push(city);
       localStorage.setItem("city-history",JSON.stringify(history));
       historySection();
    }
    // Function to get search history from local storage
    let intialSearch = function(){
        let storedHistory = localStorage.getItem("city-history");
        if (storedHistory){
            history=JSON.parse(storedHistory);
        }
        historySection();
    }
//display wather information on the website 
var getWeather = function(city,weather){
    //define valrable for the
    var unixTs =weather.dt;
    let temp = weather.temp;
    let humidity =weather.humidity;
    let uvi = weather.uvi;
    let icon = weather.weather[0].icon;
    let description =weather.weather[0].description
    console.log(temp,humidity,uvi,icon,description);

    nameEl.innerText=city + dayjs.unix(unixTs).format("M/D/YYYY");
    iconEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText="Temp: "+ temp + "°F";
    descEl.innerText= description; 
    humidityEl.innerText="Humidity "+ humidity; 
    setHistory(city)
};
let dailyForecast = function (weather,city){
     //define valrable for the
     var unixTs =weather.dt;
     let temp = weather.temp.day;
     let humidity =weather.humidity;
     let uvi = weather.uvi;
     let icon = weather.weather[0].icon;
     let description =weather.weather[0].description
     console.log(temp,humidity,uvi,icon,description);
          // creating Element dynamically for weather infromation 
    var timeEl =document.createElement("h3");
    timeEl.setAttribute("class","city-name");
    var iconsEl =document.createElement("img");
    iconsEl.setAttribute("src","");

    var tempsEl= document.createElement("p");
    var humidEl= document.createElement("p");
    var windsEl= document.createElement("p");
    var descripEl= document.createElement("p");
    //write the infromation in each element 

    timeEl.innerText=dayjs.unix(unixTs).format("M/D/YYYY");
    iconsEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempsEl.innerText="Temp: "+ temp + "°F";
    descripEl.innerText= description; 
    humidEl.innerText="Humidity "+ humidity;

    dailyContiner.append(timeEl,iconsEl,tempsEl,humidEl,descripEl);
}
let daylyWeather = function(weather){
    var firstDay = dayjs().add(1, "day").startOf("day").unix();
    var lastday = dayjs().add(6,"day").startOf("day").unix();
    var titleSec = document.createElement("div");
    var title = document.createElement("h4");
    title.textContent ="5-Day forecast :";
    titleSec.append(title);

    dailyContiner.innerHTML="";
    dailyContiner.append(nameEl,iconEl,tempEl,humidityEl,windEl, descEl);
    dailyContiner.append(titleSec);

    for (let i= 0; i<weather.length; i++){
        if (weather[i].dt>= firstDay && weather[i].dt<lastday){
            dailyForecast(weather[i]);
        }
    }
} 

// var randomCity =function(i){
//     var cities= ["London","tokyo","paris","amsterdam","toronto", "moscow","dubai"];
//     for(var i = 0;i < cities.length;i++){
//         (function(i){
//             let time = setTimeout(function(){
//                 getCoords(cities[i]);
//                 document.body.style.backgroundImage =
//                 "url('https://source.unsplash.com/1600x900/?" + cities[i] + "')";
//             },5000*(i));
//                 // function to stop the timer 
//                 var stopTime = function (){
//                 // stop the timer
//                 clearTimeout(time);
//                 }
//                 searchBtn.addEventListener("click", stopTime);
//         })(i);
//     }

// }
function renderItems(city, data) {
    getWeather(city, data.current);
    daylyWeather(data.daily);
  }

// get weather info function 
var getWaetherInfo =function (location){
    var {lat} = location;
    var {lon} = location;
    var city = location.name
    // api Url for the weather infromation 
    var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
//make a request to the url 
fetch(apiUrl).then(function(response){
    // if the response is okay 
    if (response.ok){
        //get the data 
        response.json().then(function(data){
            console.log(data);
            renderItems(city, data);
          
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
function getCoords(city){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apiKey;
    //make a request to the url
    fetch(apiUrl)
    .then(function(response){ 
        return response.json();
    })
    .then(function(data){
        if (!data[0]){
            alert('location not found');
        }else {
            getWaetherInfo(data[0]);
            console.log(data);
        }
    })
            .catch(function(error){
                //alert the user 
                alert("Unable to connect to the server");
            });
}
var getCity =function(event){
    // prevent the browser from performing thr default action 
    event.preventDefault();
    //get the city name from the ccity input snd trim it if there is any spacing 
    var city = cityInputEl.value.trim();
    //check if the user enter a city name 
    if(city){
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

// randomCity();
// display a defult city before the search 
// event listerner to start search 
searchBtn.addEventListener("click", getCity);
