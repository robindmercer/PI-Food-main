import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './views/landing/landing'
import Home from './views/home/Home'
import { Nav } from './components/nav/Nav'
import Food from './views/food/Food'
import CreateFood from './views/createFood/CreateFood'
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
            path="/detail/:id"
            render={({ match }) => <Food id={match.params.id}></Food>}
          ></Route>
        </Route>
      </Switch>    
</div>

  );
}

export default App;
