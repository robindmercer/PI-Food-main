import React, { useEffect, useState } from 'react'
import { sortFoods, getTipos,filter, filterLang } from '../../actions/index'
import { useSelector, useDispatch } from 'react-redux'
import style from './filtersort.module.css'


function FilterSort() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTipos())
    // eslint-disable-next-line
  }, [])
  
  // Importing Tipos/Foodsb   
  const tipos = useSelector((state) => state.tipo)
  const foods = useSelector((state) => state.allFoods)
  

  let [selectedTemp, setSelectedTemp] = useState('')
  let [tempToFilterBy, setTempToFilterBy] = useState([])
  
  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)

  let idiomas = []
  idiomas = filterLang(idioma, 'FIL', lang)
  
  // Setting Click
  function handleClick() {
    let filtered = []
    foods.forEach((b) => {
      for (var i = 0; i < b.diets.length; i++) {
        var element = b.diets[i];
        if (element === selectedTemp ){
            filtered.push(b) 
        }
      }   
    })
    dispatch(filter(filtered))
  }

  // Resetting filter to empty
  function resetTemps(e) {
    dispatch(filter([]))
  }

  // Setting what to do in case of tipo selection change
  function handleChangeTemp(e) {
    setSelectedTemp(e.target.value)
  }

  // Setting what to do on Submit
  function handleSubmit(e) {
    e.preventDefault()
    setTempToFilterBy([...tempToFilterBy, selectedTemp])
  }

  // Setting what to do if ordering is selected
  function handleOrder(e) {
    dispatch(sortFoods(e.target.value))
  }

  return (
    // Form to select Tipo & Filter
    <div className={style.mainContainer}>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <select
          onChange={handleChangeTemp}
          name="tipos"
          value={selectedTemp}
          className={style.select}
        >
          <option>{idiomas[0]}</option>
          {tipos.map((e) => (
            <option value={e.nombre} key={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <div className={style.btnContainer}>
          <button onClick={() => handleClick()} className={style.button}>
          {idiomas[5]}
          </button>
          <button onClick={resetTemps} className={style.button}>
          {idiomas[6]}
          </button>
        </div>
      </form>

      <form className={style.formContainer}>
        <select onChange={handleOrder} className={style.select}>
          <option value="">{idiomas[1]}</option>
          <option value="AZ">{idiomas[3]}</option>
          <option value="ZA">{idiomas[4]}</option>
        </select>
      </form>
      <form className={style.formContainer}>
        <select onChange={handleOrder} className={style.select}>
          <option value="">{idiomas[2]}</option>
          <option value="AP">{idiomas[3]}</option>
          <option value="DP">{idiomas[4]}</option>
        </select>
      </form>
      <button
        className={style.button}
        onClick={() => (window.location.href = '/home')}>{idiomas[7]}</button>
    </div>
  )
}

export default FilterSort
