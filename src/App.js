import './App.css';
import Nav from './components/general/Nav';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Home from './components/general/Home';

function App() {
    const user = useUser();

    return (
        <div className='App'>
            <Nav />
            <Routes>
                <Route
                    path='/'
                    element={
                        user.accountType ? <Home /> : <Navigate to='/login' />
                    }
                />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Routes>
        </div>
    );
}

export default App;
