import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetail from "./pages/MovieDetail";
import ActorPage from "./pages/ActorPage";
import ActorDetail from "./pages/ActorDetail";
import SearchPage from "./pages/SearchPage";
import RankPage from "./pages/RankPage";
import LoginPage from "./pages/LoginPage";
import UserPage from './pages/UserPage';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {AuthContext} from "./contexts/AuthContext";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        this.checkStatus()
    }


    checkStatus = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log(user)

                const uid = user.uid;
                // ...
                this.setState({
                    isLoggedIn: true,
                    user: user
                })
            } else {
                // User is signed out
                // ...
                console.log('Signed out')
                this.setState({
                    isLoggedIn: false,
                    user: user
                })
            }
        });
    }


    render() {
        return (
            <AuthContext.Provider value={{
                user: this.state.user,
                isLoggedIn: this.state.isLoggedIn
            }}>

                <div>
                    <Router>
                        <Switch>
                            <Route exact
                                   path="/"
                                   render={() => (
                                       <HomePage/>
                                   )}/>
                            <Route exact
                                   path="/movie"
                                   render={() => (
                                       <MoviePage/>
                                   )}/>

                            <Route exact
                                   path="/movie/detail"
                                   render={() => (
                                       <MovieDetail/>
                                   )}/>

                            <Route exact
                                   path="/actor"
                                   render={() => (
                                       <ActorPage/>
                                   )}/>

                            <Route exact
                                   path="/actor/detail"
                                   render={() => (
                                       <ActorDetail/>
                                   )}/>

                            <Route exact
                                   path="/search"
                                   render={() => (
                                       <SearchPage/>
                                   )}/>

                            <Route exact
                                   path="/rank"
                                   render={() => (
                                       <RankPage/>
                                   )}/>

                            <Route exact
                                   path="/login"
                                   render={() => (
                                       <LoginPage/>
                                   )}/>

                            <Route exact
                                   path="/user"
                                   render={() => (
                                       <UserPage/>
                                   )}/>

                        </Switch>
                    </Router>
                </div>
            </AuthContext.Provider>
        )
    }
}