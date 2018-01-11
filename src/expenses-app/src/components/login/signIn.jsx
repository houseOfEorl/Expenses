import React from 'react';
import ApiCaller from '../../api/apiCaller';
var { Grid, Header, Image, Form, Button, Message, Segment } = require('semantic-ui-react');




class SignIn extends React.Component {

    constructor(props) {

        super(props);

        this.handleLoginClick = this.handleLoginClick.bind();
    }

    handleLoginClick() {


        const foo = {
            "username": "TEST",
            "password": "TEST"
        }

        ApiCaller.post("Token", foo)
            .then(function (response) {
                if(response.data) {
                    localStorage.setItem("ApiExpToken", response.data.token);
                }
                else {
                    alert(response);
                }
            });
    }

    render ()
    {
        return (
        <div className='login-form'>
            {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
            */}
            <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
                height: 100%;
            }
            `}</style>
            <br/>
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in
                    </Header>
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                        />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        />

                        <Button color='teal' fluid size='large' onClick={this.handleLoginClick}>Login</Button>
                    </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
        )
    }
}

export default SignIn;