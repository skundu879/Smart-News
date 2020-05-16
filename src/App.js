import React from "react";
import Wraper from "./components/MainWraper/Wraper";
import Style from "./App.css";
class App extends React.Component {
  render() {
    return (
      <div className={Style.App}>
        <Wraper />
      </div>
    );
  }
}

export default App;
