import React,{useState , useContext} from "react";
import {useNavigate} from 'react-router-dom';
import logo1 from "../images/Qlogo.png";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
//import ChatBot from 'react-simple-chatbot';
//import {SiChatbot} from 'react-icons/si'
//import {TbMessageChatbot} from 'react-icons/tb'
import{AiFillCloseCircle} from 'react-icons/ai'
import chatI from '../images/chat.png';
import '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from "@chatscope/chat-ui-kit-react"
import { CgEditContrast } from "react-icons/cg";




function Login(){
    const [formdata,setFormdata]=useState({
        AccountNo:'',
        Password:''

    });
    const API_KEY ='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';
    const {reValue,setReValue} = useContext(UserContext);
    const [showbot,setShowbot]=useState(false);
    const [typing,setTyping]=useState(false)
    
    const [messages,setMessages] = useState([{
        message:"Helloo How can i help You",
        sender: "ChatGPT"
    }])
   const handleBotClick=()=>{
      setShowbot(true);

   }
   const handleSend = async(message) =>{
    const newMessage ={
        message:message,
        sender:"user",
        direction:"outgoing"
    }
    const newMessages = [...messages, newMessage];//all the old messages  plus the new message
    //update our messages state
    setMessages(newMessages);
    //set a typing indicator {Customer is typing }
    setTyping(true);

    // process message to chatGPT (send it over and see the response)
        await processMessageToChatGPT(newMessages);
   }
    async function processMessageToChatGPT(chatMessages){
        // chatMessages{sender:"user" or "ChatGPT",message:"The message content here"}
        //apiMesssages {role:"user" or "assistant", content:"The message content here "}
        let apiMessages  = chatMessages.map((messageObject) => {
            let role ="";
            if(messageObject.sender ===  "ChatGPT"){
                role="assistant"
            }else{
                role="user"
            }
            return{ role: role, content: messageObject.message}
        });
        const systemMessage = {
            role:"system",
            content:"Speak like a access bank Ghana customer enquiry personnel"
        }
      const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages":[
            systemMessage,
            ...apiMessages
        ]
      }
        await fetch("https://api.openai.com/v1/chat/completions",{
            method: "POST",
            headers:{
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) =>{
            return data.json();

        }).then((data) => {
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages(
                [...chatMessages,{
                    message: data.choices[0].message.content,
                    sender: "chatGPT"
                }]
            );
            setTyping(false);
        })
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
  
     
    // Set some properties of the bot
   
    //REACT_APP_   {showbot&&<ChatBot steps={steps}/>  
    //process.env.React_APP in back ticks `${}`
   
    
    return(
        <>
        <div className="main">
        
            <div className="sub-main">
            <div>
            <img src={logo1} alt="Logo" className="" width="fit-content" height="80px" background-color="white"
             style={{ opacity:2.5 }}/>
            <h1 className="LoginText">Login</h1>
            {showbot&& <div  style={window.innerWidth > 1024?{position:"absolute",height:"65vh",width:"40vw"}:{position:"absolute",height:"50%",width:"95%"}}>
            <AiFillCloseCircle className="botClose" value={{color: "white"}} onClick={()=>{setShowbot(false)}}/> 
              <MainContainer> 
                <ChatContainer>
                 <MessageList 
                 typingIndicator={typing ? <TypingIndicator content="Customer is Typing "/> : null }
                 >

                   {messages.map((message, i)=>{
                    return <Message key={i} model={message}/>
                   })}
                 </MessageList>
                 <MessageInput placeholder="Type message here" onSend={handleSend} />
                </ChatContainer>
               

            </MainContainer>
             
            </div> }
           
            
            
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