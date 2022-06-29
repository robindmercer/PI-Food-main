import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTipos,setOffSearch,filterLang } from '../../actions/index'
import axios from 'axios'
import style from './create.module.css'

//  - With Form and Validators
function validateForm(input) {  
  let errors = {}
  errors.ok='OK'
  if (!input.title || input.title === '') {
    errors.title = '14'
    errors.ok='NO'
  } else {
    errors.title = ''
  }
  if (!input.summary) {
    errors.summary = '15'
    errors.ok='NO'
  } else {
    errors.summary = ''
  }
  
  if (!input.healthScore) {
    errors.healthScore = '16'
    errors.ok='NO'
  } else {
    if (input.healthScore > 999) {
      errors.healthScore = '17'
      errors.ok='NO'
    } else {
      errors.healthScore = ''
    }
  }
  if (!input.likes) {
    errors.likes = '18'
    errors.ok='NO'
  } else {
    errors.likes = ''
  }
  if (!input.instructions) {
    errors.instructions = '19'
    errors.ok='NO'
  } else {
    errors.instructions = ''
  }
  return errors
}

// Crea nueva receta
function Create() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [input, setInput] = useState({
    title: '',
    likes: '',
    summary: '',
    healthScore: '',
    instructions: '',
    tipo: [],
  })
  
  const dispatch = useDispatch()
  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)
  // Get Tipos 
  useEffect(() => {
    dispatch(setOffSearch())
    dispatch(getTipos())
    // eslint-disable-next-line
  }, [])
  
  const tipos = useSelector((state) => state.tipo)
  let idiomas = filterLang(idioma, 'CREATE', lang)

  // Handle Inputs
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      }),
    )
  }

  // Handle Focus
  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    })
  }



  // Handle submit
  function handleSubmit(e) {
    e.preventDefault()
    validateForm(input)
    console.log('handleSubmit errors.title: ', errors.title);
    if (!errors.title && !errors.summary && !errors.healthScore && !errors.instructions && !errors.likes && errors.ok === 'OK') {
      axios
        .post('/recipes', input)
        .then((r) => {
          alert('Your Recipe was added to the Database.')
          setInput({
            title: '',
            likes: '',
            summary: '',
            healthScore: '',
            instructions: '',
            tipo: [],
          })
        })
        .catch((res) => {
          console.log('Error', res)
          alert('Could not create Recipe')
        })
    } else {
      alert('Sorry there was a problem no data.')
    }
  }

  // Function to handle repeated selectes
  function handleSelectTipo(e) {
    if (input.tipo.includes(parseInt(e.target.value))) {
      alert('You have already selected this item')
    } else {
      setInput((prev) => ({
        ...prev,
        tipo: [...prev.tipo, parseInt(e.target.value)],
      }))
    }
  }

  //  Delete a selected tipo
  function deleteTipo(_e, t) {
    setInput((prev) => ({
      ...prev,
      tipo: prev.tipo.filter((temp) => temp !== parseInt(t)),
    }))
  }

  //  Get names of tipos
  function getNamesTipo(arr) {
    let names = []
    tipos.forEach((t) => {
      arr.forEach((id) => {
        if (id === parseInt(t.id)) {
          names.push(t.nombre)
        }
      })
    })
    return names
  }
  // renderizo
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.formDetail}>
        <div className={style.inputsContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="title" className={style.secondTitle}>{idiomas[0]}</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={idiomas[9]}
              onChange={handleInput}
              onBlur={onFocus}
              value={input.title}
              className={style.input}
            ></input>
            {errors.title && touched.title && (
              <p className={style.error}>{idiomas[errors.title]}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="summary" className={style.secondTitle}>{idiomas[1]}</label>
            <textarea
              type="text"
              name="summary"
              placeholder={idiomas[10]}
              onChange={handleInput}
              onBlur={onFocus}
              value={input.summary}
              className={style.textareaStyle}
            ></textarea>
            {errors.summary && touched.summary && (
              <p className={style.error}>{idiomas[errors.summary]}</p>
            )}
          </div>
          <div className={style.inputNumberContainer}>
            <div className={style.inputContainer}>
              <label htmlFor="healthScore" className={style.secondTitle}>{idiomas[2]}</label>
              <input
                type="number"
                name="healthScore"
                placeholder={idiomas[2]}
                onChange={handleInput}
                min="1"
                max="10"
                onBlur={onFocus}
                value={input.healthScore}
                className={style.inputNumbers}
              ></input>
              {errors.healthScore && touched.healthScore && (
                <p className={style.error}>{idiomas[errors.healthScore]}</p>
              )}
            </div>

            <div className={style.inputContainer}>
              <label htmlFor="likes" className={style.secondTitle}>{idiomas[3]}</label>
              <input
                type="number"
                name="likes"
                placeholder={idiomas[3]}
                min="0"
                max="999"
                onChange={handleInput}
                onBlur={onFocus}
                value={input.likes}
                className={style.inputNumbers}
              ></input>
              {errors.likes && touched.likes && (
                <p className={style.error}>{idiomas[errors.likes]}</p>
              )}
            </div>
          </div>


          <div className={style.inputContainer}>
            <label htmlFor="instructions" className={style.secondTitle}>{idiomas[4]}</label>
            <textarea
              type="text"
              name="instructions"
              placeholder={idiomas[4]}
              onChange={handleInput}
              onBlur={onFocus}
              value={input.instructions}
              className={style.textareaStyle}
            ></textarea>
            {errors.instructions && touched.instructions && (
              <p className={style.error}>{idiomas[errors.instructions]}</p>
            )}
          </div>
        </div>

        <div  className={style.selectTipo}>
          <div className={style.inputSelContainer}>
            <label htmlFor="tiposSel" className={style.secondTitle}>{idiomas[11]}</label>
            <select
              id="tiposSel"
              name="tiposSel"
              onChange={(e) => handleSelectTipo(e)}
              className={style.select}
              value={input.tipo}>
              <option>{idiomas[13]}</option>
              {tipos.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={style.tempButtons}>
            {input.tipo.map((t) => (
              <div id={t} className={style.tipo}>
                {getNamesTipo([t])}{' '}
                <button
                  type="button"
                  className={style.tempButton}
                  onClick={(e) => deleteTipo(e, t)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={style.containerButtton}>
          <button className={style.button} type="submit" name="grabar">
            {idiomas[12]}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
