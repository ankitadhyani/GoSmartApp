import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import HomePage from './pages/HomePage';
import AllQuestions from './pages/ViewAllQuestions';
import AddUpdateQuestion from './pages/AddUpdateQuestion';


function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          {/* <Route exact path="/" component={Questions} /> */}
          <Route exact path="/" component={HomePage} />

          <Route exact path="/questions" component={AllQuestions} />
          <Route exact path="/add" component={AddUpdateQuestion} />
          <Route exact path="/view-update/:id" component={AddUpdateQuestion} />

          
          
          {/* Seting up default/404 route */}
          <Route render={() => <h1>404 Error : Page Not found!</h1>} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
