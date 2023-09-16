import React, {useState, useEffect} from 'react'
import { useAuth } from '../../Utils/Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import './login.scss'
import { styleLoginInput, styleLoginbutton, stylesLogin, stylesLoginForm } from '../../assets/styles';

const Login = () => {
    const {user, handleUserLogin} = useAuth()
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
            <Header as="h1" color="#213555" textAlign="center">
              Development
            </Header>
            <Header as="h4" color="#213555" textAlign="center">
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

            <Button fluid className='login-btn' size="small" style={styleLoginbutton}>
              SIGN IN
            </Button>
            <p>Don't have an account yet? <Link to='/register'>Register</Link></p>
            <p style={{marginTop: '-15px'}}>Forgot password? <Link>Reset</Link></p>
            <p style={{marginTop: '55px'}}>All rights reserved.</p>
          </Segment>
          
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login