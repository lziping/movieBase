import React from 'react';
import {
    Table,
    Pagination,
    Select,
    Col,
    Row,
    Popover
} from 'antd'

import {Form, FormInput, FormGroup, Button} from "shards-react";

import MenuBar from '../components/MenuBar';
import {getMovies, getCountMovie} from '../fetcher'
import './app.css'
import noActorPhoto from "../image/noActorPhoto.jpeg"


const {Option} = Select;


const actorColumns = [
    {
        //title: 'cover_url',
        dataIndex: 'cover_url',
        key: 'cover_url',
        render: (image, row) => <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
            <Popover placement="top" content={row.description}>
                <img src={(image ? image : noActorPhoto)} alt={null}
                     style={{borderRadius: '5%', height: '200px', maxWidth: "150px", marginLeft: '1vw'}}/>
            </Popover></a>
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title, row) => <a href={`/movie/detail?id=${row.iMDb_title_id}`} style={{color: "black"}}>{title}</a>
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
    {
        title: 'Rating',
        dataIndex: 'iMDb_average_vote',
        key: 'iMDb_average_vote',
        sorter: (a, b) => a.iMDb_average_vote - b.iMDb_average_vote,

    },

];


class MoviePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            genre: '',
            year: '',
            minrating: '',
            movieAmount: 1000,
            movieResults: [],
            pagination: null,
        }
        this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.handleRatingQueryChange = this.handleRatingQueryChange.bind(this)
        this.updateFilterResults = this.updateFilterResults.bind(this)
    }


    handleGenreQueryChange(value) {
        this.setState({genre: value})
    }


    handleYearQueryChange(event) {
        this.setState({year: event.target.value})
    }

    handleRatingQueryChange(event) {
        this.setState({minrating: event.target.value})
    }

    componentDidMount() {

        getMovies(1, this.state.genre, this.state.year, this.state.minrating).then(res => {
            this.setState({movieResults: res.results})
        })

        getCountMovie(this.state.genre, this.state.year, this.state.minrating).then(res => {
            this.setState({movieAmount: res.results[0].countMovieAmount})
        })

    }

    updateFilterResults() {
        getMovies(1, this.state.genre, this.state.year, this.state.minrating).then(res => {
            this.setState({movieResults: res.results})
        })
        getCountMovie(this.state.genre, this.state.year, this.state.minrating).then(res => {
            this.setState({movieAmount: res.results[0].countMovieAmount})
        })
    }


    render() {


        return (
            <div class='page'>
                <MenuBar/>

                <div id='page-main' style={{marginTop: '25px'}}>

                    <div class='home-rank-movie' style={{width: '70vw', margin: '0 auto', marginTop: '2vh'}}>
                        <div>
                            <Form style={{width: '70vw', margin: '0 auto', marginTop: '5vh'}}>
                                <Row>

                                    <Col flex={2}><FormGroup style={{width: '20vw', margin: '0 auto'}}>
                                        <label>Genre</label>

                                        <Select defaultValue="All"
                                                style={{width: '20vw', margin: '0 auto', height: '2.5vw'}}
                                                onChange={this.handleGenreQueryChange}>
                                            <Option value="Action">Action</Option>
                                            <Option value="Comedy">Comedy</Option>
                                            <Option value="Fantasy">Fantasy</Option>
                                            <Option value="Sci-Fi">Sci-Fi</Option>
                                            <Option value="Drama">Drama</Option>
                                            <Option value="Crime">Crime</Option>
                                            <Option value="History">History</Option>
                                            <Option value="Adventrue">Adventrue</Option>
                                            <Option value="Mystery">Mystery</Option>
                                            <Option value="Romance">Romance</Option>
                                            <Option value="Western">Western</Option>
                                            <Option value="Family">Family</Option>
                                            <Option value="War">War</Option>
                                            <Option value="Biography">Biography</Option>
                                            <Option value="Sport">Sport</Option>
                                            <Option value="">All</Option>
                                        </Select>
                                    </FormGroup>
                                    </Col>


                                    <Col flex={2}><FormGroup style={{width: '20vw', margin: '0 auto'}}>
                                        <label>Year</label>
                                        <FormInput style={{height: '2.5vw'}} placeholder="Year" value={this.state.year}
                                                   onChange={this.handleYearQueryChange}/>
                                    </FormGroup></Col>
                                    <Col flex={2}><FormGroup style={{width: '20vw', margin: '0 auto'}}>
                                        <label>Minimum Rating</label>
                                        <FormInput style={{height: '2.5vw'}} placeholder="Rating"
                                                   value={this.state.minrating}
                                                   onChange={this.handleRatingQueryChange}/>
                                    </FormGroup></Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col flex={2}>
                                        <FormGroup style={{width: '20vw', paddingLeft: '55vw'}}>
                                            <Button style={{width: '10vw'}}
                                                    onClick={this.updateFilterResults}>Filter</Button>
                                        </FormGroup>
                                    </Col>

                                </Row>


                            </Form>

                        </div>
                        <h3>Movies</h3>

                        <Table dataSource={this.state.movieResults} columns={actorColumns}/>
                        <Pagination defaultCurrent={1} total={this.state.movieAmount} showSizeChanger={false}
                                    onChange={page => {
                                        getMovies(page, this.state.genre, this.state.year, this.state.minrating).then(res => {
                                            this.setState({movieResults: res.results})
                                        })
                                    }
                                    }/>

                    </div>

                </div>

            </div>
        )
    }

}

export default MoviePage

