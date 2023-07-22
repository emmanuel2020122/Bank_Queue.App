import React,{useState , useContext} from "react";
import {useNavigate} from 'react-router-dom';
import logo1 from "./tellerDashboard/Timages/Tlogo1.png";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import ChatBot from 'react-simple-chatbot';
import {SiChatbot} from 'react-icons/si'
import {TbMessageChatbot} from 'react-icons/tb'
import chatI from '../images/chat.png';
import '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from "@chatscope/chat-ui-kit-react"

const API_KEY ='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';
const steps = [
    {
        id: '0',
        message: 'Hey Geek!',
        end: true
    }
];

function Login(){
    const [formdata,setFormdata]=useState({
        AccountNo:'',
        Password:''

    });
  
    const {reValue,setReValue} = useContext(UserContext);
    const [showbot,setShowbot]=useState(false);
   const handleBotClick=()=>{
      setShowbot(true);

   }
   
    const history = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const validateAccountNumber = () =>{
        const regex1 = /^\d{12}$/ ;
        const regex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if(formdata.AccountNo === "" || formdata.Password === ""){
        alert("AccountNumber and Password field cannot be empty");
        return;
    }
    if(regex1.test(formdata.AccountNo) && regex2.test(formdata.Password)){
        setIsValid(true);
    }else if(!(regex1.test(formdata.AccountNo))){
        alert("Invalid account number format");
        setIsValid(false);
    }else {
        alert("Invalid password format");
    }
    };
    //const [errors,setErrors] = useState({});
    const handleChange = (e) =>{
    const{name,value} = e.target;
    setFormdata((prevFormdata)=>({
        ...prevFormdata,[name]:value}));
       
    };
    
    const handleSubmit= (e) =>{
        e.preventDefault();
        validateAccountNumber();
        if(isValid){
             axios.post(`${process.env.REACT_APP_BaseUrl}/user/login`,{
                  account_number: formdata.AccountNo,
                  password: formdata.Password
                })
                .then(res => {
                    if(res.status ===200){
                        //const L_n =JSON.parse(res.data);
                        const y=res.data;
                        setReValue(y.national_id);
                        console.log(res.data )
                        console.log(reValue);
                        history('/CustomerPage');
                    }

                   

                }).catch(err =>{ 
                    console.log(err);
                    alert('No record Found')});

         
        }
        console.log(formdata);
       
    }
    const theme = {
        background: '#C9FF8F',
        headerBgColor: '#197B22',
        headerFontSize: '20px',
        botBubbleColor: '#0F3789',
        headerFontColor: 'white',
        botFontColor: 'white',
        userBubbleColor: '#FF5733',
        userFontColor: 'white',
    };
     
    // Set some properties of the bot
    const config = {
        botAvatar: "img.png",
        floating: true,
    };
    //REACT_APP_     {showbot&&<ChatBot steps={steps} />}
    //process.env.React_APP in back ticks `${}`
   
    
    return(
        <>
        <div className="main">
        
            <div className="sub-main">
            <div>
            <img src={logo1} alt="Logo" width="fit-content" height="80px" background-color="white"/>
            <h1 className="LoginText">Login</h1>
            
           
            
            
            <form className="Lform" onSubmit={handleSubmit}>
                    <input type="text" name="AccountNo" value={formdata.AccountNo} onChange={handleChange} className="AccountNo" placeholder="Account number" /> <br /><span id="error"> </span>
                    <input type="Password" name="Password" value={formdata.Password} onChange={handleChange} placeholder="password" className="Password"/>

                    <div className="btn">
                       <button className="Lbutton" type="submit">SignIn</button>
                    </div>
                    <p className="L_p">Click below to join queue as guest:</p>
                    <Link to="/Guestlogin"><b className="Gdetailsb"> Guest details</b></Link> 
                    
                    
            </form>
           
            
            <img src={chatI} onClick={handleBotClick} alt="ChatBotIcon" className="Chatbot"  /><span color="white" className='botSpan'> Your  assistant here!</span> 
            </div>
           
            
           
            </div>
            
            
        </div>
       
                    
        </>
    )
}
export default Login