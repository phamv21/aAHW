
jQuery Tic Tac Toe
Profile
Search
jQuery Tic Tac Toe
⏱ 3 hours

Browser Based Games
In this project we'll build HTML views for our Tic-Tac-Toe and Towers of Hanoi games. We're not going to write any of the core game code, we'll just write view classes that display the game in the browser, and also handle browser user input.

Live Demo

Learning Goals
Be able to set up Webpack
Know how a frontend (this project) and backend (the Node version of this project) relate to and communicate with each other
Know how to use JQuery to manage the DOM
Know how to query the DOM using JQuery
Know how to change the DOM using JQuery
Know how to create event listeners
Be able to use CSS to style a web page
Tic-Tac-Toe
We're looking to build something like this (don't look at the code!).

Structure

Download the skeleton, as well as the Tic Tac Toe Node solution.

The Node solution contains all the game logic of Tic-Tac-Toe, so you can focus on building the UI. You will need to reference the files in the Node solution because you'll be using Board, Game, and MoveError. You shouldn't have to change anything in the Node solution but read and refer to it!

A brief side note: we'll use Node's module.exports and require to separate our game into digestible modules. Since we can't actually use require in the browser, we'll use Webpack to bundle our files. Ensure that you've installed webpack and webpack-cli with npm install -g webpack webpack-cli.

Complete the require statements in src/index.js to require ttt-view and the game as dependencies. When webpack processes index.js (the entry file), it will include all required files within main.js (the output file).

Webpack will output the bundled file as dist/main.js, for which we have included a script tag in index.html.

Open a new terminal tab or window and run webpack --watch --mode=development. The --watch flag directs webpack to re-bundle your app whenever you save a bundled file.

Instructions

We've given you the outline of a View class in src/ttt-view.js. The constructor takes in a Game object and a jQuery object in which to display the grid.

Let's create our View and Game objects in the entry point (src/index.js). Since we have required these classes, we can create a new Game with new Game().

Use jQuery to find the container element in the view that we created in dist/index.html. Make sure you do this inside the $( () => {...}) so that we can be sure that the container element has been loaded.

Write a View.prototype.setupBoard method; it should make a grid to represent the board. Build the grid using an unordered list (<ul>). The cells can be represented inside the grid using <li> elements. By giving the <ul> a display property of flex, giving it a fixed width, and setting flex-wrap: wrap the <li> elements will appear as a 3x3 grid. (You need to do some quick division or tinkering to figure out how wide the <li> elements need to be). Set a border on the cells to make it look like a real grid. Style unclicked cells with a gray background. Change the background to yellow while the user :hovers over an unclicked cell.

Call View's setupBoard method in your constructor and place the new <ul> inside your container $el; check that this is drawing a grid.

Write a View.prototype.bindEvents method. When a user clicks on a cell, call Game.prototype.playMove to register their move. Manipulate the cell <li> to show the current player's mark. Add/remove CSS classes to change the cell background to white and display the 'X's and 'O's in different colors. I did all this in a View.prototype.makeMove method. I also popped an alert if the move was invalid.

Display a congratulatory message when a player wins!

Note: Since the solution classes are written for the node console, the Game class has a Game.prototype.run and a Game.prototype.promptMove method. Ignore these. You're going to call Game.prototype.playMove directly from your View.prototype.makeMove method.

Did you find this lesson helpful?

No

Yes
✔︎ Submit Project
stvp_wacky_jquery.zip
Download Solution
Archive your file into a .zip folder and click Submit Project to upload.

Solutions become available after uploading.