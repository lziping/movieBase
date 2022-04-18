import React from 'react';
import {AuthContext} from '../contexts/AuthContext'
import {
    FormInput,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
    Button,
    InputGroup
} from "shards-react";
import {getAuth, signOut} from "firebase/auth";
import {message} from 'antd';


class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapse: false};
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Logout')
            message.success('Logout Successful!')
            // Sign-out successful.
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }


    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    toggleMenu() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <div>

                <Navbar type="dark" theme="secondary" expand="md">


                    <NavbarBrand href="/">MovieBase</NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink active href="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/movie">
                                Movie
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/actor">
                                Actor
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/rank">
                                Ranking
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <div>
                        <form action="/search/" enctype="text/plain">
                            <FormInput name="search" type="text" placeholder="Search Movie Here"/>
                            {/*<Button onClick="/search/" type='submit'>Search</Button>*/}
                        </form>
                    </div>
                    <Nav navbar style={{marginLeft: 'auto', maxHeight: "1cm"}}>
                        <AuthContext.Consumer>
                            {
                                ({user, isLoggedIn}) => {
                                    return (
                                        isLoggedIn ? <>
                                            <NavItem>
                                                <NavLink active href="/user">
                                                    User
                                                </NavLink>
                                            </NavItem>
                                            <Button onClick={this.logout} style={{maxHeight: "1cm"}}>Logout</Button>
                                        </> : <>
                                            <NavItem>
                                                <NavLink active href="/login">
                                                    Login
                                                </NavLink>
                                            </NavItem>

                                        </>
                                    )
                                }
                            }
                        </AuthContext.Consumer>
                    </Nav>
                </Navbar>


            </div>
        )
    }
}


export default MenuBar
