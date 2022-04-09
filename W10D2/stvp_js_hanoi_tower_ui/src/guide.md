
jQuery Towers of Hanoi
Profile
Search
jQuery Towers of Hanoi
⏱ 3 hours

Towers of Hanoi
Live Demo

Learning Goals
Be able to set up Webpack
Know how a frontend (this project) and backend (the Node version of this project) relate to and communicate with each other
Know how to send and receive messages between the frontend and backend
Know how to use JQuery to toggle classes on HTML elements
Be able to use CSS to style a web page
Be familiar with styling classes versus styling tags
Download the skeleton. Make css and src directories. Move the provided 'index.js' file in your 'src' directory so that webpack can find it. Remember to load all the relevant CSS and JQuery in your index.html. Download the hanoi_node solution and put the 'game.js' file from that project into your 'src' folder as well. Then require 'game.js' as HanoiGame in 'index.js'.

Run webpack --watch --mode=development. Include the resulting bundled file as a <script> in index.html. To ensure that all's well, add a console.log() to the index.js file and check that it prints in our browser's terminal.

Write a hanoi-view.js file, and a View class. Pass in a HanoiGame and a DOM element. Require it in the index.js file.

Write a View.prototype.setupTowers method to fill the main DOM element with a "naive" representation of the game (i.e., not reflecting the current game state). Use <ul> elements to store three piles. Inside, use <li>s to store the discs. Call this in your constructor.

Write a View.prototype.render to alter the DOM elements to reflect the current game state. You should call this in your constructor, too.

In the constructor, install a click handler on each pile. I wrote a clickTower method. On the first click to a pile, get the pile number and store this in an instance variable. On the second click (which you can identify because the ivar has been set), perform the move. Reset the ivar after. Alert the user if this was an invalid move.

After each move, call the render method to redraw the board. Once the player wins, tell the player how awesome they are.

To improve UX, use CSS to highlight a pile so that it is clear which pile has been clicked first. You should do this by toggling a class, not by setting the style attribute. Setting the style attribute is bad for a number of reasons. First of all, it has super high specificity, so it can only be overridden with !important css rules. It is also really hard to read because it sprinkles presentation logic in with JS code. Toggling classes is the clean, best-practice way to do this.

Did you find this lesson helpful?

No

Yes
✔︎ Submit Project
No file chosen
Download Solution
Archive your file into a .zip folder and click Submit Project to upload.

Solutions become available after uploading.