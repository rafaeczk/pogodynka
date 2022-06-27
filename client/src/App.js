import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';


import DefaultBg from './images/default_bg.png';
import CloudySkyBg from './images/cloudy_sky_bg.png';
import ClearSkyBg from './images/clear_sky_bg.png';
import ThunderBg from './images/thunder_bg.jpg';
import RainBg from './images/rain_bg.png';
import ForecastCard from './components/ForecastCard/ForecastCard';
import CurrentWeatherCard from './components/CurrentWeatherCard/CurrentWeatherCard';

export const AppContext = React.createContext(null)


function App() {
  // const [scrollAmount, setScrollAmount] = React.useState(0); // fajne scrollowanie

  const [data, setData] = React.useState(null);
  const [location, setLocation] = React.useState({});
  const [fetchOptions, setFetchOptions] = React.useState({
    key: '36712f98acdfa6b7b328946754328cb7',
    latitude: 0,
    longitude: 0,
    exclude: 'hourly,minutely',
    units: 'metric',
    lang: 'pl'
  });
  // window.addEventListener('scroll', ()=>{  // fajne scrollowanie
  //   var h = document.documentElement, 
  //     b = document.body,
  //     st = 'scrollTop',
  //     sh = 'scrollHeight';
  //   setScrollAmount((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);  
  // })


  React.useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=${fetchOptions.exclude}&lat=${fetchOptions.latitude}&lon=${fetchOptions.longitude}&lang=${fetchOptions.lang}&units=${fetchOptions.units}&appid=${fetchOptions.key}`)
      .then(res => res.json())
      .then(data => setData(data))
    
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${fetchOptions.latitude}&lon=${fetchOptions.longitude}&limit=5&appid=${fetchOptions.key}`)
      .then(res => res.json())
      .then(data => setLocation(data))
  }, [fetchOptions])

  const chooseBackgroundImage = (arg)=>{
    switch(arg){
      case 'Clouds': return CloudySkyBg;
      case 'Clear': return ClearSkyBg;
      case 'Thunderstorm': return ThunderBg;
      case 'Rain': return RainBg;
      default: return DefaultBg;
    }
  }

  return (
    <AppContext.Provider value={{
      data: data,
      fetchOptions: fetchOptions, setFetchOptions: setFetchOptions,
      location: location,
      timeOffset: data?.timezone_offset
    }}>
      <div className="App" style={{backgroundImage: `url(${chooseBackgroundImage(data?.current.weather[0].main)})`,
        // backgroundPositionY: `${scrollAmount}%`,  // fajne scrollowanie
        // backgroundSize: scrollAmount<5 ? `${-scrollAmount+105}%` : `${100}%`  // fajne scrollowanie
      }}>
        <NavBar />
        <div className="site-content">
          <CurrentWeatherCard />
          <ForecastCard />
        </div>
      </div>
    </AppContext.Provider>
  );
}




export default App;
