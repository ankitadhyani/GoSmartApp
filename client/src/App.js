import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Questions from './pages/Questions';
import AddUpdateQuestion from './pages/AddUpdateQuestion';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          {/* <Route exact path="/" component={Questions} /> */}
          <Route exact path="/" component={HomePage} />

          <Route exact path="/add" component={AddUpdateQuestion} />
          <Route exact path="/update/:id" component={AddUpdateQuestion} />
          
          {/* Seting up default/404 route */}
          <Route render={() => <h1>404 Error : Page Not found!</h1>} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
