
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";
import Blog from './Components/Blog/Blog';
import LogIn from './Components/LogIn/LogIn';
import Destination from './Components/Destination/Destination';
import News from './Components/News/News';
import NoMatch from './Components/NoMatch/NoMatch';
import { createContext, useState } from 'react';


export const userContext = createContext();
function App() {
  const [loggedIn, setloggedIn] = useState({});

  return (
    <div className="App">
        <userContext.Provider value={[loggedIn,setloggedIn]}>
       <Router>
        <Header></Header>
        <Routes>
        <Route path="/news" element={<News></News>} />
        <Route path="/destination" element={<Destination></Destination>} />
        <Route path="/blog" element={<Blog></Blog>} />
        {/* <Route path="/shipment" element={ <PrivateRoute><Shipment></Shipment></PrivateRoute>} />
        <Route path="/product/:productid" element={<Prodetail></Prodetail>} /> */}
        <Route exact path="/" element={<Home></Home>} />
        <Route path="*" element={<NoMatch></NoMatch>} />
        <Route path="/login" element={<LogIn></LogIn>} />
        <Route path="/home" element={<Home></Home>} />
        
        </Routes>
      </Router>
      </userContext.Provider>
      
    </div>
  );
}

export default App;
