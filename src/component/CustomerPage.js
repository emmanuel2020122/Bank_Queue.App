import React,{useState,useContext,useEffect} from 'react';
import logo1 from './tellerDashboard/Timages/Tlogo1.png';
import {CgProfile} from 'react-icons/cg';
import { UserContext } from './UserContext';
import { BsFill1CircleFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




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
const handleCusSubmit =()=>{
    axios.post(`${process.env.REACT_APP_BaseUrl}/user/join`,{
        national_id:F_value,
        activity:dropdownCus,
        })
    .then(res =>{
        Cus_n('/QueuePage');
       // const z = res.data;
        //console.log(z);
        setReValue(res.data);
        console.log(res.data);
        
        
        
    }


    ).catch(err =>{
        console.log(err);
    } )
   

}
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