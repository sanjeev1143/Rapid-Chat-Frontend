import LeftLogin from '@/components/login/leftLogin'
import RightLogin from '@/components/login/rightLogin'
import React from 'react'
import styled from 'styled-components'


const MainCont = styled.div`
display: flex;
align-items: center;
justify-content: center;
    height: 100vh;
    .login-head{
    color: #FFF;
text-align: center;
font-family: Space Grotesk;
font-size: 54px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -4.32px;
}

.mid-line{
    margin-bottom: -5px;
    width: 2px;
height: 230.409px;
background: #FFF;
margin-left: 85.85px;
margin-right: 85.85px;
}
.mid-div{
    display: flex;
    align-items: center;
}
.lhead-txt{
    margin-top: 20px;
    color: #898889;
text-align: center;
font-family: Space Grotesk;
font-size: 17px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -1.76px;
width: 582px;

letter-spacing: 2px;

}

.heading-div{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 70px;
}
.forgot-div{
    margin-top: 61px;
    color: #FFF;
text-align: center;
font-family: Inter;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -1.6px;
text-decoration-line: underline;
}
`



function Login() {
   

  return (
    <MainCont>
    <div className="login-c">
      <div className="heading-div">
      <div className="login-head">Login to Your Account</div>
      <div className="lhead-txt">Welcome back! Please enter your credentials to access your account. We&apos;re excited to have you back and continue your journey with us.</div>
      </div>
      <div className="mid-div">
      <div className=""><LeftLogin/></div>
      <div className="mid-line"></div>
      <div className=""><RightLogin/></div>
      </div>
      <div className="forgot-div pointer hover">Forgot Password?</div>
    </div>
    </MainCont>
  )
}

export default Login
