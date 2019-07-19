# drawbotics-groceries-guillro

Pet project for front-end position at Drawbotics.

The app is composed of items and lists of items, which are stored in a Firebase database. Is uses Font Awesome, Google Fonts, Bootstrap, HTML, vanilla CSS and vanilla JS. A basic express server is used to serve the files on port 3000. I tried to use  as less dependancies as possible.

# Features

A dropdown menu allows to display the different lists. 'All' display all items in every lists.

Lists and items can be added by typing their name in the corresponding input.

Adding an item to the 'All' list will create a new "Misc" list.

Items can be moved to the "completed" container by left-clicking on them. They can be moved back by left-clicking again.

Right-clicking on an item or on a list (in the list dropdown menu) will delete the list or item.

# Structure

The app.js is the main file and fetch the initial data and triggers the events.

The dataStrings.js regroups the relevant css selectors and the Firebase URL. This one should probably be in an .env file but for convenience I chose to leave it there.

The items.js and lists.js files contains the relevant methods of for the lists and items.

The events.js file contains the different listeners.

# Possible improvements

Right now the CSS lacks in modularity. This is something I should have done in the beginning but due to time restrictions I went a bit too fast and didn't think enough of the structure of the CSS code.

Generally speaking the code is not DRY enough and could be improved in that regard.
