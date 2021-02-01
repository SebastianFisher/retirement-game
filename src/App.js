import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/";
import HomeScreen from "./HomeScreen.jsx";
import Game from "./Game.jsx";
import './App.css';
export default function App() {
  return (
    <Router>
      <div className="retirement-game">
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/" >
            <HomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
    // <Survey /> 
  );
}
