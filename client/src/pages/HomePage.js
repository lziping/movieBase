import React, {useReducer} from 'react';
import {
    Pagination,
    List,
    Divider,
    Popover,
    Carousel
} from 'antd'

import {getAuth} from "firebase/auth";
import {AuthContext} from '../contexts/AuthContext'

import MenuBar from '../components/MenuBar';
import {getActorBornToday, getHome100, getMostVotedMovie, getMovieRecommendForUser} from '../fetcher'
import './app.css'
import noActorPhoto from "../image/noActorPhoto.jpeg"


let day = new Date().toLocaleString("en-US", {month: "long", day: '2-digit'})
//
let date = new Date().toLocaleString("en-US", {month: "2-digit", day: '2-digit'}).replace("/", "-")

const uid = sessionStorage.getItem("uid")


const bornTodayColumns = [
    {
        //title: 'cover_url',
        dataIndex: 'name',
        key: 'name',
        render: (name, row) => <div>
            <div id='colum-cast'>
                <a href={`/actor/detail?id=${row.name_id}`}>
                    <img src={row.headshot_url ? row.headshot_url : noActorPhoto} alt={null}
                         style={{borderRadius: '50%', height: '10vh', marginBottom: '1vw'}}/></a>
            </div>
            <div id="colum-name">
                <a href={`/actor/detail?id=${row.name_id}`}>{name}</a>
            </div>
        </div>
    },
];

function createMovieDiv(movies) {
    return <div>
        <List
            size="large"
            grid={{xs: 1, sm: 2, md: 3, lg: 5, xl: 5, xxl: 5,}}

            dataSource={movies}
            renderItem={row =>
                <Popover content={row.description}>
                    <div id='colum' style={{marginTop: '20px'}}>
                        <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                            <img src={row.cover_url ? row.cover_url : noActorPhoto} alt={null}
                                 style={{height: '200px', maxWidth: '150px', marginLeft: '1vw'}}/></a>
                    </div>
                    <div id="title" style={{marginBottom: '20px'}}>
                        <a href={`/movie/detail?id=${row.iMDb_title_id}`} style={{color: 'white'}}>{row.title}</a>
                    </div>
                </Popover>}
        />
    </div>
}

class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nameBornToday: [],

            home100Movies: [],
            carousel1: [],
            carousel2: [],
            carousel3: [],
            carousel4: [],
            carousel5: [],
            mostCastActor: [],
            mostCastActress: [],
            mostDirected: [],
            mostVotedMovie: [],
            pagination: null,
            movieForUser: []
        }


    }

    componentDidMount() {


        getHome100(1).then(res => {
            this.setState({home100Movies: res.results})
            this.setState({carousel1: res.results})
        })

        getHome100(2).then(res => {
            this.setState({carousel2: res.results})
        })
        
        getMovieRecommendForUser(uid).then(res => {
            this.setState({movieForUser: res.results})
        })
            
        getMostVotedMovie().then(res => {
            this.setState({mostVotedMovie: res.results[0]})
        })
        
        getHome100(3).then(res => {
            this.setState({carousel3: res.results})
        })
        getHome100(4).then(res => {
            this.setState({carousel4: res.results})
        })
        getHome100(5).then(res => {
            this.setState({carousel5: res.results})
        })

        getActorBornToday(date).then(res => {
            this.setState({nameBornToday: res.results})
        })


    }


    render() {


        return (
            <div class='page'>
                <MenuBar/>


                <div id='page-main' style={{marginTop: '25px'}}>
                    <div class='home-rank-movie' style={{marginTop: '5vh'}}>

                        <div class='home'>
                            <div class="div1" style={{maxHeight: '50cm'}}>
                                <div><Divider orientation="left"><h1 style={{color: "grey"}}>MovieBase</h1></Divider>
                                    <Carousel autoplay arrows effect='fade' style={{
                                        margin: '0% 1% 1% 1%',
                                        maxHeight: '20cm',
                                        background: '#adb5bd',
                                        padding: '1em',
                                        borderRadius: '1em'
                                    }}>
                                        {createMovieDiv(this.state.carousel1)}
                                        {createMovieDiv(this.state.carousel2)}
                                        {createMovieDiv(this.state.carousel3)}
                                        {createMovieDiv(this.state.carousel4)}
                                        {createMovieDiv(this.state.carousel5)}
                                    </Carousel></div>

                                <AuthContext.Consumer>
                                    {
                                        ({user, isLoggedIn}) => {
                                            return (
                                                <div>
                                                    {
                                                        isLoggedIn ? <>
                                                            <div style={{marginBottom: "1cm"}}>
                                                                <Divider orientation="left"><h3>You might like....</h3>
                                                                </Divider>
                                                                <List
                                                                    size="large"
                                                                    grid={{
                                                                        gutter: 16,
                                                                        xs: 1,
                                                                        sm: 2,
                                                                        md: 3,
                                                                        lg: 4,
                                                                        xl: 5,
                                                                        xxl: 5,
                                                                    }}
                                                                    dataSource={this.state.movieForUser}
                                                                    renderItem={row =>
                                                                        <Popover content={row.description}>
                                                                            <div id='colum'>
                                                                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                                                                                    <img
                                                                                        src={row.cover_url ? row.cover_url : noActorPhoto}
                                                                                        alt={null} style={{
                                                                                        height: '200px',
                                                                                        maxWidth: '150px',
                                                                                        marginLeft: '1vw'
                                                                                    }}/></a>
                                                                            </div>
                                                                            <div id="title">
                                                                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}
                                                                                   style={{color: "black"}}>{row.title}</a>
                                                                            </div>
                                                                        </Popover>}
                                                                />

                                                            </div>
                                                        </> : <>
                                                            <br></br>
                                                        </>
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </AuthContext.Consumer>


                            </div>


                            <div class="div2" style={{maxWidth: '10cm', maxHeight: '20cm'}}>
                                <List
                                    size="xs"
                                    bordered
                                    header={<h4>MovieBase Top 100</h4>}
                                    dataSource={this.state.home100Movies}
                                    renderItem={row =>
                                        <List.Item>
                                            <Popover content={<img src={row.cover_url ? row.cover_url : noActorPhoto}
                                                                   alt={null} style={{
                                                height: '200px',
                                                maxWidth: '150px',
                                                marginLeft: '1vw'
                                            }}/>}>
                                                <div id="title">
                                                    <a href={`/movie/detail?id=${row.iMDb_title_id}`}
                                                       style={{color: "black"}}>{row.title}</a>
                                                </div>
                                            </Popover>
                                        </List.Item>}
                                />
                                <Pagination defaultCurrent={1} simple total={100} showSizeChanger={false}
                                            onChange={page => {
                                                getHome100(page).then(res => {
                                                    this.setState({home100Movies: res.results})
                                                })
                                            }
                                            }/>
                            </div>

                            <div class="div3" style={{maxHeight: '10cm'}}>
                                <Divider><h4>Movie With Most Vote</h4></Divider>
                                <div>
                                    <Popover placement="top" content={this.state.mostVotedMovie.description}>
                                        <div>
                                            <a href={`/movie/detail?id=${this.state.mostVotedMovie.iMDb_title_id}`}>
                                                <img src={this.state.mostVotedMovie.cover_url} alt={null} style={{
                                                    height: '200px',
                                                    maxWidth: '150px',
                                                    marginLeft: '1vw'
                                                }}/></a>

                                        </div>
                                    </Popover>
                                    <div>
                                        <label><a href={`/movie/detail?id=${this.state.mostVotedMovie.iMDb_title_id}`}
                                                  style={{color: "black"}}>{this.state.mostVotedMovie.title}</a>
                                        </label><br></br>
                                        <label>Total vote:{this.state.mostVotedMovie.iMDb_total_votes}</label></div>
                                </div>
                            </div>


                            <div class="div7" style={{marginTop: "1cm"}}>
                                <h3>Born today</h3>
                                <Divider orientation="left">{day}</Divider>
                                <List
                                    size="small"
                                    grid={{gutter: 16, xs: 3, sm: 4, md: 5, lg: 6, xl: 10, xxl: 10,}}
                                    dataSource={this.state.nameBornToday}
                                    renderItem={row => <div>
                                        <div id='colum-cast'>
                                            <a href={`/actor/detail?id=${row.name_id}`}>
                                                <img src={row.headshot_url ? row.headshot_url : noActorPhoto}
                                                     style={{borderRadius: '50%', height: '100px'}}/></a>
                                        </div>
                                        <div id="colum-name">
                                            <a href={`/actor/detail?id=${row.name_id}`}>{row.name}</a>
                                            <Divider></Divider>
                                        </div>
                                    </div>} pagination={{
                                    defaultPageSize: 20,
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default HomePage
