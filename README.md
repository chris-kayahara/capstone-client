
# Photo Mapper

Photo Mapper allows users to compile images while displaying additional information, comments, and GPS locations.

## FRONT END REPOSITORY
This is the front end code

# Links

[Back End Repository](https://github.com/chris-kayahara/capstone-server "BACK END")

# Table of Contents
1. [Getting Started](#start)
2. [Site Map](#map)
3. [Outline](#outline)
4. [Future Improvements](#future)

# Developer Guide
## Getting Started <a name="start"></a>
You will need node installed on your system.
Clone the repo and open it.
Set up your .env using the .env.sample

### On front end run:

`npm install`

`npm start`

### On back end,
Make sure your mysql is setup,
then
run:

`npx knex migrate:latest`

`No need to seed data`

If above doesnt work try:

`node index.js`

## Site Map <a name="map"></a>
  Header --> Home
  Header --> Sign Out

  Home --> User Home Page
  Home --> Sign Up

  Sign UP --> Home
  
  Home --> Upload
  Home --> View Gallery
  Homee --> Delete Gallery

  Upload --> Create Gallery

## Outline <a name="outline"></a>
Photo Mapper provides users an efficient way to compile photos with their embeded GPS data in order to display the gallery with additional usefull context. Users can upload their own images that have GPS data already embeded. With this data, Photo Mapper will plot pins on an interactive map along with the photos below with a place to add captions, and descriptions to each. These 'galleries' can then be saved to the users profile 

## Future Improvements <a name="future"></a>
In the future, I plan to add additional features such as generating a sharable link to share with freinds and family, as well as gathering additional information on each photo, such as date/time the photo was taken for more context. Also I would like to add functionality to add GPS data to images that do not have it already. 
