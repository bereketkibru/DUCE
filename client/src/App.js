import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import "font-awesome/css/font-awesome.min.css";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Dashboard from "./components/dashboard/Dashboard";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/common/PrivateRoute";

import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import Anns from "./components/announcements/Anns";

import Qanda from "./components/qanda/Qanda";
import Qandas from "./components/qandas/Qandas";

import Forums from "./components/forums/Forums";
import Forum from "./components/forum/Forum";

import PostPage from "./components/PostPage/PostPage";
import BlogPage from "./components/BlogPage/BlogPage";
import CreateBlogPage from "./components/BlogPage/Section.js/CreatePage";

import NotFound from "./components/not-found/NotFound";
import AnnForm from "./components/announcements/AnnForm";

import "./App.css";
import "./index.css";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //  Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/blog" component={BlogPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/blog/:id" component={PostPage} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/blog/create"
                  component={CreateBlogPage}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-ann" component={AnnForm} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/forums/:id" component={Forum} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/forums" component={Forums} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/qandas/:id" component={Qanda} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/qandas" component={Qandas} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/announcement" component={Anns} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
