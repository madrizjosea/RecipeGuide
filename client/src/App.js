import { Route } from 'react-router-dom';
import Recipes from './components/recipes/Recipes.jsx';
import Details from './components/details/Details.jsx';
import Landing from './components/landing/Landing.jsx';
import Form from './components/form/Form.jsx';
import Nav from './components/nav/Nav.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path={'/browse'} component={Nav} />
      <Route exact path={'/'} component={Landing} />
      <Route exact path={'/browse'} component={Recipes} />
      <Route exact path={'/browse/create'} component={Form} />
      <Route path={'/browse/recipe/:id'} component={Details} />
    </div>
  );
}

export default App;
