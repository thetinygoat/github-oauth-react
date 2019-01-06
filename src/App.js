import React, { Component } from "react";
import * as config from "./config";
const uri = `https://github.com/login/oauth/authorize?client_id=${
  config.CLIENT_ID
}&scope=repo&redirect_uri=${config.REDIRECT_URI}`;
class App extends Component {
  componentDidMount() {
    let code;
    if (window.location.href.match(/code=(.*)/)) {
      code = window.location.href.match(/code=(.*)/)[1];
    }

    if (code) {
      fetch(`http://localhost:9999/authenticate/${code}`).then(res => {
        res.json().then(({ token }) => {
          localStorage.setItem("token", token);
        });
      });
    }
  }
  render() {
    return (
      <div className="App">
        <a href={uri}>authorize with github</a>
      </div>
    );
  }
}

export default App;
