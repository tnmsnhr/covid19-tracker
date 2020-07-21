import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../Api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data, country})=>{

    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            setDailyData(await fetchDailyData())
        };

        fetchAPI();
    },[])


    const lineChart = (
        dailyData.length ?
            <Line 
                data={{
                    labels:dailyData.map(({date})=>date),
                    datasets: [{
                        data:dailyData.map(({confirmed})=>confirmed),
                        label:'Infected',
                        borderColor:'#3333ff',
                        fill:true
                    },{
                        data:dailyData.map(({deaths})=>deaths),
                        label:'Deaths',
                        borderColor:'red',
                        backgroundColor:'#e07979',
                        fill:true
                    }]
                }}
            /> : null
    );

    const barChart = (
        data.confirmed? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:['#3333ff','rgb(19, 192, 19)','red'],
                        data:[data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`}
                }} />
        ) : null
    )
    console.log(data);
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
};

export default Chart;