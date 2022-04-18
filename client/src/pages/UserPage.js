import React from 'react';
import {
    List,
    Divider,
    Popover,
    Tabs
} from 'antd'
import {getAuth} from "firebase/auth";
import {AuthContext} from '../contexts/AuthContext'

import noActorPhoto from "../image/noActorPhoto.jpeg"

import MenuBar from '../components/MenuBar';
import {getUserLikedMovie, getUserLikedActor} from '../fetcher'
import './app.css'


const {TabPane} = Tabs;


const uid = sessionStorage.getItem("uid")


class UserPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            likeMovie: [],
            likeActor: [],
        }

    }

    componentDidMount() {

        getUserLikedMovie(uid).then(res => {
            console.log(uid)
            this.setState({likeMovie: res.results})
        }).catch((error) => {
            console.log(error)
            // An error happened.
        })

        getUserLikedActor(uid).then(res => {
            console.log(uid)
            this.setState({likeActor: res.results})
        }).catch((error) => {
            console.log(error)
            // An error happened.
        })

    }


    render() {


        return (
            <div class='page'>
                <MenuBar/>

                <div id='page-main' style={{marginTop: '25px'}}>

                    <div class='home-rank-movie' style={{width: '70vw', margin: '0 auto', marginTop: '2vh'}}>


                        <h3>What You Liked </h3>

                        <Tabs type="card" animated defaultActiveKey="Movie" style={{margin: '10px'}}>
                            <TabPane tab="Movie" key="Movie">
                                <Divider orientation="left">Top 10 Movies</Divider>
                                <List
                                    size="small"
                                    grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5,}}
                                    dataSource={this.state.likeMovie}
                                    renderItem={row =>
                                        <Popover content={row.description}>
                                            <div id='colum' style={{maxWidth: "10cm"}}>
                                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                                                    <img src={row.cover_url ? row.cover_url : noActorPhoto} alt={null}
                                                         style={{
                                                             height: '150px',
                                                             marginLeft: '1vw',
                                                             maxWidth: '100px'
                                                         }}/></a>
                                            </div>
                                            <div id="title">
                                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>{row.title}</a>
                                            </div>
                                        </Popover>}
                                />
                            </TabPane>

                            <TabPane tab="Actor" key="Actor">
                                <Divider orientation="left">Top 10 Actor</Divider>
                                <List
                                    size="small"
                                    grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5,}}
                                    dataSource={this.state.likeActor}
                                    renderItem={row =>
                                        <Popover content={row.description}>
                                            <div id='colum' style={{maxWidth: "10cm"}}>
                                                <a href={`/actor/detail?id=${row.name_id}`}>
                                                    <img src={row.headshot_url ? row.headshot_url : noActorPhoto}
                                                         alt={null} style={{
                                                        height: '150px',
                                                        marginLeft: '1vw',
                                                        maxWidth: '100px'
                                                    }}/></a>
                                            </div>
                                            <div id="title">
                                                <a href={`/actor/detail?id=${row.name_id}`}>{row.title}</a>
                                            </div>
                                        </Popover>}
                                />


                            </TabPane>
                        </Tabs>

                    </div>

                </div>

            </div>
        )
    }

}

export default UserPage

