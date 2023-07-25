import React,{useState,useContext,useEffect} from 'react';
import logo1 from './tellerDashboard/Timages/Tlogo1.png';
import {CgProfile} from 'react-icons/cg';
import { UserContext } from './UserContext';
import { BsFill1CircleFill } from 'react-icons/bs';
//import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

//import { fetchEventSource } from '@microsoft/fetch-event-source';



function CustomerPage(){
/*const [cusData,setCusData]=useState({
 cusId:''
});*/

const {reValue,setReValue} = useContext(UserContext);
const F_value = reValue;


const Cus_n =useNavigate();









const [dropdownCus,setDropdownCus]=useState("Deposit");
const handleChangeDropCus=(event)=>{
 setDropdownCus(event.target.value);
}
 
    
    const  handleCusSubmit = async () =>{
        const eventSource = new EventSource(`${process.env.REACT_APP_BaseUrl}/user/join?national_id=${F_value}&activity=${dropdownCus}`);
  
         
     
    eventSource.onmessage= async (event)=>{
        // parse the data as JSON
            Cus_n('/QueuePage');
            if(event.data === ""){
               
            }else{
                setReValue(JSON.parse(event.data)); 
            }
            
           
        
    }

    eventSource.onerror=async(event)=>{
        console.log(event.data);
        eventSource.close();
    }
    //await new Promise((resolve) => {
      //  eventSource.addEventListener("message", resolve, { once: true });
      //});

  
      



   

}



    /*
    const frn= response.data.pipe();  
    frn.on('data', chunk => {
        setMessages( chunk.toString());
        setReValue(messages);
        Cus_n('/QueuePage')
        console.log(chunk.toString());
      });
      //async()=>{ 
        await axios({method:'get', url:`${process.env.REACT_APP_BaseUrl}/user/join`,
        headers:{
            'Content-Type':'text/event-stream'
        },
        params: {
            national_id:F_value,
        activity:dropdownCus,
        }
        
    })
   */
    
        

   
        
      
      
      //response.addEventListener('message',(event)=>{
        //const data1= JSON.parse(event.data);
        //Cus_n('/QueuePage');
        //setMessages(data1);

     // })
     
   
        //update the state with the new message
      
    
   
       // const z = res.data;
        //console.log(z);
        //setReValue(res.data);
       // console.log(res.data);   
   
   /* const response = await axios.post(`${process.env.REACT_APP_BaseUrl}/user/join`, { 
    responseType: 'stream',
});*/


    /*const eventSource = new EventSource(`${process.env.REACT_APP_BaseUrl}/user/join`);

    eventSource.onmessage = (event) =>{
        // parse the data as JSON
        Cus_n('/QueuePage');
        console.log(JSON.parse(event.data));
  await  axios({method:'post', url:`${process.env.REACT_APP_BaseUrl}/user/join`,data:{
        national_id:F_value,
        activity:dropdownCus,
        },
        responseType:'blob',
        //update the state with the new message
        setMessages( JSON.parse(event.data) );
        setReValue(messages);
        console.log(messages)
        // await fetchEventSource(`${process.env.REACT_APP_BaseUrl}/user/join`, {
        method: 'POST',
    headers: {
        'Content-Type': 'text/event-stream',
    },
    
        onmessage(ev) {
            if (ev.event === "FatalError") {
                throw new FatalError(ev.data);
            }
            console.log(ev.data);
        }
    });
    // await  axios({method:'get', url:`${process.env.REACT_APP_BaseUrl}/user/join`,
        responseType:'stream',
        params: {
            national_id:F_value,
        activity:dropdownCus,
        }
    }).then(event=>{
        setMessages( JSON.parse(event.data));
        setReValue(messages);
        console.log(messages) 
    })
    };*/
useEffect(()=>{
    const data1 = window.localStorage.getItem('users');
   if(data1 !== null) setReValue(JSON.parse(data1))
},[])
useEffect(()=>{
    if(reValue !== ''){
        window.localStorage.setItem('users',JSON.stringify(reValue)); 
    }
         
},[reValue])

/*const handleCusChange =(event)=>{
    const{name,value}=event.target;
    setCusData((prevCusData)=>({
        ...prevCusData,[name]:value
    }))

}*/
return(
    <>
        <div className="CusHeader">
         <img src={logo1} alt="Logo" width="fit-content" height="70px"/> <CgProfile className="profile"/> 
        </div><hr />
        <div className="CusBody">
            <h1><i>Hello! </i></h1>
            <h2 className="H">Select Action:</h2>
            <select value={dropdownCus} onChange={handleChangeDropCus} className="cusDrop">
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="ForeignExchange">ForeignExchange</option>
                <optgroup label="BillPayment">
                <option value="SchoolFees">School Fees</option>
                <option value="Utilities">Utilities</option>
                </optgroup>
              </select> <br />
              <h2>Select amount Range:</h2>
              <select onChange={handleChangeDropCus} className="cusDrop">
                <option value="range1">10-10,000</option>
                <option value="range2">10,000-50,000</option>
                <option value="range3">50,000-99,999</option>
              </select>
              <h2 className="H">National_ID:</h2>
          <input type="text" name="cusId"  className="ID_field" value={F_value} readOnly/> <br />
           <div className="btn">
                       <button className="Cusbutton" onClick={handleCusSubmit} type="submit">Join Queue</button>
                    </div>
           

                    </div>
   
    </>
)
}

export default CustomerPage;