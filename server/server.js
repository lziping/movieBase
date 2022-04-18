const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');
var mcache = require('memory-cache');

const app = express();
app.use(cors({
    origin: '*'
}));

var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }

app.get('/movies',cache(300), routes.movies)

app.get('/movies/count',cache(300), routes.countMovies)

app.get('/movie/detail/similar/',routes.similarMovie)

app.get('/movie/home100',cache(300),routes.home100Movie)

app.get('/movie/mostvoted',routes.mostVotedMovie)

app.get('/movie/detail', routes.movieDetail)

app.get('/top10/genre/:genre',cache(300), routes.top10Genre)

app.get('/top10/language/:language', cache(300),routes.top10Language)

app.get('/movie/casts', routes.movieCast)

app.get('/actor', cache(300), routes.allActor) 

app.get('/actor/count',cache(300),routes.countActor)

app.get('/actor/casted/:id',routes.actorCasted)

app.get('/actor/born/:date',cache(300),routes.actorBornToday)

app.get('/actor/:id', routes.actorDetail)

app.get('/search/movie/:word', routes.keywordMovie)

app.get('/search/actor/:name', routes.keywordActor)
 
app.get('/user/movie/add/',routes.addLikeMovie)

app.get('/user/actor/add/',routes.addLikeActor)

app.get('/user/movie/liked/',routes.userLikeMovie)

app.get('/user/actor/liked/',routes.userLikeActor)

app.get('/user/movie/recommend/',routes.movieRecommendForUser)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
