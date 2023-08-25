import { useRouter } from 'next/router'
import React,{ useState }  from 'react'
import styled from 'styled-components'


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
.leftLogin{
    margin-top: 8px;
}
`



function LeftLogin() {
    const router = useRouter();
    const [inp,setInp] = useState({
        username:"",
        password:""
    })
    const change = (e)=>{
        setInp({
            ...inp,[e.target.name]:e.target.value
        })
       
    }
    const submit = ()=>{
        const data =  inp;
        setInp({
        username:"",
        password:""
        })
    console.log(data);
    }

  return (
    <MainCont>
    <div className="leftLogin">
      <input type="text" className="inp" name="username" placeholder="Username"  value={inp.username} onChange={(e)=>change(e)}/>
      <input type="text" className="inp" name="password"  placeholder="Password"  value={inp.password} onChange={(e)=>change(e)}/>
      <div className="btn pointer hover" onClick={()=>submit()}>Login to Your Account <div className="rightarrow"></div></div>
      <div className="regtxt1">Don’t have an account yet? <span className="boldw" onClick={()=>router.push('register')}>Register now!</span></div>
    </div>

    </MainCont>
  )
}

export default LeftLogin
