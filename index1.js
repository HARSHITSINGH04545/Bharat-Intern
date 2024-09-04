const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grataccessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-searchContainer]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-conatiner");

// initial variables
let oldTab=userTab;
const API_key="1d2610808c28e5ceba06ab54d96aa93d";
oldTab.classList.add("current-tab");
getfromsessionStorage();
// ek kaamm or pemding hain..


function switchTab(newTab, formElement){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!formElement.classList.contains("active")){
            //abhi main your weather vale tab pr tha ,tho mene serac vale tab pr ui switch kara dia..
            userInfoContainer.classList.remove('active');
            grataccessContainer.classList.remove("active");
            formElement.classList.add("active");

        }
        else{
            // main phele search vale tab pr tha ab muje weather vala tab visible karana hain..
            formElement.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab mainyour weather vale tab pr hub tho muje weather bj]hi display lkarana padehga,so lets check the local mstorage first.
            // for codridante if i have save in a fuctin so let fetch it from the function..
            getfromsessionStorage();
        }


    }
}


userTab.addEventListener("click",()=>{
    // pass clicked tab as input parameter
    switchTab(userTab,searchForm);
    searchForm.classList.remove("active");

});
// searchTab.addEventListener("click",()=>{
// // pass clicked tab as input parameter...
// switchTab(searchTab);

// searchForm.classList.add("active");

// });

searchTab.addEventListener("click", () => {
    // Pass clicked tab as input parameter
    switchTab(searchTab,searchForm);
    // Activate the search form when the search tab is clicked
    searchForm.classList.add("active");
});


function getfromsessionStorage(){
    const localcoordinates=sessionStorage.getItem("user-coordinates");
    if(!localcoordinates){
        grataccessContainer.classList.add("active");

    }
    else{
        const coordinates=JSON.parse(localcoordinates);
        fetchUserWeatherinfo(coordinates);
    }
}
async function fetchUserWeatherinfo(coordinates){
const {lat,lon}=coordinates;
// make grantcontainer invisible
grataccessContainer.classList.remove("active");
// make loadder visible
loadingScreen.classList.add("active");
// API CALL
try{
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
const data=await response.json();
loadingScreen.classList.remove("active");
userInfoContainer.classList.add("active");
renderWeatherinfo(data);
}
catch(err){
    loadingScreen.classList.remove("active");

// /hw
}
}
function renderWeatherinfo(weatherInfo){
    // firstly ,we have to fetch the elements.

    const cityName= document.querySelector("[data-cityname]");
    const countryIcon=document.querySelector("[data-couontryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-wreatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloud]");
    // 
    // fetch value sfrom weatherinfo object and put it in ui elements
    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png `;

    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;
    temp.innerText=`${weatherInfo?.main?.temp}°c`;
    windSpeed.innerText= `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerHTML=`${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        // hw-show an alert for mo geloaction supprot available
    }
}
function showPosition(position){
    const userCoordinates={
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherinfo(userCoordinates );
}
const grantaccessButton=document.querySelector("[data-grantAccess]");
grantaccessButton.addEventListener("click",getLocation);

const  searchInput=document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName===""){
        return;
    }
    else{
        fetetchSearchWeatherInfo(cityName);
    }
})
async function fetetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grataccessContainer.classList.remove("active");
    try{
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
const data=await response.json();
loadingScreen.classList.remove("active");
userInfoContainer.classList.add("active");
renderWeatherinfo(data);
    }
    catch(err){

    }
}



