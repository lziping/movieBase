import React from 'react';
import {
    Table,
    Popover,
} from 'antd'

import MenuBar from '../components/MenuBar';
import {getSearchMovie, getSearchActor} from '../fetcher'
import './app.css'


const noActorPhoto = "../image/noActorPhoto.jpeg"


const movieColumns = [
    {
        //title: 'cover_url',
        dataIndex: 'cover_url',
        key: 'cover_url',
        render: (imag, row) =>
            <div>
                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                    <Popover content={row.description}>
                        <img src={imag ? imag : noActorPhoto} alt={null} style={{height: '150px', marginLeft: '1vw'}}/>
                    </Popover>
                </a>
            </div>
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title, row) => <a href={`/movie/detail?id=${row.iMDb_title_id}`}>{title}</a>
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        sorter: (a, b) => a.year - b.year
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
    },
    {
        title: 'Director',
        dataIndex: 'director',
        key: 'director',
        sorter: (a, b) => a.director.localeCompare(b.director),

    },

];

const actorColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        render: (name, row) =>
            <div>
                <div id='colum-cast'>
                    <a href={`/actor/detail?id=${row.name_id}`}>
                        <img src={row.headshot_url ? row.headshot_url : noActorPhoto} alt={null}
                             style={{borderRadius: '50%', height: '100px', marginLeft: '1vw'}}/></a>
                </div>
                <div id="colum-name">
                    <a href={`/actor/detail?id=${row.name_id}`}>{name}</a>
                </div>
            </div>
    },

];


class SearchPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            movieResults: [],
            actorResults: [],
            pagination: null,
            keyword: window.location.search ? window.location.search.substring(1).split('=')[1].replaceAll("+", " ").trim() : null,
        }


    }


    componentDidMount() {

        getSearchMovie(this.state.keyword).then(res => {
            this.setState({movieResults: res.results})
        })

        getSearchActor(this.state.keyword).then(res => {
            this.setState({actorResults: res.results})
        })

    }


    render() {

        const checkIfMatchActor = () => {
            if (this.state.actorResults.length > 0) {
                return <Table dataSource={this.state.actorResults} columns={actorColumns}
                              pagination={{
                                  defaultPageSize: 5,
                              }}/>
            }
        }

        return (
            <div class='page'>
                <MenuBar/>


                <div id='page-main' style={{marginTop: '25px'}}>


                    <div class='home-rank-movie' style={{marginTop: '5vh'}}>
                        <h3>Result of {this.state.keyword.replaceAll("%20", " ")}</h3>
                        {checkIfMatchActor()}

                        <Table dataSource={this.state.movieResults} columns={movieColumns}
                               pagination={{
                                   defaultPageSize: 5,

                               }}/>

                    </div>

                </div>

            </div>
        )
    }

}

export default SearchPage

