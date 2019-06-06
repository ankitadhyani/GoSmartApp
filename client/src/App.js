import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import HomePage from './pages/HomePage';
import AllQuestions from './pages/ViewAllQuestions';
import AddUpdateQuestion from './pages/AddUpdateQuestion';
import MyProfilePage from './pages/MyProfilePage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import LogoutPage from './pages/LogoutPage';



function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          {/* Go To Hame Page */}
          <Route exact path="/" component={HomePage} />

          {/* View All Questions */}
          <Route exact path="/questions" component={AllQuestions} />

          {/* Post a question */}
          <Route exact path="/add" component={AddUpdateQuestion} />

          {/* Update a question */}
          <Route exact path="/view-update/:id" component={AddUpdateQuestion} />

          {/* View User Profile */}
          <Route exact path="/my-profile" component={MyProfilePage} />

          {/* View Questions posted by User */}
          <Route exact path="/my-questions" component={MyQuestionsPage} />

          {/* Go To Logout Page */}
          <Route exact path="/logout" component={LogoutPage} />

          
          
          {/* Seting up default/404 route */}
          <Route render={() => <h1>404 Error : Page Not found!</h1>} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
