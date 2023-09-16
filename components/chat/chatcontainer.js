import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Logout from './logout'
import Chatinput from './chatinput'
import Message from './message'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoutes } from '@/utils/APIRoutes'
import { Socket } from 'socket.io-client'
import {v4 as uuidv4} from 'uuid';



const MainCont = styled.div`
position: relative;
.Chat-container{
  height: 700px;
  width: 100%;
  padding-top: 1rem ;
  display: grid;
  gap:0.1rem;
  overflow:hidden ;
  @media screen  and (min-width: 720px) and (max-width:1020px){
    grid-template-rows: 15% 70% 15%;
  }
}
.user-details{
  padding: 0 2rem;
  display: flex;
  align-items:center;
  gap: 1rem;
  color: white;
  font-size: larger;
  font-family: Space Grotesk;

}
.chat-header{
  width: 100%;
  height: 75px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}
height: 100%;
.chat-message{
  
  height: 440px;
  padding: 1rem 2rem;
 display: flex;
 flex-direction: column;
 gap:1rem;
 overflow: scroll;
 -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

}

.chat-message::-webkit-scrollbar {
  display: none;
}
.message{
  display: flex;
  align-items: center;
}
.content{
  max-width: 40%;
  overflow-wrap: break-word;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 1rem;
  color:#d1d1d1;
}
.sender{
  justify-content: flex-end;
  .content{
    background-color: #4f04ff21;
  }
}
.reciever{
  justify-content: flex-start;
  .content{
    background-color: #9900ff20;
  }
}
width: 100%;
`


function Chatcontainer({currentChat,currentUser,socket}) {
  const  [message,setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef();
    useEffect(()=>{

      const fun = async ()=>{
        if(currentUser && currentChat){
          console.log(currentUser.id);

        const params = {
          from:currentUser.id,
          to:currentChat._id,

        }
        const  response = await axios.post(getAllMessagesRoute,params)
        setMessages(response.data);
}
      }
      fun();
    },[currentChat])
    
    const handleSendMessage = async(msg)=>{
        const data = await axios.post(sendMessageRoutes,{
          from:currentUser.id,
          to:currentChat._id,
          message:msg
        }) 
        socket.current.emit("send-msg",{
          to:currentChat._id,
          from:currentUser.id,
          message:msg,
        })
        const msgs = [...message];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);
    }

    useEffect(()=>{
      if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
          setArrivalMessage({fromSelf:false,message:msg});
        })
      }
    },[])
    useEffect(()=>{
      arrivalMessage && setMessages((prv)=>[...prv,arrivalMessage])
    },[arrivalMessage])

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[message])



  return (
    <MainCont>{currentChat?
      <div className='Chat-container'>
        <div className='chat-header'>
          <div className='user-details'>
            <div className = "user-avatar">
              <Image src={`data:image/svg+xml;base64,${ currentChat?currentChat.avatarImage:""}`} height={60} width={60} alt='profile-pic'/>
            </div>
            <div className = "username">{currentChat.username}</div>
        
          </div>
          <Logout/>
        </div>
        <div className='chat-message'>
          {/* <Message/> */}
          {
          message && message.map((message,index)=>{
            return (
              <div key={uuidv4} ref={scrollRef}>
                <div className={`message ${message.fromSelf?"sender":"reciever"}`}>
                  <div className='content'>
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        <div className='chat-input'>
        <Chatinput handleSendMessage={handleSendMessage}/>
        </div>

      </div>:""}
    </MainCont>
  )
}

export default Chatcontainer
