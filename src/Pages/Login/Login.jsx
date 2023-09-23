import React, {useState, useEffect} from 'react'
import { useAuth } from '../../Utils/Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import './login.scss'
import { iconSizeApple, iconSizeGoogle, styleLoginInput, styleLoginbutton, stylesLogin, stylesLoginForm } from '../../assets/styles';

const Login = () => {
    const {user, handleUserLogin, handleOauth2Login} = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    });

    const handleCredentials = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }
 

    useEffect(() => {
        if(user){
            navigate('/home')
        }
    },[])

  return (
    <Grid textAlign="center" style={stylesLogin} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="massive" onSubmit={(e) => handleUserLogin(e, credentials)} style={{border:'none'}}>
          <Segment stacked style={stylesLoginForm}>
            <Header as="h1" textAlign="center">
              Development
            </Header>
            <Header as="h4" textAlign="center">
              log in to your account
            </Header>
            <Form.Input
              fluid
              icon="user"
              name='email'
              style={styleLoginInput}
              iconPosition="left"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleCredentials}
            />
            <Form.Input
              fluid
              icon="lock"
              name='password'
              style={styleLoginInput}
              iconPosition="left"
              placeholder="Enter your password"
              type="password"
              value={credentials.password}
              onChange={handleCredentials}
            />

            <Button fluid className='login-btn' size="large" style={styleLoginbutton}>
              SIGN IN
            </Button>
            <p>Don't have an account yet? <Link to='/register'>Register</Link></p>
            <p style={{marginTop: '-10px'}}>Forgot password? <Link>Reset</Link></p>
            <div>
              <span>Sign in with</span> 
              <FcGoogle style={iconSizeGoogle} 
              onClick={handleOauth2Login}
              /> 
            </div>

            {/* <p style={{marginTop: 'px'}}>All rights reserved.</p> */}
          </Segment>
          
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login