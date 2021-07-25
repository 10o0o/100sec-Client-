import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:4000');

class App extends React.Component {
  state = {
    output: 0,
    curNum: 0,
  }

  setOutput = (value) => {
    this.setState(() => {
      return {output: value};
    })
  }

  setCurNum = (value) => {
    this.setState(() => {
      return {curNum: value};
    })
  }

  callStart = () =>{
    console.log('startCall');

    socket.on("connect", () => {
      console.log('connected server');
    });

    socket.emit("start", { output: this.state.output, curNum: this.state.curNum }); 
    socket.on("start", req => {
      console.log(req, this.state.output);
      this.setOutput(req.output);
      this.setCurNum(req.curNum);
    });
  }

  callPause = () => {
    socket.emit("pause");
  }

  callCancel = () => {
    socket.emit("cancel");
    socket.on("cancel", req => {
      this.setOutput(req.output);
      this.setCurNum(req.curNum);
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.callStart}>
          start / resume
        </button>
        <button onClick={this.callPause}>
          pause
        </button>
        <button onClick={this.callCancel}>
          cancel
        </button>

        <div>
          합계 : {this.state.output}
        </div>
        <div>
          진행중인 숫자 : {this.state.curNum}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
