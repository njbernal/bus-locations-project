mapboxgl.accessToken = 'pk.eyJ1IjoibmpiZXJuYWwiLCJhIjoiY2wxZHRxNXI3MGFlNjNkcXNkcGo5bmRwaiJ9.IkxJlg4WrWQw73H1WwlV_w';
let map;
const points = [];

/**
 * Create one 'Feature' which is a bus location to be added to the array
 * @param {*} coords are the current coordinates of the bus
 * @returns a feature which should be added to an array of features for GeoJSON
 */
const makeFeature = (coords, route) => {
    let feature = {
        "type": "Feature",
        "geometry": {
            "type" :"Point",
            "coordinates": coords
        },
        "properties": {
            "name": 'bus',
            "description": route
        }
    }
    return feature;
}

const addLayer = () => {
    let geojson = {
        "type": "FeatureCollection", "features": points
    }
    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point', // reference the data source
        'layout': {
            'icon-image': 'bus_icon', // reference the image
            'icon-size': 0.15
        }
    });
}

const removeLayer = () => {
    map.removeLayer('points');
    map.removeSource('point');
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

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
            
    map.on('mouseenter', 'points', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
            
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
            
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
            
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
        console.log(coordinates);
    });
            
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // Load the image of the bus
    // And set up the bus layer
    map.on('load', () => {
        map.loadImage(
        './vector-bus-icon.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('bus_icon', image);
            animateBuses();
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
    console.log(data[0]);
    for (bus of data) {
        let lat = bus.attributes.latitude;
        let lon = bus.attributes.longitude;
        let coords = [lon, lat];
        let route = bus.relationships.route.data.id;
        let description = `<h3>Route: ${bus.relationships.route.data.id}</h3>`;
        description += `<ul><li>Occupancy Status: ${bus.attributes.occupancy_status}</li>`;
        description += `<li>Speed: ${bus.attributes.speed}</li></ul>`
        points.push(makeFeature(coords, description));
        index++;
    }
    addLayer();
}

/**
 * Function to animate and update buses every 20 seconds
 */
const animateBuses = async () => {
    const buses = await getBusLocations();
    drawBuses(buses);
    const p = document.getElementById('latest_data');
    const currentDate = new Date();
    const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    p.innerHTML = `CURRENT BUSES ON THE ROAD: ${buses.length}`;

    const updateSpeed = document.getElementById('updateSpeed');
    updateSpeed.innerHTML = `${currentTime}`;

    // setTimeout( () => {
    //     removeLayer();
    //     animateBuses();
    // }, 20000);
}

/**
 * Creates the map.
 * Create map triggers the animateBuses() call on load
 */
const main = async () => {
    console.log("Hello there. Thanks for stopping by. - Nicolas");
    createMap();
}

main();