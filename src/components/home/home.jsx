import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from '../../api';
import Header from '../Header/Header';
import List from '../List/List';
import Map from '../Map/Map';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
const Home = () => {
 

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
    },[]);

    useEffect(() => {
        if(places.length != 0){
            const filteredPlaces = places.map((place) => place.rating > rating);
            setFilteredPlaces(filteredPlaces);
        }
    },[rating]);
    
    useEffect(() => {
        console.log(bounds);
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);
                setPlaces(data);
                setFilteredPlaces([]);
                console.log(places);
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

export default Home;