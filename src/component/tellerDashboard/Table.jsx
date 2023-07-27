import React, {useState,useEffect,useContext} from 'react';
import './table.css'
import { UserContext } from "../UserContext";
import axios from 'axios';
function Table(){
    const {reValue,setReValue}=useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const sp =reValue.station;
    console.log(sp);

    const handleCompleteTransaction= (x,y,activ,id) =>{
        const timestamp = Date.parse(y);
        console.log(timestamp);
        const seconds = Math.floor(timestamp / 1000);
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const d1 = Date.parse(date);
        const T_seconds = Math.floor(d1 / 1000);
        console.log(T_seconds);
        console.log(x);

        const T_duration = T_seconds - (x + seconds);
         console.log(activ , reValue.server_id,id,T_duration,date);
         const output_data = {
            detail:activ,
            server_id:reValue.server_id,
            client_national_id:id,
            duration:T_duration,
            // created_date:date
        };
        console.log(output_data);
        axios.post(`${process.env.REACT_APP_BaseUrl}/teller/dismiss/${reValue.station}`, output_data).catch( error =>{
            console.log(error)
        } )
    }

    useEffect(()=>{
        //create an EventSources instance
        const eventSource = new EventSource(`${process.env.REACT_APP_BaseUrl}/teller/queue?teller_position=${sp}`);

        //Handle the message event
        eventSource.onmessage = (event) =>{
            // parse the data as JSON
    
            //console.log(JSON.parse(event.data));
            if(event.data !== ""){
                setMessages( JSON.parse(event.data) );
                console.log(messages)
            }
           
            
            //update the state with the new message
           
        };
      
        //Handle the error event
       eventSource.onerror = (error) =>{
            //close the connection if there is an error
            eventSource.close();
            console.log(error);
        }
        //clean up the connection when the component unmounts
       return () =>{
         eventSource.close();
        };
    }, []);
    
     
    
    return(
<div className="tableP">
    <table>
        <tbody>
       <tr className="tr1">
        <th>Name</th>
        
        <th> Action</th>
        <th> NationalID</th>
        
        <th>Index</th>
        <th>TimeStamp</th>
        <th>Approval</th>
       </tr>
    {
       
        messages.map((c,index)=>(
            <tr key={index}>
            <td>{c.name}</td>
            <td>{c.activity}</td>
            <td>{c.national_id}</td>
            <td>{c.position}</td>
            <td>{c.time_joined.slice(0, 19).replace('T', ' ')}</td>
            <td>
      <button className='S_complete' onClick={()=>{handleCompleteTransaction(c.time_duration,c.time_joined,c.activity,c.national_id)}}> complete</button> <button className='S_cancel'  > Cancel</button>
        </td> 
            </tr>
        ))
    }
       <tr >
       
            
       </tr>
       
        
       </tbody>
    </table>

</div>
    )
}
export default Table;