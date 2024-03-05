import { Route, Routes } from 'react-router-dom';
import Content from './components/Content';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { Paths } from './paths';
import './styles/App.css';

function App() {

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(74deg, rgba(17, 24, 4, 1) 14%, rgba(3, 129, 10, 1) 100%)'
    }}>
      <Routes>
        <Route path={Paths.home} element={ <Layout/> }>
          <Route path={Paths.home} element={ <Content/> }/>
          <Route path={Paths.login} element={ <Login/> }/>
          <Route path={Paths.register} element={ <Register/> }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
