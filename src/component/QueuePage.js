import React,{useState,useContext,useEffect} from "react";
import logo1 from '../images/React Icons_files/logo_2.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserContext } from "./UserContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom';



function QueuePage(){
 const [valueBar,setValueProgress]=useState('4');
 const {reValue,setReValue} = useContext(UserContext);
 const Leave = useNavigate();
 const senBack = reValue;
 

     
 const handleLeaveQueue = () =>{
    axios.post( `${process.env.REACT_APP_BaseUrl}/user/leave`,{
        national_id:reValue.national_id
    }

    ) .then(res =>{
       if(res.data){
           Leave('/');
           
       }
        console.log(res.data);
        console.log(reValue);

        
    }


    ).catch(err =>{
        console.log(err);
    } ) 
    console.log(reValue);
 }



     const duraTion=reValue.startup_timer;
 const hours =Math.floor(duraTion/3600);
 const minutes = Math.floor((duraTion % 3600) / 60);
 const seconds =duraTion % 60;




    return(
        <>
        <div className="QueueHeader">
        <img src={logo1} alt="Logo" width="fit-content" height="80px"/>
        </div><br />
        <div className="QueueBody">
            <h1>Hi {reValue.name}</h1>
            <h4>You have been assigned to Teller: {reValue.service_location}</h4>
            <p>Your current Position in the queue  is:</p>    
        <div style={{ width: 80, height: 80 }}>
     <CircularProgressbar   minValue={0} maxValue={5} value={reValue.position} text={reValue.position}/>
     
        </div>
        <p><b>Estimated waiting Time:</b></p>
        <p>{hours}hr {minutes}min {seconds}sec</p>
        <div className="btn">
                       <button className="Qpbutton" type="submit_Q" onClick={handleLeaveQueue}>Leave queue </button>
        </div>
        </div>
        
        </>

    )
}
export default QueuePage;