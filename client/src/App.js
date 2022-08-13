import { Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import Landing from './components/Landing/Landing.jsx';
import Form from './components/Form/Form.jsx';
import Nav from './components/Nav/Nav.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path={'/home'} component={Nav} />
      <Route exact path={'/'} component={Landing} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/home/create'} component={Form} />
      <Route path={'/home/recipe/:id'} component={Details} />
    </div>
  );
}

export default App;
