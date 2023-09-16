import React from 'react'
import AskDoubts from '../../Components/askDoubt/askDoubts'
import'./home.scss'
import { Container } from 'semantic-ui-react'
import NavbarComponent from '../../Components/NavBar/Navbar'
import CardType from '../../Components/doubtsCards/Card'

const Home = () => {
  return (
        <>
        <NavbarComponent/>
        <Container fluid className='ask-doubts'>
        <AskDoubts/>
        </Container>
        <Container fluid className='doubt-cards'>
            <CardType/>
        </Container>
        
        </>
  )
}

export default Home