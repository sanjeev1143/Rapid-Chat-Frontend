import React from 'react'
import styled from 'styled-components'

const MainCont = styled.div`
height: 100%;
width: 100%;
.msg-cont{

}

`


function Message() {
  return (
    <MainCont>
      <div className='msg-cont'>
        Message 
      </div>
    </MainCont>
  )
}

export default Message
