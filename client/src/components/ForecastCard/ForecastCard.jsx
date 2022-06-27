import React from 'react';
import './ForecastCard.css';
import { Card, WeatherIcon } from '../Card/Card';
import { AppContext } from '../../App';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ForecastCard = () => {
    const Ctx = React.useContext(AppContext);
    const [openedChart, setOpenedChard] = React.useState(1);

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

    const getOpenedChartProps = (which)=>{
        switch(which){
            case 1:{// temp
                let arr = Ctx?.data?.daily.slice(0, 5);
                let arr_c = [];
                let arr_c2 = [];
                for (let x = 0; x < arr?.length; x++) {
                    arr_c.push(arr[x].temp)
                }
                for (let x = 0; x < arr_c.length; x++) {
                    let d = new Date(arr[x].dt*1000);
                    arr_c2 = [...arr_c2, `5:00 ${d.getDate()+1} ${monthNumToName(d.getMonth()+1)}`, '14:00', '19:00', '22:00'];
                }

                let arr_c3 = [];
                let arr_c4 = [];
                for (let x = 0; x < arr?.length; x++) {
                    arr_c3.push(arr[x].temp)
                }
                for (let x = 0; x < arr_c3.length; x++) {
                    arr_c4 = [...arr_c4, arr_c3[x].morn, arr_c3[x].day, arr_c3[x].eve, arr_c3[x].night];
                }
                return {
                    labels: arr_c2,
                    data: arr_c4,
                    colors: {
                        bg: 'rgba(255, 153, 0, 0.3)',
                        border: 'rgb(255, 153, 0)'
                    }
                }
            }
            case 2:{// rain
                let arr = Ctx?.data?.daily.slice(0, 5);
                let arr_data = [];
                let arr_lbls = [];
                for (let x = 0; x < arr?.length; x++) {
                    if(arr[x].rain){
                        arr_data.push(arr[x].rain);
                    }else{
                        arr_data.push(0);
                    }
                    let d = new Date(arr[x].dt*1000);
                    arr_lbls = [...arr_lbls, `${d.getDate()+1} ${monthNumToName(d.getMonth()+1)}`];
                }
                return {
                    labels: arr_lbls,
                    data: arr_data,
                    colors: {
                        border: 'rgb(0, 119, 255)',
                        bg: 'rgba(0, 119, 255, 0.3)'
                    }
                };
            }
            case 3:{// wind
                let arr = Ctx?.data?.daily.slice(0, 5);
                let arr_data = [];
                let arr_lbls = [];
                for (let x = 0; x < arr?.length; x++) {
                    if(arr[x].wind_speed){
                        arr_data.push(arr[x].wind_speed);
                    }else{
                        arr_data.push(0);
                    }
                    let d = new Date(arr[x].dt*1000);
                    arr_lbls = [...arr_lbls, `${d.getDate()+1} ${monthNumToName(d.getMonth()+1)}`];
                }
                return {
                    labels: arr_lbls,
                    data: arr_data,
                    colors: {
                        bg: 'rgba(140, 255, 240, 0.3)',
                        border: 'rgb(140, 255, 240)'
                    }
                };
            }
            case 4:{// pressure
                let arr = Ctx?.data?.daily.slice(0, 5);
                let arr_data = [];
                let arr_lbls = [];
                for (let x = 0; x < arr?.length; x++) {
                    if(arr[x].pressure){
                        arr_data.push(arr[x].pressure);
                    }else{
                        arr_data.push(0);
                    }
                    let d = new Date(arr[x].dt*1000);
                    arr_lbls = [...arr_lbls, `${d.getDate()+1} ${monthNumToName(d.getMonth()+1)}`];
                }
                return {
                    labels: arr_lbls,
                    data: arr_data,
                    colors: {
                        bg: 'rgba(255, 0, 128, 0.3)',
                        border: 'rgb(255, 0, 128)'
                    }
                };
            }
            default:{// temp
                let arr = Ctx?.data?.daily.slice(0, 5);
                let arr_c = [];
                let arr_c2 = [];
                for (let x = 0; x < arr?.length; x++) {
                    arr_c.push(arr[x].temp)
                }
                for (let x = 0; x < arr_c.length; x++) {
                    let d = new Date(arr[x].dt*1000);
                    arr_c2 = [...arr_c2, `5:00 ${d.getDate()+1} ${monthNumToName(d.getMonth()+1)}`, '14:00', '19:00', '22:00'];
                }

                let arr_c3 = [];
                let arr_c4 = [];
                for (let x = 0; x < arr?.length; x++) {
                    arr_c3.push(arr[x].temp)
                }
                for (let x = 0; x < arr_c3.length; x++) {
                    arr_c4 = [...arr_c4, arr_c3[x].morn, arr_c3[x].day, arr_c3[x].eve, arr_c3[x].night];
                }
                return {
                    labels: arr_c2,
                    data: arr_c4,
                    colors: {
                        bg: 'rgba(255, 153, 0, 0.3)',
                        border: 'rgb(255, 153, 0)'
                    }
                };
            }
        }
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        scales: {
            yAxes:{
                grid: {
                    drawBorder: true,
                    color: 'rgba(255,255,255,0.1)'
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12
                }
            },
            xAxes: {
                grid: {
                    drawBorder: true,
                    color: 'rgba(255,255,255,0.1)'
                },
                ticks:{
                    color: 'white',
                    fontSize: 12
                }
            }
        }
    }

  return (
    <Card title='Prognoza na 5 dni' className='ForecastCard'>
        <div className='days'>
            {Ctx.data?.daily.slice(0, 5).map((el, i)=>(
                <div key={i}>
                    {i===0 ? (
                        <h4>Jutro, {dayNumToName(new Date(el.dt*1000).getDay()+1)}</h4>
                    ) : (
                        <h4>
                            {(new Date(el.dt*1000).getDate().toString().length===1) ? (
                                '0'+(new Date(el.dt*1000).getDate()+1)
                            ) : (
                                new Date(el.dt*1000).getDate()+1
                            )}{' '}
                            {monthNumToName(new Date(el.dt*1000).getMonth()+1)}{', '}
                            {dayNumToName(new Date(el.dt*1000).getDay()+1)}
                        </h4>
                    )}
                    <WeatherIcon iconName={el.weather[0].icon} />
                    <p>{el.weather[0].description}</p>
                </div>
            ))}
        </div>
        <div className="charts">
            <nav>
                <button onClick={()=>setOpenedChard(1)} className={openedChart===1 ? 'current' : undefined}>Temperatura, °C</button>
                <button onClick={()=>setOpenedChard(2)} className={openedChart===2 ? 'current' : undefined}>Deszcz, mm</button>
                <button onClick={()=>setOpenedChard(3)} className={openedChart===3 ? 'current' : undefined}>Prędkość wiatru, m/s</button>
                <button onClick={()=>setOpenedChard(4)} className={openedChart===4 ? 'current' : undefined}>Ciśnienie, hPa</button>
            </nav>
            <div className='chart' style={{height: 400, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <Line
                    options={chartOptions}
                    data={{
                        labels: getOpenedChartProps(openedChart).labels,
                        datasets: [{
                            data: getOpenedChartProps(openedChart).data,
                            tension: 0.2,
                            fill: true,
                            backgroundColor: getOpenedChartProps(openedChart).colors.bg,
                            borderColor: getOpenedChartProps(openedChart).colors.border
                        }]
                    }}
                />
            </div>
           
        </div>
        
        
    </Card>
  )
}

export default ForecastCard;