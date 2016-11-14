# Spoon

## Created with 24 hours at MLH Prime

###Inspiration
We came to this hackathon intending to build a Monte-Carlo/CNN hybrid AI, in Java, to play the popular board game Settlers of Catan. We even had plans to incorporate some of the Nest technology into our final product with Wit.ai integration. However, the creative process, along with some critical evaluation of project feasibility, caused the team to create new goals. We decided that a mobile app would be a fun project, and would allow the team to explore new frontiers.

###What it does
Spoon uses GPS and a backend python server with Google Places to generate a list of eateries, with associated data, near the user. This data is then displayed by the react-native front end to provide a pleasing UX, Tinder style. If the user selects a button, or performs a directional swipe, the GUI either displays a new restaurant, or relevant navigational and contact information.

###How we built it
As a security minded team, we wanted to practice keeping API keys protected from potential malicious actors. This required a backend. We chose python for ease of development, incorporated a wrapper for Google Places from GitHub, and deployed using Gunicorn.

On the front end, Facebook's react-native promised speedy development for both Android and iOS, in a web-friendly language. It was also cool. The GUI logic is fairly simple, but significant time was invested in perfecting graphical details.

The application calls the Gunicorn server, which is hosted on Digital Ocean. It uses the Fetch API to GET the server, then compiles the JSON into a dictionary. The dictionary model tells the controller where the view can get all the pictures and necessary details to make the app feel professional.

###Challenges we ran into
One of our teammates left less than halfway through the hacking period. This was a major setback to the team, both emotionally and in terms of productivity. The copy of windows on our borrowed computer ran with constantly maxed-out disk usage, making it almost unusable. Google Places maxed out our API limits twice and we weren't very sure on how to program in swift, javascript, or a python web server. Figuring out how to asynchronously query the server from within the client while preserving data structures took the team several very sleepy hours.

###Accomplishments
The UX on the front end is extremely smooth and professional, at least in our opinion. Creating something polished in such a short timespan is quite a challenge, and we feel that we rose to the task. We managed to code for over 20 hours, beating our previous best of 19. Caffeine is awesome. Michael made a really cool logo with a free stock image and Microsoft word.

###What we learned
Coming into a hackathon with little knowledge of the field you devote the time to can be very rewarding, as can the opposite situation. Michael learned quite a bit about asynchronous calls, while David created a JSON capable server for the first time.

###What's next for Spoon
An Android or Windows Store app would be nice for those of us who aren't enslaved by our Apple overlords (All hail the One True Jobs). React-native would allow us to deploy such an app with minimal effort. On the server side, the amount of queries we are able to send to Google maps service limits the functionality of the application, so extending that capability is an obvious choice for a next step.

###Images

[Screenshot 1](http://imgur.com/fF0BszJ.png)
[Screenshot 2](http://imgur.com/egMNOlT.png)
[Screenshot 3](http://imgur.com/rWfEQOp.png)

###License
Do with it whatever you want, just provide credit to Michael Asper and David Green. 

