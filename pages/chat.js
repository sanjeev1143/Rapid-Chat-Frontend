import React, { useEffect, useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute } from '@/utils/APIRoutes';
import Contact from '@/components/chat/contact';
import Image from 'next/image';
import Welcome from '@/components/chat/welcome';
import Chatcontainer from '@/components/chat/chatcontainer';


const MainCont = styled.div`

width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
.chat-page{
  background-color: rgba(0,0,0,0.4);
  display: grid;
  grid-template-columns: 30% 70%;
width: 90vw;
height: 90vh;

}
.chat-content{

display: flex;
align-items: center;
justify-content: center;

/* background: #0D1117; */
}



`






function Chat() {
    // const [token,setToken] = useState('')
    const router = useRouter();
    // const logout =async ()=>{
    //    const resp = await googleLogout();
    //     console.log(resp);
    //     window.sessionStorage.removeItem('access_token')
        
    //     router.push('/')
    // }
    const [contacts, setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect(  ()=>{
      async function fetchData() {

        const userData =await localStorage.getItem('chat-app-user');

        if(!userData)
        router.push('/login');
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setIsLoaded(true);
      if(currentUser){
        console.log(currentUser);
        if(  currentUser.isAvatarImageSet){
          const resp = await axios.get(`${allUsersRoute}/${currentUser.id}`);
          setContacts(resp.data);
        }else{
          router.push('/avatar')
        }
      }
      }}
      fetchData();
    },[])


    // useEffect(()=>{
    //   const fun = async()=>{
    //     const resp = await axios.get(allUsersRoute);
    //     console.log(resp.data);
    //   }
    //   fun();
    // },[])
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

        isLoaded &&  currentChat===undefined?<Welcome currentUser={currentUser}  />:<Chatcontainer currentUser={currentUser}/>
}      </div>
    </div>
    </MainCont>
  )
}

export default Chat 
