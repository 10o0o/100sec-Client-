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

  callCancel = () => {
    socket.emit("cancel");
    socket.on("cancel", req => {
      this.setOutput(req.output);
      this.setCurNum(req.curNum);
    })
  }

  callStart = () =>{
    console.log('startCall');

    socket.on("connect", () => {
      console.log('connected server');
    });

    socket.emit("start", { output: this.state.output, curNum: this.state.curNum }); 
    socket.on("start", req => {
      this.setOutput(req.output);
      this.setCurNum(req.curNum);

      // 100까지 더하기가 모두 끝나면 실행됩니다.
      if (req.end) {
        alert(`${req.curNum}까지 합은 ${req.output}입니다.`)
        this.callCancel();
      }
    });
  }

  callPause = () => {
    socket.emit("pause");
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
