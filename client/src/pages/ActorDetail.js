import React from 'react';
import {
    List,
    Divider,
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
    WeiboIcon,
} from "react-share";


import {getAuth} from "firebase/auth";
import {AuthContext} from '../contexts/AuthContext'

import MenuBar from '../components/MenuBar';
import {getActorDetail, getActorCasted, addLikeActor} from '../fetcher'
import './app.css'
import './detail.css'


import noActorPhoto from "../image/noActorPhoto.jpeg"


class ActorDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            actorDetail: [],
            actorCasted: [],
            pagination: null,
            nameId: window.location.search ? window.location.search.substring(1).split('=')[1] : null,
        }
    }

    componentDidMount() {

        getActorDetail(this.state.nameId).then(res => {
            //console.log(res.results)
            this.setState({actorDetail: res.results[0]})
        })

        getActorCasted(this.state.nameId, 1).then(res => {
            //console.log(res.results)
            this.setState({actorCasted: res.results})
        })
    }

    render() {

        var detail = this.state.actorDetail;

        var shareUrl = window.location.href;

        /**
         * check if birth name exist and if is difference than name
         * @param {*} name actor's name
         * @param {*} birthName actor's brith name
         * @returns html that display the birth name
         */
        function checkBirthName(name, birthName) {
            if (birthName != null && birthName != name) {
                return <h3>Birth Name: {birthName} </h3>
            }
        }


        return (
            <div class='page'>
                <MenuBar/>


                <div id='detail'>

                    <div class='parent'>
                        <img class='pic' src={detail.headshot_url ? detail.headshot_url.split("_") : noActorPhoto}
                             alt={null} style={{height: 'auto', marginLeft: '5vw', maxWidth: "85%"}}/>

                        <p class='info'>
                            <div>
                                <button onClick={() => {
                                    const auth = getAuth();
                                    const user = auth.currentUser;
                                    if (user !== null) {
                                        const uid = user.uid;
                                        addLikeActor(uid, this.state.nameId).then(res => {
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


                            <h1>{detail.name}</h1>
                            <Divider/>
                            {detail.height ? (<h3>Height: {detail.height}cm</h3>) : null}
                            {detail.date_of_birth ? (<h3>Date of Birth: {detail.date_of_birth} </h3>) : null}
                            {detail.place_of_birth ? (<h3>Place of Birth: {detail.place_of_birth} </h3>) : null}
                            {checkBirthName(detail.name, detail.birth_name)}
                            <div>
                                <a href={`https://www.imdb.com/name/${detail.name_id}`}>
                                    <img
                                        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/220px-IMDB_Logo_2016.svg.png'}
                                        alt={null} style={{borderRadius: '5%', height: '5vh', marginLeft: '1vw'}}/></a>
                            </div>

                            <div id='share'>
                                <a>Share this page:</a>
                                <FacebookShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                     hashtag="#movie" description={"Share on Facebook"}>
                                    <FacebookIcon size={32} round/>
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                    description={"Share on Twitter"}>
                                    <TwitterIcon size={32} round/>
                                </TwitterShareButton>
                                <WeiboShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                  description={"Share on Weibo"}>
                                    <WeiboIcon size={32} round/>
                                </WeiboShareButton>
                                <EmailShareButton url={shareUrl} quote={"Check this out on MovieBase"}
                                                  description={"Share on Email"}>
                                    <EmailIcon size={32} round/>
                                </EmailShareButton>
                            </div>

                        </p>

                        <div class='desp'>
                            <h4>{detail.name}'s bio:</h4>
                            <div
                                style={{overflow: 'auto', maxHeight: "25cm", textAlign: "justify", paddingRight: "5%"}}>
                                <p>{detail.bio}</p></div>
                        </div>

                        <div class='cast'>
                            <Divider/>
                            <List
                                size="large"
                                grid={{gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 3,}}

                                dataSource={this.state.actorCasted}
                                renderItem={row =>
                                    <Popover content={row.description}>
                                        <div id='colum'>
                                            <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                                                <img src={row.cover_url ? row.cover_url : noActorPhoto} alt={null}
                                                     style={{
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
                                pagination={{
                                    defaultPageSize: 12,
                                    size: 'small',
                                }}
                            />

                        </div>


                    </div>


                </div>

            </div>
        )
    }

}

export default ActorDetail

