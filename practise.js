const userTab=document.querySelector("[data-userWeather]");
 const searchTab=document.querySelector("[data-searchWeather]");
 const userContainer=document.querySelector(".weather-container");
const grataccessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-searchContainer]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-conatiner");


// initializing variables
let currentTab=userTab;
const API_key="1d2610808c28e5ceba06ab54d96aa93d";
currentTab.classList.add("current-tab");
// getfromsessionStorage();


// function switchTab:
function switchTab(clickedTab){
if(clickedTab!=currentTab){
    currentTab.classList.remove("current-tab");
    currentTab=clickedTab;
    currentTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active")){
        searchForm.classList.add("active");
        userInfoContainer.classList.remove("active");
        grataccessContainer.classList.remove("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        // getfromsessionStorage();
    }


}
}

userTab.addEventListener("click",()=>{
    // 
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

function getfromsessionStorage(){
    const loacalCoordinates=sessionStorage.getItem("user-coordinates");
    if(!loacalCoordinates){
        grataccessContainer.classList.add("active");
.
    }
    else{
        const coordinates=JSON.parse(loacalCoordinates);
        fetchUserWeatherinfo(coordinates);
    }
}

async function fetchUserWeatherinfo(coordinates){
const {lat,lon}=coordinates;
grataccessContainer.classList.remove("active");
loadingScreen.classList.add("active");
try{
    const respone=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    const data=await respone.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherinfo(data);
}
catch(err){
    loadingScreen.classList.remove("active");
}

}

function renderWeatherinfo(weatherInfo){
    const cityName= document.querySelector("[data-cityname]");
    const countryIcon=document.querySelector("[data-couontryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-wreatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloud]");

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png `;

    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;
    temp.innerText=weatherInfo?.main?.temp;
    windSpeed.innerText=weatherInfo?.wind?.speed;
    humidity.innerHTML=weatherInfo?.main?.humidity;
    cloudiness.innerText=weatherInfo?.clouds?.all;    
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert('your browser do not support navigator function..');
    }
}

function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherinfo(userCoordinates);
}

const grantaccessButton=document.querySelector("[data-grantAccess]");
gran




