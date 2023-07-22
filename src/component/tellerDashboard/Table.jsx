import React, {useState,useEffect,useContext} from 'react';
import './table.css'
import { UserContext } from "../UserContext";
import axios from 'axios';
function Table(){
    const {reValue,setReValue}=useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const sp =reValue.station;
    console.log(sp);
/*<tr >
        <td>Joseph K. Fosu</td>
        <td>144003938</td>
        <td>Deposit</td>
        <td>GHA-122-2323</td>
        <td>none</td>
        <td>
        <button className='S_complete'> complete</button> <button className='S_cancel' > Cancel</button>
        </td>
       </tr>
       <tr >
        <td >Henry K.</td>
        <td >144003938</td>
        <td>Deposit</td>
        <td>GHA-122-2323</td>
        <td>none</td>
        <td>
        <button className='S_complete'> complete</button> <button className='S_cancel' > Cancel</button> 
        </td>
       </tr>
       <tr >
        <td >Emmauella Sarp</td>
        <td>144003938</td>
        <td>Deposit</td>
        <td>GHA-122-2323</td>
         <td>none</td>
         <td>
         <button className='S_complete'> complete</button> <button className='S_cancel'> Cancel</button>
         </td>
       </tr>*/
    useEffect(()=>{
        //create an EventSources instance
        const eventSource = new EventSource(`${process.env.REACT_APP_BaseUrl}/teller/queue?teller_position=${sp}`);

        //Handle the message event
        eventSource.onmessage = (event) =>{
            // parse the data as JSON
    
            console.log(JSON.parse(event.data));

            //update the state with the new message
            setMessages( JSON.parse(event.data) );
            console.log(messages)
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
        <th>Approval</th>
       </tr>
    {
        messages.map((c,index)=>(
            <tr key={index}>
            <td>{c.name}</td>
            <td>{c.activity}</td>
            <td>{c.national_id}</td>
            <td>{c.position}</td>
            <td>
      <button className='S_complete'> complete</button> <button className='S_cancel' > Cancel</button>
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