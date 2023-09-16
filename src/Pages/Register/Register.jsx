
import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useAuth } from "../../Utils/Context/AuthContext";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name:'',
    email:'',
    password:''
  });

  const {handleRegister} = useAuth()

  const handleRegisterinfo = (e, {name}) => {
    setRegisterInfo({...registerInfo, [name] :e.target.value})
    console.log(registerInfo)
  }

  

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Register a new account
        </Header>
        <Form size="large" onSubmit={(e) => handleRegister(e,registerInfo)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name='name'
              iconPosition="left"
              placeholder="Name"
              value={registerInfo.name}
              onChange={handleRegisterinfo}
            />
            <Form.Input
              fluid
              icon="mail"
              name='email'
              iconPosition="left"
              placeholder="Email"
              type="email"
              value={registerInfo.email}
              onChange={handleRegisterinfo}
            />
            <Form.Input
              fluid
              icon="lock"
              name='password'
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={registerInfo.password}
              onChange={handleRegisterinfo}
            />

            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;