import './App.css';
import Nav from './components/general/Nav';
import LoginPage from './components/authentication/LoginPage';
import SignupPage from './components/authentication/SignupPage';

function App() {
    return (
        <div className='App'>
            <Nav />
            {/* <LoginPage /> */}
            <SignupPage />
        </div>
    );
}

export default App;
