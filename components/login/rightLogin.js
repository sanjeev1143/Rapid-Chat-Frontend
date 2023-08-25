import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const MainCont= styled.div`

.border1{
    border:1px solid #8784C3;
}
.border2{
    border:1px solid #504B2E;
}

.select-social{
    margin-top: 16px;
    display: flex;
width: 440px;
height: 72px;
padding: 0px 32px;
align-items: center;
border-radius: 8px;
}
.social-txt{
    color: #FFF;
text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 24px; 
margin-left: 16px;
letter-spacing: 0.5px;
}
.rightlogin{
    margin-top: -20px;
}
`


function RightLogin() {
 const client_id="11153797814-a3ch9s4th56er93p86vmbejpr0bdo9jv.apps.googleusercontent.com"

 const [token,setToken] = useState('')
  const router = useRouter();
const login = useGoogleLogin({
  onSuccess: tokenResponse =>{ 
    setToken(tokenResponse.access_token);
    // window.sessionStorage.setItem("access_token", tokenResponse.accessToken);
    //     window.sessionStorage.setItem("name", tokenResponse.profileObj.name);
    console.log(tokenResponse)
    window.sessionStorage.setItem('access_token',tokenResponse.access_token);
   
  
  },
  onError: ()=>{
    console.log('Login Failed');
  }
});

useEffect(()=>{
  if(window.sessionStorage.getItem('access_token')){
    router.push('/chat')
}
},[token])
const responseFacebook = (response) => {
  console.log(response);
}
  return (
    <MainCont>
    <div className="rightlogin">
    {/* <GoogleLogin
      buttonText='Login'
onSuccess={({provider,data})=>{
  console.log(provider +"="+data);
}}
onFailure={({error})=>{
  console.log(error);
}}
cookiePolicy={'single_host_origin'}
    > </GoogleLogin> */}
      <div className="select-social pointer hover border1" onClick={() => login()} >
        <Image src="/Login/google.svg" height={32} width={32} alt="social login"/><div className="social-txt">Sign in with Google</div>
      </div>
     
      <FacebookLogin
                appId="687069619936595"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                render={renderProps => (<div className="select-social pointer hover border2" onClick={renderProps.onClick}>
                <Image src="/Login/facebook.svg" height={32} width={32} alt="social login"/><div className="social-txt">Sign in with Facebook</div>
              </div>)}
      />
      
      
      <div className="select-social pointer hover border1">
        <Image src="/Login/apple.svg" height={32} width={32} alt="social login"/><div className="social-txt">Sign in with Apple Account</div>
      </div>
  
    </div>
    </MainCont>
  )
}

export default RightLogin
