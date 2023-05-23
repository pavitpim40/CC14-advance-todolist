import './App.scss';
import Router from '../routes/Router';
import {useSelector} from 'react-redux';

function App() {

    const user = useSelector(state=> state.auth.user)

    return <Router user={user} />;
}

export default App;
