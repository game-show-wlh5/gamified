import React from "react";
import { Switch, Route } from "react-router-dom";
import Hero from "../src/Components/Hero/Hero";
import Register from "../src/Components/Register/Register";
import GameCentral from "./Components/GameCentral/GameCentral/GameCentral";
import JoinGame from "./Components/JoinGame/JoinGame";
import Lobby from "./Components/Lobby/Lobby";
import Game from "./Components/Game/Game";

export default (
  <Switch>
    <Route exact path="/" component={Hero} />
    <Route path="/register" component={Register} />
    <Route path="/gamecentral" component={GameCentral} />
    <Route path="/join" component={JoinGame} />
    <Route path="/game/:id" component={Lobby} />
    <Route path="/game" component={Game} />
  </Switch>
);
