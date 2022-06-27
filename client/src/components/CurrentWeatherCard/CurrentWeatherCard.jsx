import React from 'react';
import { Card } from '../Card/Card';
import { AppContext } from '../../App';
import { TimeCard, WeatherIcon } from '../Card/Card';
import './CurrentWeatherCard.css';


const CurrentWeatherCard = () => {
    const Ctx = React.useContext(AppContext);

    console.log(Ctx.data);

  return (
    <Card title='Pogoda na dziś' className='CurrentWeatherCard'>
        <div className='today-weather container'>
              <div className="big box flex" style={{gridArea: 'big'}}>
                <WeatherIcon iconName={Ctx?.data?.current.weather[0].icon} />
                <p>{Ctx?.data?.current.weather[0].description}</p>
              </div>
              <div className="long box list" style={{gridArea: 'long'}}>
                {Ctx?.data?.current.rain && <p><i className='bx bx-cloud-rain'></i>Deszcz: {Ctx?.data?.current.rain['1h']} mm</p>}
                {Ctx?.data?.current.snow && <p><i className='bx bx-cloud-snow' ></i>Śnieg: {Ctx?.data?.current.snow['1h']} mm</p>}
                <p><i className='bx bxs-thermometer' ></i>Temperatura: {parseInt(Ctx?.data?.current.temp)} °C</p>
                <p><i className='bx bx-wind' ></i>Wiatr: {parseInt(Ctx?.data?.current.wind_speed)} m/s</p>
                <p><i className='bx bxs-tachometer' ></i>Ciśnienie: {parseInt(Ctx?.data?.current.pressure)} hPa</p>
                <p><i className='bx bxs-torch' ></i>Widoczność: {parseInt(Ctx?.data?.current.visibility)/100} km</p>
                <p><i className='bx bxs-cloud' ></i>Zachmurzenie: {parseInt(Ctx?.data?.current.clouds)} %</p>
                <p><i className='bx bxs-leaf' ></i>Wilgotność: {parseInt(Ctx?.data?.current.humidity)} %</p>
              </div>
              <div className="small box date" style={{gridArea: 'small'}}>
                <TimeCard />
              </div>
              <div className="additions" style={{gridArea: 'add'}}>
                {Ctx?.data?.alerts !== null && Ctx?.data?.alerts !== undefined ? (
                  <h4 className='red'><i className='bx bxs-alarm-exclamation'></i> Alerty!</h4>
                ) : (
                  <h4>{'Brak alertów :)'}</h4>
                )}
                {Ctx?.data?.alerts?.map((el, i)=>(
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
  )
}

export default CurrentWeatherCard;