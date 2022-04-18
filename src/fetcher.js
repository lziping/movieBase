import config from './config.json'


const getMovies = async (page, genre, year, minrating) => {

    var res = await fetch(`http://${config.server_host}:${config.server_port}/movies?genre=${genre}&year=${year}&minrating=${minrating}&page=${page}`, {
        method: 'GET',
    })

    return res.json()
}

const getCountMovie = async (genre, year, minrating) => {

    var res = await fetch(`http://${config.server_host}:${config.server_port}/movies/count?genre=${genre}&year=${year}&minrating=${minrating}`, {
        method: 'GET',
    })

    return res.json()
}

const getTop10Genre = async (genre) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top10/genre/${genre}`, {
        method: 'GET',
    })
    return res.json()
}
const getTop10Language = async (language) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top10/language/${language}`, {
        method: 'GET',
    })
    return res.json()
}
const getMovieDetail = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie/detail?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMovieCasts = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie/casts?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getActor = async (page, namekeyword) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/actor?namekeyword=${namekeyword}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getCountActor = async (namekeyword) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/actor/count?namekeyword=${namekeyword}`, {
        method: 'GET',
    })
    return res.json()
}

const getActorDetail = async (id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/actor/${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getActorCasted = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/actor/casted/${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getSearchMovie = async (word, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/movie/${word}`, {
        method: 'GET',
    })
    return res.json()
}

const getSearchActor = async (word, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/actor/${word}`, {
        method: 'GET',
    })
    return res.json()
}


const getActorBornToday = async (date, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/actor/born/${date}`, {
        method: 'GET',
    })
    return res.json()
}

const getSimilarMovie = async (genre, language, director, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie/detail/similar/?genre=${genre}&language=${language}&director=${director}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}


const getUserLikedMovie = async (uid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/movie/liked/?uid=${uid}`, {
        method: 'GET',
    })
    return res.json()
}

const getUserLikedActor = async (uid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/actor/liked/?uid=${uid}`, {
        method: 'GET',
    })
    return res.json()
}


const addLikeMovie = async (uid, titleId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/movie/add/?uid=${uid}&title_id=${titleId}`, {
        method: 'GET',
    })
    return res.json()
}

const addLikeActor = async (uid, nameId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/actor/add/?uid=${uid}&name_id=${nameId}`, {
        method: 'GET',
    })
    return res.json()
}


const getHome100 = async (page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie/home100?page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getMostVotedMovie = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie/mostvoted`, {
        method: 'GET',
    })
    return res.json()
}

const getMovieRecommendForUser = async (uid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/movie/recommend/?uid=${uid}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getMovies, getMovieDetail, getActor, getMovieCasts, getTop10Genre, getTop10Language,
    getActorDetail, getActorCasted, getSearchMovie, getSearchActor, getActorBornToday, getMovieRecommendForUser,
    getUserLikedMovie, getUserLikedActor, addLikeMovie, addLikeActor,
    getSimilarMovie, getHome100, getCountMovie, getCountActor, getMostVotedMovie

}