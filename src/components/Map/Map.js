import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import './Map.scss'

const API_KEY = process.env.API_KEY;

mapboxgl.accessToken = "pk.eyJ1IjoiY2hyaXMta2F5YWhhcmEiLCJhIjoiY2xnM3RmMXlxMDhrcDNncGN6d2w3NTJxZCJ9.DRlIDYXij4UefcE0BTN1Ng";

// pass preview images, image order,
export default function Map(props) {

    const images = props.images

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(5.9750);
    const [lat, setLat] = useState(51.477928);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            projection: 'mercator',
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 17.5,
        });

        const markers = [];
        // add markers to map
        for (let i = 0; i < images.length; i++) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
                .setLngLat([Number(images[i].image_long), Number(images[i].image_lat)])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<img class="map__marker-image" src=${images[i].image_url}>`))
                .addTo(map.current);
            markers.push([Number(images[i].image_long), Number(images[i].image_lat)]);
        }

        const longValues = [];
        const latValues = [];

        for (let i = 0; i < markers.length; i++) {
            longValues.push(markers[i][0]);
            latValues.push(markers[i][1]);
        }

        const southWest = [Math.min(...longValues), Math.min(...latValues)]
        const northEast = [Math.max(...longValues), Math.max(...latValues)]

        map.current.fitBounds([southWest, northEast], {padding: 100});

        
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" ></div>
        </div>
    );

}