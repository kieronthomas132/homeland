import Navbar from './components/Navbar/Navbar';
import './index.css'
import Search from './components/Search/Search'
import Header from './components/Header/Header';
import Listings from './components/Listings/Listings';
import { Routes, Route, Navigate } from 'react-router-dom'
import { createContext } from 'react';
import Favorites from './components/Favorites/Favorites';
import { useState } from 'react';


export const PropertiesArray = createContext()

function App() {
  const [properties, setProperties] = useState([])

  return (
    <PropertiesArray.Provider value={[properties, setProperties]} >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/home' element={<Header />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path='/home' element={<Search />} />
          <Route path='/listings/:id' element={<Listings />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </PropertiesArray.Provider>
  );
}

export default App;
