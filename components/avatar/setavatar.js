import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Buffer } from 'buffer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoutes } from '@/utils/APIRoutes'

const MainCont = styled.div`

.loading-class{
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  justify-content: center;
}


.Setavatar{
  display: flex;
flex-direction: column;
align-items: center;
}

.avatars{
  margin-top: 50px;
  display: flex;
  gap: 80px;
}

.heading-avatar{
  margin-top: 60px;
  color: #FFF;
text-align: center;
font-family: Space Grotesk;
font-size: 54px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -4.32px;
}



.selected{
  cursor: pointer;
  border-radius: 50%;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
    transition: 0.6s;
  background-color: white;
  
  
}
.submit-btn{
  margin-top: 40px;
  position: relative;
  width: 350px;
  height: 65px;
  display: inline;
  border-radius: 5px;

}

.submit-btn i{
  position: absolute;
  inset: -2px;
  display: block;
  border-radius: 5px;
}
.submit-btn i,
a i:nth-child(2){
  background: linear-gradient(45deg,#00ccff,#0e1538,#0e1538,#d400d4);
}
a i:nth-child(2){
  filter: blur(10px);
}
.submit-btn span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 1px solid #040a29;
  font-family: Space Grotesk;

  color: #fff;
  text-align: center;
  border-radius: 3px;
  background: rgba(14,21,56,0.65) ;
  overflow: hidden;

}

.submit-btn span::before{
content: '';
position: absolute;
top:0;
left:-50%;
width: 100%;
height: 100%;
background: rgba(255,255,255,0.075);
transform: skew(25deg);


}

`


function Setavatar() {
  const api ="https://api.multiavatar.com/1234567"
  const router = useRouter();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
    crossOrigin:"true"
  };

  const setProfilePicture = async()=>{
    if(selectedAvatar === undefined){
      toast.error("Please select an avatar",toastOptions)
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoutes}/${user.id}`,{
        image: avatars[selectedAvatar],
      });

      if(data.isSet){
        user.isAvatarImageSet =true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        router.push('/chat');
      }else{
        toast.error("Error setting avatar. Please try again",toastOptions);
      }
    }
   
  }


  useEffect(()=>{
    if (!localStorage.getItem('chat-app-user')) {
        router.push('/login')
    }
  },[])
  useEffect(()=>{
    try {
      
    
      const fun= async ()=>{ 
        const data = [];
        for(let i=0;i<4;i++){
        const params = Math.round(Math.random()*1000);
        for (var j = 0; j< 10000; j++){
          for (var k = 0; k< 10000; k++){}
        }

        const image = await axios.get(`${api}/${params}`)
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64")); 
        }
        setAvatars(data);
        setIsLoading(false);
      }
    fun();
  } catch (error) {
      console.log(error);
  }
  },[])
 
  return (
    <MainCont>

      
      {
        isLoading?<div className='loading-class'>
          <Image alt='Loading...' src={"/loading/loader.gif"} className='loader' height={450} width={600} />
        </div>:(
      <div className='Setavatar'>
      <ToastContainer/>

    <div className='title-container'>
        <div className='heading-avatar'>Pick an avatar as your profile picture</div>
        
    </div>
    <div className='avatars'>
      {avatars.map((avatar,index)=>{
        return(
          <div key={index} className={`avatar ${selectedAvatar === index ?"selected":""}`}>
            <Image height={240} width={240} src={`data:image/svg+xml;base64,${avatar}`}
              alt='avatar' onClick={()=>setSelectedAvatar(index)}
            />
          </div>
        )
      })}
    </div>
    <div className='submit-btn pointer hover'  onClick={()=>setProfilePicture()}>
      <i ></i>
      <i ></i>
      <span>Set as Profile Picture</span></div>
      </div>
)
}
    </MainCont>
  )
} 

export default Setavatar
