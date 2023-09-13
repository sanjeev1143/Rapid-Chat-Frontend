import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'


const MainCont = styled.div`

.greeting-txt{
  text-align: center;
  font-size: 20px;
  font-family: Space Grotesk;
  color: white;
}
.greeting-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.highlight{
  color: blueviolet;
  font-size: 30px;
}

`


function Welcome({currentUser}) {
  return (
    <MainCont>
    <div className='greeting-div'>
          <div className='greeting-model'>
            <Image alt="greeting-image" height={400} width={400} src={"/robot.gif"}/>
          </div>
         { currentUser?<div className='greeting-txt'><span style={{fontSize:"30px"}}>Welcome,</span> <span className='highlight'>{`${currentUser.user}!` }</span><br/> please select your chat to start messaging</div>:""}
        </div>
    </MainCont>
  )
}

export default Welcome
