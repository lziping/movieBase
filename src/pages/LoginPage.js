import React from 'react';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
    , GoogleAuthProvider, getRedirectResult, signInWithRedirect
} from "firebase/auth";
import {AuthContext} from '../contexts/AuthContext'
import GoogleButton from 'react-google-button'

import {Form, Input, Button, Checkbox, message} from 'antd';

import MenuBar from '../components/MenuBar';

class LoginPage extends React.Component {


    register = () => {

        const email = (document.getElementById("email").value)
        const password = (document.getElementById("password").value)

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                message.success("Register Successfully")
                const user = userCredential.user;


            })
            .catch((error) => {
                console.error(error)
                // ..
                message.error(error.message)
            });


    }

    login = () => {

        //const email ="email@email.com"
        //const password = 'password'

        const email = (document.getElementById("email").value)
        const password = (document.getElementById("password").value)

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                message.success("Sucessfully Login")
                //console.log(userCredential)
                const user = userCredential.user;
                sessionStorage.setItem("uid", user.uid)
            })
            .catch((error) => {
                message.error(error.code)
                //console.error(error)
            });
    }
    logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Logout')
            message.success("Sucessfully Logout")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }

    google = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            message.error(error.code)
        });
    }


    render() {
        return (
            <div className='page' style={{height: '100vh'}}>
                <MenuBar/>

                <div id='page-main' style={{borderRadius: "25px 25px 25px 25px", marginTop: "20px"}}>
                    <div class='home-rank-movie' style={{marginTop: '5vh'}}>


                        <Form>
                            <Form.Item label="Email" name="email"
                                       rules={[{required: true, message: 'Email!'}]}>
                                <Input id="email"/>
                            </Form.Item>

                            <Form.Item
                                label="Password" name="password"
                                rules={[{required: true, message: 'Password!'}]}>
                                <Input.Password/>
                            </Form.Item>
                        </Form>


                        <AuthContext.Consumer>
                            {
                                ({user, isLoggedIn}) => {
                                    return (
                                        <div>
                                            {
                                                isLoggedIn ? <>
                                                    <button onClick={this.logout}>Logout</button>
                                                </> : <>
                                                    <div>
                                                        <Button onClick={this.register}>Register</Button>
                                                        <Button onClick={this.login}>Login</Button>
                                                        <GoogleButton onClick={this.google}
                                                                      style={{marginRight: '25vh'}}>Login With
                                                            Google</GoogleButton>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                }
                            }
                        </AuthContext.Consumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage




