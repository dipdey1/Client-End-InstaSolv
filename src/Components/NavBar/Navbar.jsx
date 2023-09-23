import React, { Component, useEffect, useState } from 'react'
import './Navbar.scss'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Utils/Context/AuthContext'
import { navbarLogout, navbarVerification } from '../../assets/styles'

const NavbarComponent = () => {

    const [activeItem, setActiveItem] = useState()
    const {user, handleUserLogout, handleVerification} = useAuth()
    const navigate = useNavigate()

    const handleItemClick = (e, { name }) => {
      setActiveItem({ activeItem: name })
      navigate(`/${name}`)
    }

  
    return (    
      <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='history'
          active={activeItem === 'history'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='profile'
          active={activeItem === 'Profile'}
          onClick={handleItemClick}
          position='left'
        />
        <div>
        <p style={{display: 'inline', marginRight: '20px'}}>Welcome, {user.name}  </p>
        <div  style={{display: 'inline'}}>
        <Button style={navbarLogout} onClick={handleUserLogout} >Log Out</Button>
        {(!user.emailVerification)? <Button style={navbarVerification} onClick={handleVerification}>Verify Email</Button>: null}
        </div>
        </div>
        </Menu>
        
    </Segment>
    )
  }

export default NavbarComponent
