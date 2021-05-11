# Pomodoro App
This project is a [pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique "Pomodoro Technique") app derived from the Frontend Mentor challenge. It is constructed in basic HTML/CSS with the jQuery library. 

## UI Features

* Responsive Design for a large range of devices
* Countdown bar for added visual effect
* 3 Customizable timing modes (the core of the pomodoro technique)
* Font and Color Customization
* Ending Jingle

## Code Features

* HTML Canvas is dynamically drawn with Javascript
* jQuery is used to handle the app's global state through various callback functions

## My Notes

One of the more interesting projects I've worked on, as it is not a typical website. The visual design was an interesting challenge as this is my biggest project that works directly with DOM manipulation (and not a framework, like React). I used jQuery to make my coding easier to manage. The code itself runs on a simple bit of state management, which handles things like what styles are displayed and to decrement the current time if the timer is running. This is also my first time using the HTML Canvas, which is how the countdown circle around the timer is drawn. It was an interesting challenge, and it seems like a useful functionality for sites that don't use their own custom animations or implement more advanced graphical libraries. 

In the future I will implement client-side storage to save the user's preferences so if they re-visit the site, they don't have to change it all over again. I would also use SASS instead of vanilla CSS, for a more organized approach to the styling. I would also like to revisit the code itself, and perhaps adhere it to a more strict Model View Controller (MVC) design pattern. 

### Credits
Initial design and images purchased from Frontend Mentor
