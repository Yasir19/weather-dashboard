var cityHistory =[];
// Dom Elmenet refrence
var resultEl = document.getElementById("result");
var cityFormEl=document.getElementById("city-form");
var cityInputEl=document.getElementById("cityname");
var searchBtn =document.getElementById("searchBTn");
var dailyContiner = document.getElementById("daily");
var historyContiner = document.getElementById("city-history");


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
var uviColor = document.createElement("button");

// appending the dynamically create elment 
resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl, descEl, uviEl);


//APi key 
    var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
    var weatherApiRootUrl = 'https://api.openweathermap.org';
    // function to get the city name w

    let historySection = function(){
        historyContiner.innerHTML ="";
        //start at the end of the history array and count donwn to show the most recet searche city at the top 
        for (let i=cityHistory.length -1;i>=0;i-- ){
            let historyBtn = document.createElement('button');
            historyBtn.setAttribute("class","historyBtn")
            historyBtn.setAttribute("type", "button");
            historyBtn.setAttribute("aria-control","today forecast");
            // `data-search` allows access to city name when click handler is invoked
            searchBtn.setAttribute("data-search",cityHistory[i]);
            historyBtn.textContent=cityHistory[i];
            console.log(cityHistory);
            historyContiner.append(historyBtn);
        }
    }
       // Function to update history in local storage then updates displayed history.
       function appendToHistory(city) {
       // If there is no search term return the function
       if (cityHistory.indexOf(city) !== -1) {
       return;
     }
     cityHistory.push(city);
  
    localStorage.setItem('search-history',JSON.stringify(cityHistory));
    historySection();
  }
    // Function to get search history from local storage
    let intialSearch = function(){
        let storedHistory = localStorage.getItem("search-history");
        if (storedHistory){
            cityHistory=JSON.parse(storedHistory);
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

    nameEl.innerText=city+' '+ dayjs.unix(unixTs).format("M/D/YYYY");
    iconEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText="Temp: "+ temp + "°F";
    descEl.innerText= description; 
    humidityEl.innerText="Humidity "+ humidity; 
    uviEl.innerText=" UV Index: ";
    uviColor.classList.add("btn", "btn-sm");
    if (uvi <3){
        uviColor.classList.add('btn-success'); 
    }else if (uvi <7){
        uviColor.classList.add('btn-warning');
    }else{
        uviColor.classList.add('btn-danger');
    }
    uviColor.textContent = uvi
    uviEl.append(uviColor);




};
let dailyForecast = function (weather,city){
     //define valrable for the
     var unixTs =weather.dt;
     let temp = weather.temp.day;
     let humidity =weather.humidity;
     let icon = weather.weather[0].icon;
     let description =weather.weather[0].description
     console.log(temp,humidity,icon,description);
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
    tempsEl.innerText="Temp: "+ temp + "°F";
    iconsEl.src="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    descripEl.innerText= description; 
    humidEl.innerText="Humidity "+ humidity;
    let container=document.createElement("div")
    container.setAttribute("class","card col-2")
     let title =document.createElement("div");
     title.setAttribute("class","card-title");
     let card=document.createElement("div");
     card.setAttribute("class","body");
    dailyContiner.appendChild(container);
    container.appendChild(title);
    container.append(card);
    title.append(timeEl);
    card.append(iconsEl,tempsEl,humidEl,descripEl);
}
let daylyWeather = function(weather){
    var firstDay = dayjs().add(1, "day").startOf("day").unix();
    var lastday = dayjs().add(6,"day").startOf("day").unix();
    // var forecast=document.createElement("h2");
    // var title=document.getElementById("forecast");
    // forecast.innerText="5 Day forecast";
    // title.append(forecast);
    for (let i= 0; i<weather.length; i++){
        if (weather[i].dt>= firstDay && weather[i].dt<lastday){
            dailyForecast(weather[i]);
        }
    }
} 

var randomCity =function(i){
    var cities= ["London","tokyo","paris","amsterdam","toronto", "moscow","dubai"];
    for(var i = 0;i < cities.length;i++){
        (function(i){
            let time = setTimeout(function(){
                document.body.style.backgroundImage =
                "url('https://source.unsplash.com/1600x900/?" + cities[i] + "')";
            },15000*(i));
                // function to stop the timer 
                var stopTime = function (){
                // stop the timer
                clearTimeout(time);
                }
                searchBtn.addEventListener("click", stopTime);
        })(i);
    }

}
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
            appendToHistory(city);
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
let historySelection = function(e){
    if(!e.target.matches(".historyBtn")){
        return;
    }
    var btn = e.target;
    var city = btn.getAttribute('data-search');
    getCoords(city);

} 

randomCity();
// display a defult city before the search 
// event listerner to start search 
intialSearch ();
searchBtn.addEventListener("click", getCity);
historyContiner.addEventListener("click", historySelection);





