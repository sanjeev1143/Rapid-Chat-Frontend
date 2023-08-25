import RightLogin from '@/components/login/rightLogin'
import LeftRegister from '@/components/register/leftRegister'
import React from 'react'
import styled from 'styled-components'


const MainCont = styled.div`

.mid-line{
    margin-bottom: -5px;
    width: 2px;
height: 350.409px;
background: #FFF;
margin-left: 85.85px;
margin-right: 85.85px;
}

.mid-div{
    display: flex;
    align-items: center;
}
display: flex;
align-items: center;
justify-content: center;
.heading-div{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 70px;
    margin-top: 50px;
}
.Register-head{
    color: #FFF;
text-align: center;
font-family: Space Grotesk;
font-size: 54px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -4.32px;
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
`



function Register() {
   

  return (
    <MainCont>
    <div className="Register-c">
      <div className="heading-div">
      <div className="Register-head">Register to Your Account</div>
      <div className="lhead-txt">Join our community today! Create your account to embark on a journey of discovery and connection.</div>
      </div>
      <div className="mid-div">
      <div className=""><LeftRegister/></div>
      <div className="mid-line"></div>
      <div className=""><RightLogin/></div>
      </div>
    </div>
    </MainCont>
  )
}

export default Register




