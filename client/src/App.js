import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Form from './pages/Form/Form.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Nav from './components/Nav/Nav.jsx';
import About from './pages/About/About.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/create" component={Form} />
        <Route exact path="/home/recipe/:id" component={Details} />
        <Route exact path="/home/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
