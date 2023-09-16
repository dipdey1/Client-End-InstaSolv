import React, {useState, useEffect} from 'react'
import { useAuth } from '../../Utils/Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import"./login.scss"

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
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={(e) => handleUserLogin(e, credentials)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name='email'
              iconPosition="left"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleCredentials}
            />
            <Form.Input
              fluid
              icon="lock"
              name='password'
              iconPosition="left"
              placeholder="Enter your password"
              type="password"
              value={credentials.password}
              onChange={handleCredentials}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login




