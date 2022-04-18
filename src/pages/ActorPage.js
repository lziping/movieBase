import React from 'react';
import {
    Table,
    Pagination,
    Col,
    Row,
} from 'antd'
import {Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress} from "shards-react";

import MenuBar from '../components/MenuBar';
import {getActor, getCountActor} from '../fetcher'
import './app.css'

import noActorPhoto from "../image/noActorPhoto.jpeg"


const actorColumns = [
    {
        //title: 'headshot_url',
        dataIndex: 'headshot_url',
        key: 'headshot_url',
        render: (image, row) => <a href={`/actor/detail?id=${row.name_id}`}>
            <img src={(image ? image : noActorPhoto)} alt={null} style={{height: '150px', marginLeft: '1vw'}}/>
        </a>

    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name, row) => <a href={`/actor/detail?id=${row.name_id}`} style={{color: "black"}}>{name}</a>
    },
    {
        title: 'Bio',
        dataIndex: 'bio',
        key: 'bio',
        render: (bio) => <p
            style={{maxHeight: "110px", overflow: 'hidden', paddingRight: '3em', textAlign: "justify"}}>{bio}</p>

    },
];

class ActorPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            namekeyword: '',
            movieResults: [],
            actorAmount: 0,
            pagination: null,
        }

        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
    }

    handleNameQueryChange(event) {
        this.setState({namekeyword: event.target.value})
    }

    componentDidMount() {

        getActor(1, this.state.namekeyword).then(res => {
            this.setState({movieResults: res.results})
        })
        getCountActor(this.state.namekeyword).then(res => {
            this.setState({actorAmount: res.results[0].countActorAmount})
        })

    }

    updateSearchResults() {
        getActor(1, this.state.namekeyword).then(res => {
            this.setState({movieResults: res.results})
        })
        getCountActor(this.state.namekeyword).then(res => {
            this.setState({actorAmount: res.results[0].countActorAmount})
        })
    }

    render() {

        return (
            <div class='page'>
                <MenuBar/>


                <div id='page-main' style={{marginTop: '25px'}}>


                    <div class='home-rank-movie' style={{marginTop: '5vh'}}>
                        <div>
                            <Form style={{width: '70vw', marginLeft: '0 auto', marginTop: '5vh'}}>
                                <Row>
                                    <Col flex={2}><FormGroup style={{width: '20vw', margin: '0 auto'}}>

                                        <FormInput style={{height: '2.5em'}} placeholder="Name Keyword"
                                                   value={this.state.namekeyword}
                                                   onChange={this.handleNameQueryChange}/>

                                    </FormGroup></Col>
                                    <Col flex={2}>
                                        <FormGroup style={{width: '2cm', height: '2.5em', paddingRight: '40vw'}}>
                                            <Button style={{width: '3cm', height: '2.5em'}}
                                                    onClick={this.updateSearchResults}>Search</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>

                        </div>
                        <h3>Actor</h3>

                        <Table dataSource={this.state.movieResults} columns={actorColumns} style={{padding: "10px"}}/>
                        <Pagination defaultCurrent={1} total={this.state.actorAmount} showSizeChanger={false}
                                    onChange={page => {
                                        getActor(page, this.state.namekeyword).then(res => {
                                            console.log(res.results)
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

export default ActorPage

