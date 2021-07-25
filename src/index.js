import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:4000');

class App extends React.Component {
  state = {
    output: 0
  }

  callApi = () =>{
    console.log('iocall');

    socket.on("connect", () => {
      console.log('wow');
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.callApi}>
          start
        </button>
        <button onClick={function() { alert('click'); }}>
          pause
        </button>
        <button onClick={function() { alert('click'); }}>
          cancel
        </button>

        <div>
          {this.state.output}
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
