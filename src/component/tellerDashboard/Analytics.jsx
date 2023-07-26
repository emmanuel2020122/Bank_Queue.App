import React,{useState} from 'react';
import Sidebar_a from "./Sidebar_a"
import Navbar_a from "./Navbar_a";
import Section_a from "./Section_a";
import Section2_a from "./Section2_a";
import Section3_a from "./Section3_a";
import Section5_a from './Section5_a';
import Section6_a from './Section6_a';
import './Analytics.css';

//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//import { Doughnut } from 'react-chartjs-2';

 function Analytics(){
   
   
    
    return(
        <>
        <div className="home">
 <Sidebar_a/>
 <div className='homeContainer_a'>
    <Navbar_a/>
    <div className='widgets'>
        <Section_a content="Average waiting time"/>
        <Section2_a/>
        <Section3_a/>
        <Section3_a/>
    </div>
    
    <div className='mains'>
        <Section5_a/>
        <Section6_a/>
    </div>
 </div>
 
 </div>
       
  
        </>
    )
 }
 /* ChartJS.register(ArcElement, Tooltip, Legend);
     const data = {
        labels: ['Teller1', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],                  
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      <Doughnut data={data} style={{}}/>;
      */
export default Analytics;