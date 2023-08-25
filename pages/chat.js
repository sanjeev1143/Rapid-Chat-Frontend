import React, { useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
 



function Chat() {
    const [token,setToken] = useState('')
    const router = useRouter();
    const logout =async ()=>{
       const resp = await googleLogout();
        console.log(resp);
        window.sessionStorage.removeItem('access_token')
        
        router.push('/')
    }

  return (
    <div>
      <button onClick={()=>{logout()}}>logout</button>
    </div>
  )
}

export default Chat
