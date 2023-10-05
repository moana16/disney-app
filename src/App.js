import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainPage from './pages/Main';
import DetailPage from './pages/Detail';
import SearchPage from './pages/Search';
import LoginPage from './pages/Login';

const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

function App() {
  
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />}/>
          <Route path='main' element={<MainPage />}/>
          <Route path=':movieId' element={<DetailPage />}/>
          <Route path='search' element={<SearchPage />}/>
        </Route>
      </Routes>
    </div>


    
  );
}

export default App;

