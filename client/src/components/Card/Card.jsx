import React from "react";
import './Card.css';
import { AppContext } from '../../App';

export const Card = (props)=>{
  return (
    <div className={`Card ${props.className}`}>
      <h4 className="title">{props.title}</h4>
      {props.children}
    </div>
  )
}

export const WeatherIcon = ({ iconName })=>{
  if(iconName !== null && iconName !== undefined){
    return (
      <img alt='weather icon' className="WeatherIcon" src={`https://openweathermap.org/img/wn/${iconName}@4x.png`} />
    )
  }
}

export const TimeCard = ()=>{
  const Ctx = React.useContext(AppContext);

  const [time, setTime] = React.useState(0);

  const dayNumToName = (num)=>{
    switch(num){
      case 1: return 'poniedziałek';
      case 2: return 'wtorek';
      case 3: return 'środa';
      case 4: return 'czwartek';
      case 5: return 'piątek';
      case 6: return 'sobota';
      case 7: return 'niedziela';
      default: return 'error';
    }
  }
  const monthNumToName = (num)=>{
    switch(num){
      case 1: return 'styczeń';
      case 2: return 'luty';
      case 3: return 'marzec';
      case 4: return 'kwiecień';
      case 5: return 'maj';
      case 6: return 'czerwiec';
      case 7: return 'lipiec';
      case 8: return 'sierpień';
      case 9: return 'wrzesień';
      case 10: return 'październik';
      case 11: return 'listopad';
      case 12: return 'grudzień';
      default: return 'error';
    }
  }

  setTimeout(()=>{
    const DateUTC = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds());
    let time_calced = new Date(DateUTC.getTime() + Ctx.timeOffset*1000);
    // setTime([time_calced.getHours(), time_calced.getMinutes(), time_calced.getSeconds()]);
    setTime({
      hour: time_calced.getHours().toString().length === 1 ? '0'+time_calced.getHours() : time_calced.getHours(),
      minute: time_calced.getMinutes().toString().length === 1 ? '0'+time_calced.getMinutes() : time_calced.getMinutes(),
      second: time_calced.getSeconds().toString().length === 1 ? '0'+time_calced.getSeconds() : time_calced.getSeconds(),
      year: time_calced.getFullYear(),
      month: time_calced.getMonth() + 1,
      day: (time_calced.getDate().toString().length === 1) ? '0'+time_calced.getDate() : time_calced.getDate(),
      dayNum: time_calced.getDay()
    });
  }, 1000);

  return (
    <div className="TimeCard">
      {(Ctx.timeOffset!==undefined && Ctx.timeOffset!==null) && (
        <>
          <div className="time">
            <p>{time.hour}:{time.minute}:{time.second}</p>
          </div>
          <div className="date">
            <p>{dayNumToName(time.dayNum)}, {time.day}</p>
            <p>{monthNumToName(time.month)}</p>
            <p>{time.year} r.</p>
          </div>
        </>
      )}
    </div>
  )
}
