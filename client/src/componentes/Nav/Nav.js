import React from 'react'
import { Link } from 'react-router-dom'
import style from './nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useSelector } from 'react-redux'
// Nav Bar & SearchBar 
export function Nav({ setInput, input }) {
  const showShearch = useSelector((state) => state.showShearch)
  return (
    <div className={style.mainContainer}>
      <nav className={style.navContainer}>
        <div className={style.linkContainer}>
          <Link to="/home" className={style.hover}>
            Home
          </Link>
          <Link to="/create" className={style.hover}>
            Create Recipe
          </Link>
        </div>
        {showShearch ? (
          <SearchBar setInput={setInput} input={input} />
        ) : null}
      </nav>
    </div>
  )
}

export default Nav
