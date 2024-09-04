

// this page is for generaal information about the api ....


console.log("Hlo this is master");
const API_key="1d2610808c28e5ceba06ab54d96aa93d";

function renderWeatherinfo(data){//this function update the infromation on the ui
    // formarion on the
  let newPara=document.createElement("p");
    newPara.textContent=`${data?.main?.temp.toFixed(2)} *C`
    document.body.appendChild(newPara);

}

async function fetchWeatherDetails(){//this function 
   
try{

    let city="delhi";
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    
    const data= await response.json();
    
    console.log("the weather data is:->", data);
    renderWeatherinfo(data);
    // let newPara=document.createElement("p");
    // newPara.textContent=`${data?.main?.temp.toFixed(2)} *C`
    // document.body.appendChild(newPara);
    
}
catch(err){
    // handle the error here...
}
}

async function getCustomWeatherDetails(){
    try{
        let latitude=.633;
        let longitude=18.333;
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        let data= await result.json();
        console.log(data);

    }
    catch(error){

        console.log("salo iss error ko find kr lo",error);
    }
}


function  getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("not supported by your browser");
    }
}

function showPosition(position){
let lat=position.coords.latitude;
let lon=position.coords.longitude;
console.log(lat);
console.log(lon);

}





