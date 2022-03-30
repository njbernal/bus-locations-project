# Real-time MBTA bus locations

This app gathers the current location for **every** MBTA bus currently on the road, per the MBTA API information, and prints it to the map.
The locations will update every 20 seconds.
This app is actually useful to anyone waiting for a bus in the MBTA coverage area!

## How to run it

You can run it via my own **portfolio** website <a href="http://nickbernal.com/apps/buses" target="_blank" rel="nofollow">**www.nickbernal.com/apps/buses**</a>
To run it on your own, please get your own API keys. All you need is an http-server running.

## Future improvements

My original plan was to do this for buses in **Los Angeles**, where I am located. However there is a waiting period to get
their API key. In the next iteration I will change this app to be L.A. based.

Current road map:

- Add a Los Angeles version
- Center the map to the user's location if the user is in the location
- Add the bus number overlay over each image in order to better see each route
- Rotate each bus to face direction of travel (possible for MBTA data, as they provide the direction-of-travel information)

# Author

Nicolas Bernal. Contact me **hello@nickbernal.com**

# License Information

MIT License
