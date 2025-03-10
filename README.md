## Weather app
Poject: Build a weather app using an open API. 

## Tech stack
- JavaScript 
- HTML 
- CSS 

## Project

In this project, I wanted to apply what I have learned about APIs and promises. The goal was to create a weather app that would display temperature, sunrise and -set as well as the forecast for the next few days. Although some design inspirations were given, I decided to build on one of them. I designed my own weather-assets (sun, cloud, etc) to use in the weather app. After the inital design, I build the skeleton of the website with HTML. Then I went on to JavaScript. I build two seperate functions to fetch the data using async/await: one for todays weather and the other one for the forcast. I made sure to included a try...catch to be able to handle fetching errors/ typing errors by the user. The data fetched from the weather API was then added to the website. For the main weather, I just updated the inner text of the elements, while for the forecast data, I create the elements from scratch in JavaScript. I then added a search bar on the top and used the user input to update the website for the new city. I then styled the page. I wanted to add a feature that different weathers will lead to different background colors, so I added another function in JavaScript to update the color variables on the different elements according to the different weather states. I lastly adapted the website for different screensizes using CSS grid to ensure that the website will look good on many different devices. 

Overall, I am very happy with how it has turned out. With more time I would have added a geolocation API so that on the first load, the city the use is in immeadiately gets fetched. 



## View it live

Project is deployed here: [Smiley Weather](https://smileyweather.netlify.app)
