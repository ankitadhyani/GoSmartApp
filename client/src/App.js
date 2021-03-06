import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import HomePage from './pages/HomePage';
import ViewAllQuestions from './pages/ViewAllQuestions';
import ViewSearchQuestionResultPage from './pages/ViewSearchQuestionResultPage';
import AddUpdateQuestion from './pages/AddUpdateQuestion';
import MyProfilePage from './pages/MyProfilePage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import TagsPage from './pages/TagsPage';
import ViewTagBasedQuestions from './pages/ViewTagBasedQuestions'
import AllJobsPage from './pages/AllJobsPage';
import MyJobsPage from './pages/MyJobsPage';
import UsersPage from './pages/UsersPage';
import LogoutPage from './pages/LogoutPage';



function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          {/* Go To Hame Page */}
          <Route exact path="/" component={HomePage} />

          {/* View All Questions */}
          <Route exact path="/questions" component={ViewAllQuestions} />

          {/* View Search question page */}
          <Route exact path="/search-question-result" component={ViewSearchQuestionResultPage} />


          {/* Post a question */}
          <Route exact path="/add" component={AddUpdateQuestion} />

          {/* Update a question */}
          <Route exact path="/view-update/:id" component={AddUpdateQuestion} />

          {/* View User Profile */}
          <Route exact path="/my-profile" component={MyProfilePage} />

          {/* View Questions posted by User */}
          <Route exact path="/my-questions" component={MyQuestionsPage} />

          {/* Go To Tags */}
          <Route exact path="/tags" component={TagsPage} />

          {/* Go To View Tag based questions */}
          <Route exact path="/tags/questions" component={ViewTagBasedQuestions} />

          {/* Go To Jobs Page */}
          <Route exact path="/jobs" component={AllJobsPage} />

          {/* View Users saved Jobs */}
          <Route exact path="/my-jobs" component={MyJobsPage} />

          {/* Go To Users Page */}
          <Route exact path="/allusers" component={UsersPage} />

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
