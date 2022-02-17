# Assignment 18: Social Media API

## Description
This is a Mongo/Mongoose-based back-end social media API system hosted via GitHub. This heavily modular and flexible application has everything needed to allow users to create accounts (with email validation), post thoughts, and react to each other's content.

[GitHub Repository](https://github.com/the-wake/a18-social-media-api)

## Installation
Once the GitHub repository has been downloaded, open the terminal on the root level and set up NPM by running the following code via Node:

```
npm install
```

This will install all necessary dependencies. Once finished, run Node on server.js to start the server (port 3001 by default).

We a small data set as a seed in utils/seed.js. If you wish to populate the database, run:

```
npm run seed
```

Note that as there is no front-end to this application, it won't run via browser.

![Demonstration screenshot](/assets/Demo-Screenshot.png)

## Tutorial Videos

[Tutorial Video 1](https://user-images.githubusercontent.com/56139228/154387089-8359a8cc-fee3-48a3-8ee5-e0455fa34a81.mp4)

[Tutorial Video 2](https://user-images.githubusercontent.com/56139228/154387107-8d243138-e9e6-4a69-9118-09d9d40cb5ef.mp4)

## Usage
From the terminal, users can run node on server.js to start the local server. From there, queries can be run via Insomnia.

## Functionality
The application uses two primary and one secondary model: Users, Thoughts, and Reactions.

On top of standard values and defaults like Mongoose's _id, we run a Moment helper to format dates, and data validation on user data. This ensures that no two users share the same name, and uses regex to identify and reject email addresses that don't fit standard email format.

### Users
User accounts are identified with Mongoose's _id field and tied to unique email addresses. They can be created, updated, and deleted, and have fields for Thoughts and Friends (other user accounts).

#### User Routes
* **GET /api/users** - Displays all users.
* **POST /api/users** - Create a new user. (Takes a "name" and "email" field.)
* **GET /api/user/:userId** - Display a user by their _id field.
* **POST /api/users/:userId** - Update a user by their _id field.
* **DELETE /api/users/:userId** - Delete a user by their _id field.
* **POST /api/users/:userId/friends/:friendId** - Add a friend to a user by their _id fields (reciprocal).
* **DELETE /api/users/:userId/friends/:friendId** - Remove a friend to a user by their _id fields (reciprocal).

### Thoughts
Thoughts are text strings posted by users and associated with their account. Users can create, update, or delete thoughts. They can also add or delete Reactions, which are text strings tied to specific Thoughts.

#### Thought Routes
* **GET /api/thoughts** - Displays all thoughts.
* **POST /api/thoughts** - Create a new thought. (Takes a "name" and "email" field.)
* **GET /api/thoughts/:userId** - Display a thought by its _id field.
* **POST /api/thoughts/:userId** - Update a thought by its _id field.
* **DELETE /api/thoughts/:userId** - Delete a thought by its _id field.
* **POST /api/thoughts/:thoughtId/reactions** - Add a reaction to a thought.
* **DELETE /api/thoughts/:thoughtId/reactions/reactionId** - Delete a reaction from a thought.

### Associations
We use arrays and the .populate() function to create associations, so that the relevant information is rendered between associated fields.

## Tools Used
* JavaScript
* Express.js
* Node.js
* NPM
* Moment
* nodemon
* MongoDB
* Mongoose
* MongoDB Compass
* Insomnia
* GitHub
* GitBash
* Coded in VS Code

## Future Functionality
* We could add a login functionality to make sure thoughts and users can't be deleted by other users.
* We could do a lot to make the data gathered, and the user inputs functions, more robust.
