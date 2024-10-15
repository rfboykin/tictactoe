import React from 'react';
import Game from './Game';
import './static/style/main.css';

class App extends React.Component {
  render() {
    return (
      <>
        <div id="article">
          <h1>Tic Tac Toe</h1>
          <Game />
        </div>
      </>
    )
  }
}
export default App