mapboxgl.accessToken = 'pk.eyJ1IjoibmpiZXJuYWwiLCJhIjoiY2wxZHRxNXI3MGFlNjNkcXNkcGo5bmRwaiJ9.IkxJlg4WrWQw73H1WwlV_w';
let map;
const points = [];

/**
 * Create one 'Feature' which is a bus location to be added to the array
 * @param {*} coords are the current coordinates of the bus
 * @returns a feature which should be added to an array of features for GeoJSON
 */
const makeFeature = (coords) => {
    let feature = {
        "type": "Feature",
        "geometry": {
            "type" :"Point",
            "coordinates": coords
        },
        "properties": {
            "name": 'bus'
        }
    }
    return feature;
}

/**
 * Load the map centered on our coordinates
 * Load the bus image. Image is used with permission from vecteezy.com
 */
const createMap = () => {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        //center: [-118.269723, 34.061806], IF WE DO LOS ANGELES
        center: [-71.104081, 42.365554],
        zoom: 14,
    });

    // Load the image of the bus
    // And set up the bus layer
    map.on('load', () => {
        map.loadImage(
        './vector-bus-icon.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('bus_icon', image);

            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point', // reference the data source
                'layout': {
                    'icon-image': 'bus_icon', // reference the image
                    'icon-size': 0.15
                }
            });
        });          
    });    
}

// Get latest bus data
const getBusLocations = async () => {
    const url ='https://api-v3.mbta.com/vehicles';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

/**
 * Draw the buses onto the map. Calls makeFeature() to make each feature.
 * @param {*} data is the JSON array from getBusLocations() API call
 */
const drawBuses = (data) => {
    let index = 0;
    for (bus of data) {
        let lat = bus.attributes.latitude;
        let lon = bus.attributes.longitude;
        let coords = [lon, lat];
        points.push(makeFeature(coords));
        index++;
    }
    let geojson = {
        "type": "FeatureCollection", "features": points
    }

    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });
}

// Starts the program on load
const main = async () => {
    createMap();
    const buses = await getBusLocations();
    drawBuses(buses);
    let p = document.getElementById('latest_data');
    p.innerHTML = `There are currently: <strong>${buses.length}</strong> buses on the road`;
}

main();