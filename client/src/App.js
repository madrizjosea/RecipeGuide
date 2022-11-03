import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Form from './pages/Form/Form.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Error from './components/Error/Error.jsx';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/create" component={Form} />
        <Route exact path="/home/recipe/:id" component={Details} />
        <Route exact path="/error" component={Error} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
