import React from 'react';
import Navbar_a from "./Navbar_a";
import Section_a from "./Section_a";
import Section2_a from "./Section2_a";
import Section3_a from "./Section3_a";
import Section5_a from './Section5_a';
import Section6_a from './Section6_a';
import './Analytics.css';
import SidebarA from './SidebarA';

//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//import { Doughnut } from 'react-chartjs-2';

 function Analytics(){
   
   
    
    return(
        <>
        <div className="home">
 <SidebarA/>
 <div className='homeContainer_a'>
    <Navbar_a/>
    <div className='widgets'>
        <Section_a content="Average waiting time"/>
        <Section2_a/>
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

export default Analytics;