import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
const App = () => {
 

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds,setBounds] = useState({});
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude});
        })
    })

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    },[rating]);
    
    useEffect(() => {
        
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                
                setPlaces(data);
                setFilteredPlaces([])
            })
    }, [type,coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}

                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                      setCoordinates={setCoordinates}
                      setBounds={setBounds}
                      coordinates={coordinates}
                    
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default App;