import "./App.css";
import { Login } from "./component/login";
import { MapBox } from "./component/map-box";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map/:user" element={<MapBox />} />
      </Routes>
    </div>
  );
}

export default App;
