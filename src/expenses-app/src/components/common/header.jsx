import React from 'react';
import { Link, IndexLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


export default class Header extends React.Component {
    render() {
        const {dispatch, isAuthenticated} = this.props

        return (
            <Menu>
                <Menu.Item><Link to ="/home">Home</Link></Menu.Item>
                <Menu.Item><Link to ="/expenses">Expenses</Link></Menu.Item>
                <Menu.Item><Link to ="/correios">Correios</Link></Menu.Item>
                <Menu.Item>
                    {!isAuthenticated && "is NOT Authenticated" }
                    {isAuthenticated && "is Authenticated" }
                </Menu.Item>
            </Menu>
        );
    }
}