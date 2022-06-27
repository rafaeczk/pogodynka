import React from 'react';
import './NavBar.css';
import { AppContext } from '../../App';

const NavBar = () => {
  const Ctx = React.useContext(AppContext);
  const inputRef = React.useRef(null);

  const handleSearchBtnClick = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${Ctx.fetchOptions.key}`)
      .then(res => res.json())
      .then(data => Ctx.setFetchOptions({...Ctx.fetchOptions, latitude: data.coord.lat, longitude: data.coord.lon}))
  }

  return (
    <div className='NavBar'>
      <div className="hello nav-el">
        {Ctx.location[0]?.name ? (
          <><p>Witaj w {Ctx.location[0]?.name}, {Ctx.location[0]?.country}</p>
            <span>{Ctx.fetchOptions.latitude>=0 ? parseInt(Ctx.fetchOptions.latitude)+'°N' : parseInt(-Ctx.fetchOptions.latitude)+'°S'}{', '}
            {Ctx.fetchOptions.longitude>=0 ? parseInt(Ctx.fetchOptions.longitude)+'°E' : parseInt(-Ctx.fetchOptions.longitude)+'°W'}</span>
          </>
        ) : (
          <><p>{'Witaj w mojej pogodynce :)'}</p>
            <span>{Ctx.fetchOptions.latitude>=0 ? parseInt(Ctx.fetchOptions.latitude)+'°N' : parseInt(-Ctx.fetchOptions.latitude)+'°S'}{', '}
            {Ctx.fetchOptions.longitude>=0 ? parseInt(Ctx.fetchOptions.longitude)+'°E' : parseInt(-Ctx.fetchOptions.longitude)+'°W'}</span>
          </>
        )}
        
      </div>
      <div className="input-field nav-el">
        <button onClick={()=>{
          navigator.geolocation.getCurrentPosition(pos=>Ctx.setFetchOptions({...Ctx.fetchOptions, latitude: pos.coords.latitude, longitude: pos.coords.longitude}))
        }} className='find-me'>Znajdź mnie</button>
        <span>lub</span>
        <div style={{position: 'relative'}}>
          <input onKeyUp={(e)=>(e.key==='Enter') && (handleSearchBtnClick())} ref={inputRef} type="text" placeholder='Szukaj swojego MIASTA' />
          <button onClick={handleSearchBtnClick} className='search-btn'><i className='bx bx-search'></i></button>
        </div>
      </div>
    </div>
  )
}

export default NavBar;