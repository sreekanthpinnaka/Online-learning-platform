import React from "react";
import "./styles/NotFound.css"

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <a href="http:\\localhost:3000/dashboard">Homepage</a>
        </div>
      </div>
    );
  }
}

export default NotFound;
