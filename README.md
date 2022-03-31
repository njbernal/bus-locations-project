# Real-time MBTA bus locations

This app gathers the current location for **every** MBTA bus currently on the road, per the MBTA API information, and prints it to the map.
The locations will update every 20 seconds.

## How to run it

You can run it via my own **[portfolio website](http://www.nickbernal.com/apps/buses).**

To run it on your own, please get your own API keys. All you need is an http-server running.

## Future improvements

My original plan was to do this for buses in **Los Angeles**, where I am located. However, there is an application process to get API access that I am waiting on. In the next iteration I will change this app to be L.A. based.

Current road map:

- Add a Los Angeles version, if possible
- Center the map to the user's location if the user is in the location automatically
- Add the bus number overlay over each image in order to better see each route
- Rotate each bus to face direction of travel (possible for MBTA data, as they provide the direction-of-travel information)
- Adding bus click behavior: displaying data for the route clicked.
- Identify which bus stop the user is closest to and inform the user wether the bus already left or not.

# Author

Nicolas Bernal. Contact me **hello@nickbernal.com**
Credit to [vecteezy.com](vecteezy.com) for the use of the bus PNG

# License Information

MIT License
