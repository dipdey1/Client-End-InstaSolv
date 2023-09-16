import React, { Component, useEffect, useState } from 'react'
import './Navbar.scss'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Utils/Context/AuthContext'

const NavbarComponent = () => {

    const [activeItem, setActiveItem] = useState()
    const {user, handleUserLogout} = useAuth()
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
        {
          user ? (<div><span> Welcome {user.name}</span><Button onClick={handleUserLogout}>Log Out</Button></div>):(<div><Button>Login</Button></div>)
        }
      </Menu>
        
    </Segment>
    )
  }

export default NavbarComponent
