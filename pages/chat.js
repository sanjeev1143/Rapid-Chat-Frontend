import React, { useEffect, useRef, useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute, host } from '@/utils/APIRoutes';
// import Contact from '@/components/chat/contact';
import Image from 'next/image';
import Welcome from '@/components/chat/welcome';
import dynamic from 'next/dynamic';
// import Chatcontainer from '@/components/chat/chatcontainer';
import {io } from 'socket.io-client';


const Chatcontainer = dynamic(()=>import('@/components/chat/chatcontainer'),{ssr:true})
const Contact = dynamic(()=>import('@/components/chat/contact'),{ssr:false})

const MainCont = styled.div`

position: fixed;
height: 100vh;
width: 100vw;
margin-top: 30px;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;
.chat-page{
  background-color: rgba(0,0,0,0.4);
  display: grid;
  grid-template-columns: 30% 70%;
width: 1400px;
height: 710px;



}
.chat-page::-webkit-scrollbar {
  display: none;
}
.chat-content{

display: flex;
align-items: center;
justify-content: center;

/* background: #0D1117; */
}



`






function Chat() {
    const router = useRouter();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded,setIsLoaded] = useState(false);
    const [count,setCount] = useState(0);
    useEffect(  ()=>{
      async function fetchData() {

        const userData =await localStorage.getItem('chat-app-user');

        if(!userData)
        router.push('/login');
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setIsLoaded(true);
    
      }}
      fetchData();
    },[])

   useEffect(()=>{
      
      const fun = async () => {
        if(currentUser){
          if(  currentUser.isAvatarImageSet){
            const resp = await axios.get(`${allUsersRoute}/${currentUser.id}`);
            setContacts(resp.data);
            setCount(count+1);
           
          }else{
            router.push('/avatar')
          }
        }


      
    }
    fun();
  }, [currentUser]);



 


    useEffect(()=>{
      if(currentUser){
        socket.current = io('http://localhost:8000');
        socket.current.emit("add-user",currentUser.id);
      }
    },[currentUser])

    const handleChatChange = (chat) => {
      setCurrentChat(chat);
    };

  return (
    <MainCont>
    <div className='chat-page'>
      <div className='chat-contacts'>
        <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      </div>
      <div className='chat-content'>
{      

        isLoaded &&  currentChat===undefined ?<Welcome currentUser={currentUser}  />:<Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
}      </div>
    </div>
    </MainCont>
  )
}

export default Chat 
