import Setavatar from '@/components/avatar/setavatar'
import React from 'react'
import styled from 'styled-components'

const MainCont = styled.div`


`


function Avatar() {
  return (
    <MainCont>
    <div className='avatar-div'>
    <Setavatar/>

    </div>
    </MainCont>
  )
}

export default Avatar
