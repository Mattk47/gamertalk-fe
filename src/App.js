import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Nav from "./components/layout/Nav";
import Home from "./components/review/Home";
import Categories from "./components/review/Categories";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import GameReview from "./components/review/GameReview";
import CreatePost from "./components/review/CreatePost";
import MyReviews from "./components/review/MyReviews";
import { AppContext } from "./lib/contextLib";
import Header from "./components/layout/Header";
import ReviewState from "./context/Review/ReviewState";

function App() {


  const [isAuthenticated, userHasAuthenticated] = useState(true);
  const [user] = useState('grumpy19');


  return (
    <Router>
      <section className='App' >
        <ReviewState>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user }}>
            <Header userHasAuthenticated={userHasAuthenticated} isAuthenticated={isAuthenticated} />
            <Nav />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/reviews/:review_id" element={<GameReview />} />
            </Routes>
          </AppContext.Provider>
        </ReviewState>
      </section>
    </Router>
  )
}

export default App;
