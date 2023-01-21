import styles from './App.module.css'
import Rockets from "./components/Rockets/Rockets";
import Home from "./components/Rockets/Home/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./UI/Header";
import RocketDetails from "./components/Rockets/RocketsDetails/RocketDetails";
function App() {
  return (
    <div  className={styles.wrapper}>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/rocketdetails/:rocketsId" element={<RocketDetails />} />
        </Routes>
      </Header>
    </div>
  );
}

export default App;
