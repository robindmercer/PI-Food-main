import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { setLang, getLang, filterLang } from '../../actions'

// Nav Bar & SearchBar 
export function Nav({ setInput, input }) {
  const showShearch = useSelector((state) => state.showShearch)
  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLang())
    // eslint-disable-next-line
  }, [])

  // Setting Click
  function handleClick(lang) {
    dispatch(setLang(lang))
    dispatch(getLang())
  }
  let idiomas = filterLang(idioma, 'NAV', lang)


  return (
    <div className={style.mainContainer}>
      <nav className={style.navContainer}>
        <div className={style.linkContainer}>
          <Link to="/home" className={style.hover}>
            {idiomas[0]}
          </Link>
          <Link to="/create" className={style.hover}>
            {idiomas[1]}
          </Link>
        </div>
        <div className={style.idiomas}>
          <label><b>{idiomas[2]}:</b>&nbsp;</label>
          <div><img height="38px" width="38px" src="https://th.bing.com/th/id/OIP.VtoDEIgDVCgKQmop2jo4JwHaHa?w=188&h=188&c=7&r=0&o=5&pid=1.7" alt="" onClick={() => handleClick('SPA')} /></div>
          <div><img height="38px" width="38px" src="https://th.bing.com/th/id/OIP.pJLCkLXtju6cPYzUgcrjHwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" alt="" onClick={() => handleClick('ENG')} /></div>
        </div>
        {showShearch ? (
          <SearchBar setInput={setInput} input={input} />
        ) : null}
      </nav>
    </div>
  )
}

export default Nav
