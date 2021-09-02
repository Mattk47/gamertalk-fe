import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import Categories from "./components/Categories";
import LogInForm from "./components/LogInForm";
import SignUp from "./components/SignUp";
import GameReview from "./components/GameReview";
import MyReviews from "./components/MyReviews";
import CreatePost from "./components/CreatePost";



function App() {
  const [categoryFilterObj, setCategoryFilterObj] = useState({
    categoryFilter: "",
    description: "",
  });

  const [reviewId, setReviewId] = useState('');


  return (
    <Router>
      <section className="App" >
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home setReviewId={setReviewId} categoryFilterObj={categoryFilterObj} />
          </Route>
          <Route exact path="/categories">
            <Categories setCategoryFilterObj={setCategoryFilterObj} />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/my-reviews">
            <MyReviews />
          </Route>
          <Route exact path="/create-post">
            <CreatePost />
          </Route>
          <Route exact path="/log-in">
            <LogInForm />
          </Route>
          <Route exact path="/reviews/:review_id">
            <GameReview reviewId={reviewId} />
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
