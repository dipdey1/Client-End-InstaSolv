import React, { useEffect, useRef } from 'react'
import AskDoubts from '../../Components/askDoubt/askDoubts'
import'./home.scss'
import { Container } from 'semantic-ui-react'
import NavbarComponent from '../../Components/NavBar/Navbar'
import CardType from '../../Components/doubtsCards/Card'
import { useAuth } from '../../Utils/Context/AuthContext'

const Home = () => {

  const {updateVerification, handleUserLogout} =useAuth()

  useEffect(() => {

      const urlParams = new URLSearchParams(window.location.search)
      const userid = urlParams.get('userId')
      const secret = urlParams.get('secret')
      if(userid != null){
        updateVerification(userid,secret)
      }
    
  },[])

  const logoutTimerIdRef = useRef(null);
  
    useEffect(() => {
      const autoLogout = () => {
        console.log(document.visibilityState);
      if (document.visibilityState === 'hidden') {
        const timeOutId = window.setTimeout(handleUserLogout, 30* 60 * 1000);
        logoutTimerIdRef.current = timeOutId;

      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener('visibilitychange', autoLogout);

    return () => {
      document.removeEventListener('visibilitychange', autoLogout);
    };
  }, []);
  
  return (
        <>
        <NavbarComponent/>
        <Container fluid className='ask-doubts'>
        <AskDoubts/>
        </Container>
        <Container fluid className='doubt-cards'>
            <CardType/>
        </Container>
        <Container>
        </Container>
        
        </>
  )
}

export default Home