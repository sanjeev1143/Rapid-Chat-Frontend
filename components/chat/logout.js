import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const MainCont = styled.div`

.logout-btn{
  gap: 1rem;
  color: white;
  font-size: larger;
  font-family: Space Grotesk;
    cursor: pointer;
    margin-right: 20px;
}


`


function Logout() {
    const router = useRouter();
    const logout = ()=>{
        localStorage.clear();
        router.push('/login');
    }


  return (
    <MainCont>
      <div className='logout-btn' onClick={()=>logout()}>Logout</div>
    </MainCont>
  )
}

export default Logout
