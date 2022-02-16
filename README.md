# Getting Started with GamerTalk

GamerTalk is a social games content rating, and discussion website.

## Front-end app

- Published app [_here_](https://gamer-talk.netlify.app/).
- Front-end repo [_here_](https://github.com/Mattk47/gamertalk-fe).

## Back-end API

- Hosted API [_here_](https://nc-games-project.herokuapp.com/).
- Back-end repo [_here_](https://github.com/Mattk47/gamertalk-be).

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Local Installation](#local-installation)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)

## Requirements

- Node v16.0.0

## Features

- Reviews can filtered by category and sorted by new, hot (most commented), and best (most upvoted).
User can:
-  View a list of user reviews, most recent first by default.
-  Post new reviews
-  Upvote a review and post a new comment.
-  View a list of their recent posts.
-  Delete any of their reviews.

## Local Installation

To run this project, install it locally using npm:

```
$ git clone https://github.com/cjpearson85/fe-nc-games.git
$ cd gamertalk-fe
$ npm install
$ npm start
```

## Usage

Once the dependencies are installed, you can run 'npm start' to start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Room for Improvement

Room for improvement:

- Authentication - users should be able to create an account an login. A user is currently just hardcoded. I plan to implement this using JWT on the backend.
- User should be able to edit their existing reviews - backend already allows this.
- User should be able to edit their existing comments - backend already allows this.
- User should be able to upvote comments -backend already allows this.
- Likes should be tied to users in the db, so they can't vote more than once across sessions.
- Flesh out the user profiles - eg. bio, favourite game, etc.
- Dark mode
