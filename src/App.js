import Navbar from './components/Navbar/Navbar'
import About from './components/Pages/About';
import Bracket from './components/Pages/Bracket';
import Stat from './components/Pages/Statistics';
import {Route,Routes} from "react-router-dom"
import { ThemeProvider } from './components/ThemeContext';


function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <div>
        <Routes>
          <Route path = "/" element = {<About/>}></Route>
          <Route path = "/bracket" element = {<Bracket/>}></Route>
          <Route path = "/stat" element = {<Stat/>}></Route>
        </Routes>
      </div>
      </ThemeProvider>
  );
}

export default App;
