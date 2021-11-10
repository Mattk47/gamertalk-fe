import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import GameReview from "./components/GameReview";
import CreatePost from "./components/CreatePost";
import MyReviews from "./components/MyReviews";
import { AppContext } from "./lib/contextLib";
import Header from "./components/Header";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

function App() {
  const [categoryFilterObj, setCategoryFilterObj] = useState({
    categoryFilter: "",
    description: "",
  });

  const [reviewId, setReviewId] = useState('');
  const [isAuthenticated, userHasAuthenticated] = useState(true);
  const [user, setUser] = useState('grumpy19');

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <Router>
      <section className='App' >
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user }}>
          <Header setUser={setUser} userHasAuthenticated={userHasAuthenticated} isAuthenticated={isAuthenticated} />
          <Nav />
          <Switch>
            <Route exact path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/">
              <Home setReviewId={setReviewId} categoryFilterObj={categoryFilterObj} />
            </Route>
            <Route exact path="/categories">
              <Categories setCategoryFilterObj={setCategoryFilterObj} />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/create-post">
              <CreatePost />
            </Route>
            <Route exact path="/my-reviews">
              <MyReviews />
            </Route>
            <Route exact path="/reviews/:review_id">
              <GameReview reviewId={reviewId} />
            </Route>
          </Switch>
        </AppContext.Provider>
      </section>
    </Router>
  )
}

export default App;
