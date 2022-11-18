import './App.css';
import Nav from './components/general/Nav';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Home from './components/general/Home';
import NotFound from './components/general/NotFound';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';

function App() {
    const user = useUser();

    return (
        <div className='App'>
            <Nav />
            <Routes>
                {/* home route that redirects to login if user not logged in*/}
                <Route
                    path='/'
                    element={
                        user.accountType ? <Home /> : <Navigate to='/login' />
                    }
                />
                {/* login route that redirects to home if user is already logged in */}
                <Route
                    path='/login'
                    element={
                        user.accountType ? <Navigate to='/' /> : <LoginPage />
                    }
                />
                {/* singup route that redirect to home if user is already logged in */}
                <Route
                    path='/signup'
                    element={
                        user.accountType ? <Navigate to='/' /> : <SignupPage />
                    }
                />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/profile/edit' element={<ProfileEdit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
