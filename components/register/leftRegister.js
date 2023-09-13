import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from '@/utils/APIRoutes';

const MainCont = styled.div`
.inp{
    margin-top: 16px;
    display: flex;
height: 72px;
padding: 8px 0px 8px 32px;
align-items: center;
flex-shrink: 0;
align-self: stretch;
width: 440px;
color: #898889;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 24px;
letter-spacing: 0.5px;
border-radius: 4px;
border: none;
outline: none;
background: #222222;
}

.btn{
    margin-top: 16px;
    border-radius: 8px;
background: linear-gradient(90deg, #A9A5FD 0%, #EBD75D 100%);
display: flex;
width: 440px;
height: 72px;
padding: 0px 32px;
justify-content: space-between;
align-items: center;
color: #000;
text-align: center;
font-family: Inter;
font-weight: bolder;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.5px;
}

.rightarrow{
    width: 25.135px;
height: 20px; 
    background: url("/Login/rightarrow.svg");
    background-size:25.135px 20px;
}

.regtxt1{
    margin-top: 4px ;
    margin-left: 10px;
    color: #898889;
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 300;
line-height: normal;

}

.boldw{
  cursor: pointer;
    color: #FFF;
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: normal;
}

`


function LeftRegister() {
  const router = useRouter();
  const [inp,setInp] = useState({
      username:"",
      email:"",
      password:"",
      confirmpassword:""
  })
  const toastOptions = {
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
    crossOrigin:"true"
  };
  const change = (e)=>{
    setInp({
        ...inp,[e.target.name]:e.target.value
    })
   
}
const handleValidation=()=>{
  const {password,confirmpassword,username,email} = inp;
  if(password!== confirmpassword){
    toast.error("password and confirm password should be same.",toastOptions);
    return false;
  }
  if(username.length<3){
    toast.error("Username should be greater than 3 characters.",toastOptions);
    return false;
  }
  if(password.length<8){
    toast.error("Password should be equal or greater than 8 characters.")
    return false; 
  }
  return true;
}
const submit = async ()=>{
    
    
    if(handleValidation()){
        
      const {data} =  await axios.post(registerRoute,{
        username:inp.username,
        email:inp.email,
        password:inp.password
      })

      if(data.status == false){
        toast.error(data.msg,toastOptions)
      }
      if(data.status == true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.data));
        router.push('/avatar');
        
      }
    setInp({
      username:"",
      email:"",
      password:"",
      confirmpassword:""
    })
}
}
  return (
    <MainCont>
    <div className=''>
    <input autoComplete="off" role="presentation"  type="text" className="inp" name="username" placeholder="Username"  value={inp.username} onChange={(e)=>change(e)}/>
    <input autoComplete="off" role="presentation"  type="text" className="inp" name="email" placeholder="Email"  value={inp.email} onChange={(e)=>change(e)}/>
      <input autoComplete="off" role="presentation"  type="password" className="inp" name="password"  placeholder="Password"  value={inp.password} onChange={(e)=>change(e)}/>
      <input autoComplete="off" role="presentation"  type="password" className="inp" name="confirmpassword"  placeholder="Confirm Password"  value={inp.confirmpassword} onChange={(e)=>change(e)}/>
      <div className="btn pointer hover" onClick={()=>submit()}>Login to Your Account <div className="rightarrow"></div></div>
      <div className="regtxt1">Already have an account yet? <span className="boldw" onClick={()=>router.push('login')}>Sign In</span></div>

    </div>
    <ToastContainer/>
    </MainCont>
  )
}

export default LeftRegister
