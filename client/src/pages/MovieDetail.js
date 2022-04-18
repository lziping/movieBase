import React from 'react';
import {
    List,
    Divider,
    Carousel,
    Popover,
    message
} from 'antd'

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WeiboShareButton,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WeiboIcon
} from "react-share";

import {
    Rating,
} from '@mui/material';


import {getAuth} from "firebase/auth";
import {AuthContext} from '../contexts/AuthContext'


import MenuBar from '../components/MenuBar';
import {getMovieDetail, getMovieCasts, addLikeMovie, getSimilarMovie} from '../fetcher'
import './app.css'
import './detail.css'
import noActorPhoto from "../image/noActorPhoto.jpeg"


function similarMovie(similarMoviePage) {
    return <div>
        <List
            size="large"
            grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 5, xl: 5, xxl: 5,}}

            dataSource={similarMoviePage}
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

class MovieDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            movieDetail: [],
            castsOfMovie: [],
            similarMoviePage1: [],
            similarMoviePage2: [],
            similarMoviePage3: [],
            pagination: null,
            movieId: window.location.search ? window.location.search.substring(1).split('=')[1] : null,

        }


    }

    componentDidMount() {

        getMovieDetail(this.state.movieId).then(res => {
            //console.log(res.results)
            this.setState({movieDetail: res.results[0]})


            var genre = this.state.movieDetail.genre;
            var language = this.state.movieDetail.language
            var director = this.state.movieDetail.director;

            getSimilarMovie(genre, language, director, 1).then(res => {
                console.log(genre)
                console.log(res.results)
                this.setState({similarMoviePage1: res.results})
            })

            getSimilarMovie(genre, language, director, 2).then(res => {
                console.log(genre)
                console.log(res.results)
                this.setState({similarMoviePage2: res.results})
            })
            getSimilarMovie(genre, language, director, 3).then(res => {
                console.log(genre)
                console.log(res.results)
                this.setState({similarMoviePage3: res.results})
            })

        })

        getMovieCasts(this.state.movieId).then(res => {
            //console.log(res.results)
            this.setState({castsOfMovie: res.results})
        })
    }


    render() {

        var detail = this.state.movieDetail
        var shareUrl = window.location.href;


        function seperate(elements) {

            let elementArray = []
            String(elements).split(',').forEach(element => {
                elementArray.push(<a href={`/search/?search=${element}`.trim()} style={{color: "black"}}>{element}</a>)
            })
            return elementArray
        }

        return (
            <div class='page'>
                <MenuBar/>


                <div id='detail'>

                    <div class='parent'>

                        <img class='pic' src={(detail.cover_url ? detail.cover_url : noActorPhoto)} alt={null}
                             style={{height: 'auto', marginLeft: '5vw', maxWidth: "85%"}}/>

                        <p class='info'>

                            <div>
                                <button onClick={() => {
                                    const auth = getAuth();
                                    const user = auth.currentUser;
                                    if (user !== null) {
                                        const uid = user.uid;
                                        addLikeMovie(uid, this.state.movieId).then(res => {
                                            if (res == 'Duplicate entry ') {
                                                message.warning('Liked Already')
                                            } else (
                                                message.success('Success')
                                            )
                                        })
                                    } else {
                                        message.error('Please Login First')
                                    }
                                }
                                } size='large' style={{marginLeft: 'auto'}}>Like This Movie
                                </button>

                            </div>

                            <h1>{detail.title}</h1>
                            <div><Rating value={detail.iMDb_average_vote + 0} precision={0.25} max={10} readOnly/></div>
                            <h3>Year: <a href={`/search/?search=${detail.year}`}
                                         style={{color: "black"}}>{detail.year}</a></h3>

                            <h3>Genre: {seperate(detail.genre)} </h3>

                            <h3>Language: {seperate(detail.language)}</h3>

                            <h3>Director: {seperate(detail.director)}</h3>

                            <div>
                                <a href={`https://www.imdb.com/title/${detail.iMDb_title_id}`}>
                                    <img
                                        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/220px-IMDB_Logo_2016.svg.png'}
                                        referrerpolicy="no-referrer" alt={null}
                                        style={{borderRadius: '5%', height: '5vh', marginLeft: '1vw'}}/></a>
                            </div>
                            <div id='share' style={{maxHeight: '1cm', flex: 'auto'}}>
                                <a style={{overflow: 'hidden'}}>Share this page:</a>
                                <FacebookShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                     hashtag="#movie" description={"Share on Facebook"}>
                                    <FacebookIcon size={32} round/>
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                    description={"Share on Twitter"}>
                                    <TwitterIcon size={32} round/>
                                </TwitterShareButton>
                                <WeiboShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                  image={detail.cover_url} description={"Share on Weibo"}>
                                    <WeiboIcon size={32} round/>
                                </WeiboShareButton>
                                <EmailShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                  description={"Share on Email"}>
                                    <EmailIcon size={32} round/>
                                </EmailShareButton>
                            </div>

                        </p>

                        <div class='desp'>
                            <h4>Description:</h4>
                            <p style={{extAlign: "justify"}}>{detail.description}</p>
                        </div>

                        <div class='cast'>
                            <Divider orientation="left">Casts</Divider>
                            <List
                                size="small"
                                grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5,}}
                                dataSource={this.state.castsOfMovie}
                                renderItem={row => <div>
                                    <div id='colum-cast'>
                                        <a href={`/actor/detail?id=${row.name_id}`}>
                                            <img src={row.headshot_url ? row.headshot_url : noActorPhoto} alt={null}
                                                 style={{
                                                     borderRadius: '50%',
                                                     height: '100px',
                                                     marginBottom: '1vw'
                                                 }}/></a>
                                    </div>
                                    <div id="colum-name">
                                        <a href={`/actor/detail?id=${row.name_id}`}
                                           style={{color: "black"}}>{row.name}</a>
                                    </div>
                                </div>} pagination={{
                                defaultPageSize: 16,
                                size: 'small',
                            }}
                            />
                        </div>


                        <div class='similar'>
                            <Divider orientation="left"><h4>You Might Like...</h4></Divider>
                            <Carousel autoplay arrows style={{
                                margin: '0% 5% 5% 5%',
                                height: 'auto',
                                background: '#364d79',
                                padding: '1em',
                                borderRadius: '1em'
                            }}>
                                {similarMovie(this.state.similarMoviePage1)}
                                {similarMovie(this.state.similarMoviePage2)}
                                {similarMovie(this.state.similarMoviePage3)}
                            </Carousel>
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}

export default MovieDetail

