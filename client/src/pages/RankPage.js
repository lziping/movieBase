import React from 'react';
import {
    List,
    Divider,
    Popover,
    Tabs
} from 'antd'

import MenuBar from '../components/MenuBar';
import {getTop10Genre, getTop10Language} from '../fetcher'
import './app.css'
import noActorPhoto from "../image/noActorPhoto.jpeg"


const {TabPane} = Tabs;


class RankPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dramaResults: [],
            actionResults: [],
            crimeResults: [],
            historyResults: [],
            mysteryResults: [],
            adventureResults: [],
            westernResults: [],
            fantasyResults: [],
            comedyResults: [],
            romanceResults: [],
            familyResults: [],
            warResults: [],
            biographyResults: [],
            sportResults: [],
            sciFiResults: [],
            mandarinResults: [],
            cantoneseResults: [],
            englishResults: [],
            frenchResults: [],
            spanishResults: [],
            japaneseResults: [],
            germanResults: [],
            italianResults: [],
            russianResults: [],
            dutchResults: [],
            swedishResults: [],
            danishResults: [],
            pagination: null,

            key: "action",
            genreResults: [],
            languageResults: []
        }
    }


    componentDidMount() {

        getTop10Genre("action").then(res => {
            this.setState({genreResults: res.results})
        })

        getTop10Language("english").then(res => {
            this.setState({languageResults: res.results})
        })

    }


    render() {

        function movieList(results, type) {
            return <div class='home-rank-movie'>
                <Divider orientation="left">Top 10 {type} Movies</Divider>
                <List
                    size="small"
                    grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5,}}
                    dataSource={results}
                    renderItem={row =>
                        <Popover content={row.description}>
                            <div id='colum' style={{maxWidth: "10cm"}}>
                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>
                                    <img src={row.cover_url ? row.cover_url : noActorPhoto} alt={null}
                                         style={{height: '150px', marginLeft: '1vw', maxWidth: '100px'}}/></a>
                            </div>
                            <div id="title">
                                <a href={`/movie/detail?id=${row.iMDb_title_id}`}>{row.title}</a>
                            </div>
                        </Popover>}
                /></div>
        }

        return (
            <div class='page'>
                <MenuBar/>

                {/*genre*/}
                <div class="sectionHeader">
                    <h2>Genre</h2>
                </div>
                <div id='page-main' style={{borderRadius: "0px 0px 25px 25px"}}>
                    <Tabs type="card" animated defaultActiveKey="Action" onTabClick={activeKey => {
                        console.log(activeKey)
                        getTop10Genre(activeKey).then(res => {
                            this.setState({genreResults: res.results})
                        })

                    }} style={{margin: '10px'}}>

                        <TabPane tab="Action" key="Action">
                            {movieList(this.state.genreResults, "Action")}
                        </TabPane>
                        <TabPane tab="Comedy" key="Comedy">
                            {movieList(this.state.genreResults, "Comedy")}
                        </TabPane>
                        <TabPane tab="Fantasy" key="Fantasy">
                            {movieList(this.state.genreResults, "Fantasy")}
                        </TabPane>
                        <TabPane tab="Sci-Fi" key="Sci-Fi">
                            {movieList(this.state.genreResults, "Sci-Fi")}
                        </TabPane>
                        <TabPane tab="Drama" key="Drama">
                            {movieList(this.state.genreResults, "Drama")}
                        </TabPane>
                        <TabPane tab="Crime" key="Crime">
                            {movieList(this.state.genreResults, "Crime")}
                        </TabPane>
                        <TabPane tab="History" key="History">
                            {movieList(this.state.genreResults, "History")}
                        </TabPane>
                        <TabPane tab="Adventrue" key="Adventrue">
                            {movieList(this.state.genreResults, "Adventrue")}
                        </TabPane>
                        <TabPane tab="Mystery" key="Mystery">
                            {movieList(this.state.genreResults, "Mystery")}
                        </TabPane>
                        <TabPane tab="Romance" key="Romance">
                            {movieList(this.state.genreResults, "Romance")}
                        </TabPane>
                        <TabPane tab="Western" key="Western">
                            {movieList(this.state.genreResults, "Western")}
                        </TabPane>
                        <TabPane tab="Family" key="Family">
                            {movieList(this.state.genreResults, "Family")}
                        </TabPane>
                        <TabPane tab="War" key="War">
                            {movieList(this.state.genreResults, "War")}
                        </TabPane>
                        <TabPane tab="Biography" key="Biography">
                            {movieList(this.state.genreResults, "Biography")}
                        </TabPane>
                        <TabPane tab="Sport" key="Sport">
                            {movieList(this.state.genreResults, "Sport")}
                        </TabPane>
                    </Tabs>
                </div>

                {/*language*/}
                <div class="sectionHeader">
                    <h2>Language</h2>
                </div>
                <div id='page-main' style={{borderRadius: "0px 0px 25px 25px"}}>
                    <Tabs type="card" animated defaultActiveKey="Action" onTabClick={activeKey => {
                        console.log(activeKey)
                        getTop10Language(activeKey).then(res => {
                            this.setState({languageResults: res.results})
                        })

                    }} style={{margin: '10px'}}>

                        <TabPane tab="English" key="English">
                            {movieList(this.state.languageResults, "English")}
                        </TabPane>
                        <TabPane tab="Mandarin" key="Mandarin">
                            {movieList(this.state.languageResults, "Mandarin")}
                        </TabPane>
                        <TabPane tab="Cantonese" key="Cantonese">
                            {movieList(this.state.languageResults, "Cantonese")}
                        </TabPane>
                        <TabPane tab="French" key="French">
                            {movieList(this.state.languageResults, "French")}
                        </TabPane>
                        <TabPane tab="Spanish" key="Spanish">
                            {movieList(this.state.languageResults, "Spanish")}
                        </TabPane>
                        <TabPane tab="Japanese" key="Japanese">
                            {movieList(this.state.languageResults, "Japanese")}
                        </TabPane>
                        <TabPane tab="German" key="German">
                            {movieList(this.state.languageResults, "German")}
                        </TabPane>
                        <TabPane tab="Italian" key="Italian">
                            {movieList(this.state.languageResults, "Italian")}
                        </TabPane>
                        <TabPane tab="Russian" key="Russian">
                            {movieList(this.state.languageResults, "Russian")}
                        </TabPane>
                        <TabPane tab="Dutch" key="Dutch">
                            {movieList(this.state.languageResults, "Dutch")}
                        </TabPane>
                        <TabPane tab="Swedish" key="Swedish">
                            {movieList(this.state.languageResults, "Swedish")}
                        </TabPane>
                        <TabPane tab="Danish" key="Danish">
                            {movieList(this.state.languageResults, "Danish")}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }

}

export default RankPage

