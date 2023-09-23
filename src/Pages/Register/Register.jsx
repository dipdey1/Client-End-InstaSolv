
import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useAuth } from "../../Utils/Context/AuthContext";
import { styleLoginInput, styleLoginbutton, styleRegisterInput, stylesLogin, stylesLoginForm, stylesRegisterForm } from "../../assets/styles";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name:'',
    email:'',
    password:''
  });

  const {handleRegister} = useAuth()

  const handleRegisterinfo = (e, {name}) => {
    setRegisterInfo({...registerInfo, [name] :e.target.value})
  }

  

  return (
    <Grid textAlign="center" style={stylesLogin} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={(e) => handleRegister(e,registerInfo)} style={{border:'none'}}>
          <Segment stacked style={stylesRegisterForm}>
          <Header as="h1" color="black" textAlign="center">
                  Development
                </Header>
              <Header as="h4" color="black" textAlign="center">
                Register a new account
              </Header>
            <Form.Input
              fluid
              icon="user"
              name='name'
              iconPosition="left"
              placeholder="Name"
              style={styleRegisterInput}
              value={registerInfo.name}
              required={true}
              onChange={handleRegisterinfo}
            />
            <Form.Input
              fluid
              icon="mail"
              name='email'
              iconPosition="left"
              placeholder="Email"
              style={styleRegisterInput}
              type="email"
              value={registerInfo.email}
              required={true}
              onChange={handleRegisterinfo}
            />
            <Form.Input
              fluid
              icon="lock"
              name='password'
              iconPosition="left"
              placeholder="Password"
              style={styleRegisterInput}
              type="password"
              value={registerInfo.password}
              onChange={handleRegisterinfo}
              required={true}
            />

            <Button fluid size="large" style={styleLoginbutton}>
              Register
            </Button>
            <p>Already have an account? <Link to='/login'>Sign in</Link></p>
            <p style={{marginTop: '-10px'}}>See the <Link>Terms & Agreements</Link></p>
            <p style={{marginTop: '120px'}}>All rights reserved.</p>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;