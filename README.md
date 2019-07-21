# drawbotics-groceries-guillro

Pet project for front-end position at Drawbotics.

The app is composed of items and lists of items, which are stored in a Firebase database. It uses Font Awesome, Google Fonts, Bootstrap, HTML, vanilla CSS and vanilla JS. A basic express server is used to serve the files on port 3000. I tried to use  as less dependancies as possible.

To run the project just type node server in the terminal.

Heroku link: https://groceries-drawbotics-guillro.herokuapp.com/

# Features

A dropdown menu allows to display the different lists. 'All' display all items in every lists.

Lists and items can be added by typing their name in the corresponding input and pressing Enter.

Adding an item to the 'All' list will create a new "Unsorted" list and add the item there, to avoid weird behaviours.

Items can be moved to the "completed" container by left-clicking on them. They can be moved back by left-clicking again.

Right-clicking on an item or on a list (in the list dropdown menu) will delete the list or item.

There is also a user authentication system. When launching the app the user will be asked to enter her/his credentials. The user can also sign up and create a new account. In that case the app will check if a user with the same login already exist in the databse and display an error message if it is the case.

For every input (list, item, login,...) the app will forbid certain characters to avoid nasty injections. The app doesn't accept password shorter than 6 characters and login shorter than 2 characters. Item names should have a length between 2 and 24 characters, and list names should be between 2 and 16 characters.

There are two users in the database right now: "John" (password: abc123) and "Marie" (password: xyz789).

When creating a new user or a new list, the app will create some dummy data which are not displayed. The reason for this is that Firebase does not accept empty collections, there always needs to be some document in the collection, even at the initialization.

# Structure

The app.js is the "main" file and triggers the initial necessary events.

The dataStrings.js regroups the relevant css selectors and the Firebase URL. This one should probably be in an .env file but for convenience I chose to leave it there.

The items.js and lists.js files contains the relevant methods of for the lists and items.

The events.js file contains the different listeners.

The users.js contains the relevant methods regarding users (sign ing, sign up, log out,...).

# Possible improvements

Right now the CSS lacks in modularity. This is something I should have done in the beginning but due to time restrictions I went a bit too fast and didn't think enough of the structure of the CSS code.

Generally speaking the code is not DRY enough and could be improved in that regard.

The multi-user feature is still basic: reloading the page will loading the login page (the app doesn't remember the logged in user). Also since it is a front-end project there is no real security about users' credentials. 

Due to lack of time, the footer is completely useless right now.
