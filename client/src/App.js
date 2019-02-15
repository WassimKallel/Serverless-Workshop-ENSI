import React, { Component } from "react";
import logo from "./assets/logo.svg";
import lamdba from "./assets/image.png";
import "./assets/App.css";
import { base_url } from "./config";

import axios from "axios";

class App extends Component {
  state = {
    data: [],
    input: ""
  };

  fetchData = async () => {
    let response;
    response = await axios.get(`${base_url}/retrieve`);
    this.setState({ data: response.data });
  };

  storeData = async data => {
    await axios.post(`${base_url}/store`, { data });
    this.fetchData();
  };

  async componentWillMount() {
    await this.fetchData();
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <div className="images">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={lamdba} className="lamdba-logo" alt="logo" />
          </div>
          <div>
            <input
              name="Data"
              value={this.state.input}
              onChange={async (input) => {
                await this.setState({input : input.target.value});
              }}
              placeholder="data"
            />
            <button onClick={ async () => {
              this.setState({input : ""})
              await this.storeData(this.state.input)
            }
            } > Store Data </button>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Data</th>
              </tr>
              {this.state.data.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>#{i}</td>
                    <td>{v}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
