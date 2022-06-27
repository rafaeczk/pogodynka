import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Card, WeatherIcon, TimeCard } from './components/Card/Card';

import DefaultBg from './images/default_bg.png';
import CloudySkyBg from './images/cloudy_sky_bg.png';
import ClearSkyBg from './images/clear_sky_bg.png';
import ThunderBg from './images/thunder_bg.jpg';
import RainBg from './images/rain_bg.png';
import ForecastCard from './components/ForecastCard/ForecastCard';

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

  console.log(data)

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
          <Card title='Pogoda na dziś' className='CurrentWeather'>
            <div className='today-weather container'>
              <div className="big box flex" style={{gridArea: 'big', aspectRatio: 1}}>
                <WeatherIcon iconName={data?.current.weather[0].icon} />
                {data?.current.weather[0].description}
              </div>
              <div className="long box list" style={{gridArea: 'long'}}>
                {data?.current.rain && <p><i className='bx bx-cloud-rain'></i>Deszcz: {data?.current.rain['1h']} mm</p>}
                {data?.current.snow && <p><i className='bx bx-cloud-snow' ></i>Śnieg: {data?.current.snow['1h']} mm</p>}
                <p><i className='bx bxs-thermometer' ></i>Temperatura: {parseInt(data?.current.temp)} °C</p>
                <p><i className='bx bx-wind' ></i>Wiatr: {parseInt(data?.current.wind_speed)} m/s</p>
                <p><i className='bx bx-tachometer' ></i>Ciśnienie: {parseInt(data?.current.pressure)} hPa</p>
                <p><i className='bx bxs-torch' ></i>Widoczność: {parseInt(data?.current.visibility)/100} km</p>
                <p><i className='bx bxs-cloud' ></i>Zachmurzenie: {parseInt(data?.current.clouds)} %</p>
                <p><i className='bx bxs-leaf' ></i>Wilgotność: {parseInt(data?.current.humidity)} %</p>
              </div>
              <div className="small box date" style={{gridArea: 'small', aspectRatio: 1}}>
                <TimeCard />
              </div>
              <div className="additions" style={{gridArea: 'add', aspectRatio: 1}}>
                {data?.alerts !== null && data?.alerts !== undefined ? (
                  <h4 className='red'><i className='bx bxs-alarm-exclamation'></i> Alerty!</h4>
                ) : (
                  <h4>{'Brak alertów :)'}</h4>
                )}
                {data?.alerts?.map((el, i)=>(
                  <div key={i} title={el.description}>
                    <p>{el.event}</p>
                    <span>
                      od {new Date(el.start*1000).getHours().toString().length===1 ? '0'+new Date(el.start*1000).getHours() : new Date(el.start*1000).getHours()}:{new Date(el.start*1000).getMinutes().toString().length===1 ? '0'+new Date(el.start*1000).getMinutes() : new Date(el.start*1000).getMinutes()}, {new Date(el.start*1000).getDate().toString().length===1 ? '0'+new Date(el.start*1000).getDate() : new Date(el.start*1000).getDate()}.{new Date(el.start*1000).getMonth().toString().length===1 ? '0'+new Date(el.start*1000).getMonth() : new Date(el.start*1000).getMonth()}
                      {' '}do {new Date(el.end*1000).getHours().toString().length===1 ? '0'+new Date(el.end*1000).getHours() : new Date(el.end*1000).getHours()}:{new Date(el.end*1000).getMinutes().toString().length===1 ? '0'+new Date(el.end*1000).getMinutes() : new Date(el.end*1000).getMinutes()}, {new Date(el.end*1000).getDate().toString().length===1 ? '0'+new Date(el.end*1000).getDate() : new Date(el.end*1000).getDate()}.{new Date(el.end*1000).getMonth().toString().length===1 ? '0'+new Date(el.end*1000).getMonth() : new Date(el.end*1000).getMonth()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
            
          <ForecastCard />

        </div>
      </div>
    </AppContext.Provider>
  );
}




export default App;
