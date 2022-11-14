import './App.css';
import Nav from './components/general/Nav';
import SignupPage from './components/authentication/SignupPage';
import LoginPage from './components/authentication/LoginPage';

function App() {
    return (
        <div className='App'>
            <Nav />
            <LoginPage />
            <SignupPage />
        </div>
    );
}

export default App;
