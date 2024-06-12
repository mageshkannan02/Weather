import { useEffect, useState } from 'react'
import './App.css'

import ClearIcon from  "./assets/clear.png";
import SunnyIcon from  "./assets/sunny.png";
import RainyIcon from  "./assets/rainy.png";
import SnowIcon from  "./assets/snow.png";
import windSpeedIcon from  "./assets/windspeed.png";
import temperatureIcon from  "./assets/snow.png";
import humidityIcon from  "./assets/humidity.png";
import ColdIcon from  "./assets/low.jpg";
import Searchicon from  "./assets/search.png";

const WeatherDetails=({icon,region,city,temperature,ColdTemp,humidity,speed})=>{


 return(
   <>
   <div className="images">
     <img src={icon} alt="Clear"  />
     </div>
     <div className="location">
        
       <h3>{region}</h3>
       <h2>{city}</h2>
     </div>
     <div className="temp">
     <div className="part1">
       <img src={temperatureIcon} alt="hot" className='icons' />
       <h5>{temperature} pascal</h5>
       </div>
       <div className="part1">
       <img src={ColdIcon} alt="cold" className='icons' />
       <h5>{ColdTemp}°C</h5>
       </div>
     </div>
     <div className="calc">
       <div className="part1">
       <img src={windSpeedIcon} alt="windSpeed" className='icons'/>
       <h5>{speed}0 km /h</h5>
       </div>
       <div className="part1">
       <img src={humidityIcon} alt="humidity" className='icons' />
       <h5>{humidity}0 %</h5>
       </div>
        
     </div>
      
   </>
 )

};




function App() {
 const [icon,Seticon]=useState(ClearIcon);
 const [region,Setregion]=useState("");
 const [city,Setcity]=useState("");
 const [temperature,Settemperature]=useState(0);
 const [ColdTemp,SetColdTemp]=useState(0);
 const [humidity,SetHumid]=useState(0);
 const [speed,Setspeed]=useState(0);
 let key="4b0bdf276abcde41d5380a7b08933457&";
 const [text,SetText]=useState("Chennai");
 const [loading,SetLoading]=useState(false);
 const[citynotfound,setCityNotFound]=useState(false);
  
 const [Error,SetError]=useState(null)
 
   const weathericonMap={
    "01d" : ClearIcon,
    "01n" :ClearIcon,
  "09d" :RainyIcon,
  "09n":RainyIcon,
    "13d" :SnowIcon,
    "11d" : RainyIcon,
    "11n" :RainyIcon,
    "13n" :SnowIcon,
 

   };
  
 const Apisearch=async ()=>{
   SetLoading(true);
   
   let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}&units=Metric`;
   try {
     let res= await fetch(apiUrl);
     let data=await res.json();
     if(data.cod==="404"){
       console.error("city not found");
        
       setCityNotFound(true);
       SetLoading(false);
       return;
       
     }
     SetHumid(data.main.humidity);
     Setspeed(data.wind.speed);
     SetColdTemp(Math.floor(data.main.temp));
     Settemperature(Math.floor(data.main.pressure));
     Setcity(data.name);
     Setregion(data.sys.country);
     const IconCode=data.weather[0].icon;
      
       Seticon(IconCode[weathericonMap] || ClearIcon )
       setCityNotFound(false);

   } catch (error) {
     console.error("An error Occurred");
     SetError("AN ERROR OCCURED WHILE FETCHING DATA ");
     
   }finally{
     SetLoading(false);
     
 
   }
 
 }
 const Changecity = (e)=>{
   SetText(e.target.value);
 
 
 }
 const handleenter=(e)=>{
   if(e.key==="Enter"){
     Apisearch();
 
   }
 }
 useEffect(function(){
   Apisearch();
   
 },[])
 

 return (
   <>
    
     
   
   <div className="container">
     <div className="inputContainer">
       <input type="text"  placeholder='Search city' id='search' onChange={Changecity} onKeyDown={handleenter}  value={text}/>
       <img src={Searchicon} alt="Search icon" onClick={()=>Apisearch()} />

     </div>
     { loading &&<div className="load">Loading...</div>}
     {  Error && messegeLoading &&<div className="load">{Error}</div>}
     { citynotfound &&<div className="notfound">City Not Found</div>}
     { !loading && !citynotfound && <WeatherDetails icon={icon} region={region} city={city} temperature={temperature}  ColdTemp={ColdTemp}  humidity={humidity} speed={speed}/>}
      
      
    </div>
    
    </>
       )
}

 export default App
