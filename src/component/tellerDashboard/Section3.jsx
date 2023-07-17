import React,{useContext}from 'react';
import './Section.css';
import {MdTimelapse} from 'react-icons/md';
import {UserContext} from "../UserContext";

import { useEffect } from 'react';



function Section3 (){
  
    const {reValue,setReValue} = useContext(UserContext);
   // const w = reValue.service_time;
   
    const duraTion1=  JSON.parse(reValue.service_time.secs);
 const hours =Math.floor(duraTion1/3600);
 const minutes = Math.floor((duraTion1 % 3600) / 60);
 const seconds =duraTion1 % 60;
    
    return(
 <div className="widget">
     <div className='wleft'> <MdTimelapse className="S1_icon"/> </div>
     <div className='wright'><b>Average Service Time</b> <br /><br /> <p className='S_font'>{hours}hrs:{minutes}min:{seconds}sec</p></div>            
 </div>

    )
}
export default Section3;