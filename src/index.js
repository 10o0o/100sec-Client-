import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    output: 0
  }

  componentDidMount(){
    console.log('didMount');
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() =>{
    console.log('callApi');
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    return (
      <div>
        <button onClick={function() { alert('click'); }}>
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
