import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';


function Section_a(){
    const[waitingTime,setWaitingTime]=useState("")
    useEffect(()=>{
        try{
            axios.get(`${process.env.REACT_APP_BaseUrl}/analytics`,{
               
            }).then(response =>{
                setWaitingTime(response.data);
              console.log(waitingTime);
                 
           }
           )
           
           
       }catch(err){
           console.log(err);
           alert("Error fetching Query Response");
       }
       
    },[])

    const hours =Math.floor(waitingTime.average_waiting_time/3600);
    const minutes = Math.floor((waitingTime.average_waiting_time % 3600) / 60);
    const seconds = waitingTime.average_waiting_time % 60;
    console.log(waitingTime,hours,minutes,seconds);
   
   
 

    return(

        <>
             <div className="widget">
     <div className='wleft'> </div>
     <div className='wright'><b>Average waiting Time in the System</b> <br /><br /> <p  className='S_font'>{hours}hr {minutes}min {seconds}sec</p> </div>            
 </div>
        </>
    )
}
export default Section_a;