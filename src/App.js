import './App.css';
import {Card} from "./components/card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="headerText">Ты сегодня покормил кота?</div>
          <div className="mainBlock">
              <Card weightNumber={"0,5"} eat={"с фуа-гра"}/>
              <Card weightNumber={"2"} eat={"с рыбой"}/>
              <Card weightNumber={"5"} eat={"с курой"}/>
          </div>
      </header>
    </div>
  );
}

export default App;
