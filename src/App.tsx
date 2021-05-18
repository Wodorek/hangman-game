import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Game from './features/Game/Game';
import Lobby from './features/Lobby/Lobby';
import UsernameSelect from './features/UsernameSelect/UsernameSelect';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/lobby" component={Lobby} />
          <Route path="/game" component={Game} />
          <Route path="/" component={UsernameSelect} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
