import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './componentes/Landing/Landing2'
import Home from './componentes/Home/Home'
import { Nav } from './componentes/Nav/Nav'
import CreateFood from './componentes/CreateFood/CreateFood'
import Detail from './componentes/Detail/Detail'
import './App.css';

function App() {
  const [input, setInput] = useState('')
  return (
    <div className="App">
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/">
          <Nav setInput={setInput} input={input} />
          <Route
            exact
            path="/home"
            render={() => <Home setInput={setInput} input={input} />}
          />
          <Route exact path="/create" component={CreateFood} />
          <Route
            exact
            path="/recipes/detail/:id"
            render={({ match }) => <Detail id={match.params.id}></Detail>}
          ></Route>
        </Route>
      </Switch>    
</div>

  );
}

export default App;
