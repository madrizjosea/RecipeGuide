import { Route } from 'react-router-dom';
import Recipes from './components/recipes/Recipes.jsx';
import Details from './components/details/Details.jsx';
import Landing from './components/landing/Landing.jsx';
import Form from './components/form/Form.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={Landing} />
      <Route exact path={'/recipes'} component={Recipes} />
      <Route exact path={'/create'} component={Form} />
      <Route path={'/recipes/:id'} component={Details} />
    </div>
  );
}

export default App;
