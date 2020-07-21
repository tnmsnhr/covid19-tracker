import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../Api';

const CountryPicker = ({clicked})=>{

    const [fetchedCountries, setFetchedCountries]= useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            setFetchedCountries(await fetchCountries())
        };

        fetchAPI();
    },[setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e)=>clicked(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i)=> <option key={i} value={country.name}>{country.name}</option>)}
            </NativeSelect>
        </FormControl>
    )
};

export default CountryPicker;