import React, {Component} from 'react';
import Chart from './components/Chart/Chart';
import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import {fetchData} from './Api';

class App extends Component{

    state={
        data:{},
        country: ''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData})
    }

    handleCountryChange = async (country)=>{
        this.setState({country:country});
        const fetchedData = await fetchData(country);
        this.setState({data:fetchedData, country: country})
        
    }
    render(){
        const {data, country} = this.state;
        return (
            <div className ={styles.container}> 
                <Cards data={data}/>
                <CountryPicker clicked={this.handleCountryChange}/>
                <br></br>
                <Chart data={data} country={country}/>
            </div>
        )
    }
};

export default App;