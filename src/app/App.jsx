import './App.scss';
import Router from '../routes/Router';
import { useAuth } from '../hooks/useAuth';

function App() {
    // let isLogin  = true;
    const { user, isAuth } = useAuth();

    return <Router isAuthenticate={true} />;
}

export default App;
