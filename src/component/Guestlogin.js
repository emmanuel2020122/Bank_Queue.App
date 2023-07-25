import React,{useState,useContext} from "react";
import axios from 'axios';
import logo1 from "./tellerDashboard/Timages/Tlogo1.png";
import {UserContext} from './UserContext';
import chatI from '../images/chat.png';
function Guestlogin(){
  const {reValue,setReValue}= useContext(UserContext);
    const[formdata2,setFormdata2]=useState({
        GuestFirstname:'',
        GuestLastname:'',
        TelephoneNo:'',
        IDcard:''
    });
    const [showbot, setShowbot]= useState(false);
    
    const handleChange1=(e)=>{
        const{name,value}=e.target;
        setFormdata2((prevFormdata2)=>({
            ...prevFormdata2,[name]:value})); }

            const handleBotClick=()=>{
              setShowbot(true);
        
           }

            const handleSubmit1=(e)=>{
                e.preventDefault();
             
                    axios.get(`${process.env.REACT_APP_BaseUrl}/user/guest`,{
  
                    })
                    .then((response)=>{
                      if(response.status ===200){
                        //const L_n =JSON.parse(res.data);
                        const y=response.data;
                        setReValue(y.national_id);
                        console.log(response.data )
                        console.log(reValue);
                      console.log(response.data);}
                    })
                    .catch((error)=>{
                      console.error(error);
                    })
               
            }
    const[dropdown,setDropdown]=useState("Deposit");
    const handleChangeDrop=(event)=>{
        setDropdown(event.target.value);

    }
    const[range,setRange]=useState("range1");
    const handleChangeRange=(event)=>{
        setRange(event.target.value);

    }

    return(
        <>
         <marquee >Transactions from 100,000 ghana cedis and above is considered bulk cash and hence you need to visit the banking Premises to be assigned to bulk cash</marquee>
         <div className="main">
            <div className="sub-main1">
            
            <div>
            <img src={logo1} alt="Logo" width="fit-content" height="80px"/>
            <h1 className="GHead">Welcome Guest</h1>
            <form className="Gform"onSubmit={handleSubmit1}>
                <input type="text" name="GuestFirstname" value={formdata2.GuestFirstname} onChange={handleChange1} className="GuestFname" placeholder="First_Name"/> <br />
                <input type="text" name="GuestLastname" value={formdata2.GuestLastname} onChange={handleChange1} className="GuestLname" placeholder="Last_Name"/><br />

                <input type="tel" name="TelephoneNo" value={formdata2.TelephoneNo} onChange={handleChange1} className="TelephoneNo"placeholder="TelephoneNo"/><br />
                <input type="text" name="IDcard" value={formdata2.IDcard} onChange={handleChange1} className="IDcard"placeholder="ID GHA-XXXXXXX-X"/> <br />
                <b><span className="Stext">Select an Action below:</span></b><br />
                <select value={dropdown} onChange={handleChangeDrop} className="Drop">
                  <option value="Deposit">Deposit</option>
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="ForeignExchange">ForeignExchange</option>
                  <optgroup label="BillPayment">
                  <option value="SchoolFees">School Fees</option>
                  <option value="Utilities">Utilities</option>
                </optgroup>
              </select><br />
   
              
              <div className="btn">
                       <button className="Glbutton"type="submit">Join Queue</button>
                    </div> <img src={chatI} onClick={handleBotClick} alt="ChatBotIcon" className="Chatbot"  /><span color="white" className='botSpan'> Your  assistant here!</span> 

      


            </form>
            </div>
            </div>
          
         </div>
        
        
         </>
        
    )
}
export default Guestlogin