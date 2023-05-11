import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import NavHeader from './components/NavHeader';
import NavSidebar from './components/NavSidebar';
import Home from './Home';
import Tasklist from './components/Tasklist';
import OneTask from './components/OneTask';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="app row">
            <NavHeader />
            
            <div className="col-2 navsidebar d-none d-sm-none d-md-none d-lg-block">
                <NavSidebar />
            </div>
            <div className="col-12 col-lg-10">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/tasklist" element={ <Tasklist /> } />
                    <Route path="/tasklist/:id" element={ <OneTask /> } />
                    <Route path="/login" element={ <LogIn /> } />
                    <Route path="/signup" element = { <SignUp /> } />
                    <Route path="/profile" element={ <Profile /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Routes>
            </div>
        </div>
    );
}

export default App;