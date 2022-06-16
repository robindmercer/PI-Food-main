import React from 'react'
import style from './searchbar.module.css'
import { useSelector } from 'react-redux'
import { filterLang } from '../../actions'

// SearchBar input and Clear button
function SearchBar({ input, setInput }) {

  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)

  let idiomas = []
  idiomas = filterLang(idioma, 'SRC', lang)


  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={style.formContainer}
      >
        {/* <div className={style.search}>
          <i className="fas fa-paw"></i>
        </div> */}
        <div className={style.searchBarContainer}>
          <input
            type="text"
            value={input}
            placeholder={idiomas[0]}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
          ></input>
          <button
            className={style.button}
            onClick={() => (window.location.href = '/home')}
          >
            {idiomas[1]}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar