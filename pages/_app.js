import '@/styles/globals.css'




import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function App({ Component, pageProps }) {

  const client_id="11153797814-a3ch9s4th56er93p86vmbejpr0bdo9jv.apps.googleusercontent.com"
useEffect(()=>{
  if(window.sessionStorage.getItem('access_token')){
  
}
})
  
  return<>
<GoogleOAuthProvider clientId={client_id}>

  <Component {...pageProps} />
  </GoogleOAuthProvider>;
  
  </> 
}
