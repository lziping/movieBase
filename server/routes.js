//setup 
const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const { query } = require('express');


// connection details
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

//get movie for movie page
async function movies(req, res) {
    var year = req.query.year ? req.query.year : null
    var genre = req.query.genre ? req.query.genre : null
    var minrating = req.query.minrating ? req.query.minrating : null
    var page = req.query.page
    


    var whereYear = '';
    if (year) {
        whereYear = ` year = ${year} `
    }

    var whereGenre = '';
    if (genre) {
        whereGenre = ` genre LIKE '%${genre}%' `
    }

    var whereRating = '';
    if (minrating) {
        whereRating = ` iMDb_average_vote > ${minrating} `
    }

    var where = ''
    if(year||genre||minrating){
        where = `Where`
    }

    var and1 = ''
    if((whereYear&&whereGenre)||(whereYear&&whereRating)){
        and1 = `AND`
    }

    var and2 = ''
    if(whereGenre&&whereRating){
        and2 = `AND`
    }

    var queryString = `SELECT *
    FROM Movie JOIN Ratings R on Movie.iMDb_title_id = R.iMDb_title_id
    ${where} ${whereYear} ${and1} ${whereGenre} ${and2} ${whereRating}
    Order by iMDb_total_votes DESC, iMDb_average_vote DESC
    Limit 10 offset ${(page-1)*10}
     `

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function countMovies(req, res) {
    var year = req.query.year ? req.query.year : null
    var genre = req.query.genre ? req.query.genre : null
    var minrating = req.query.minrating ? req.query.minrating : null
     
    var whereYear = '';
    if (year) {
        whereYear = ` year = ${year} `
    }

    var whereGenre = '';
    if (genre) {
        whereGenre = ` genre LIKE '%${genre}%' `
    }

    var whereRating = '';
    if (minrating) {
        whereRating = ` iMDb_average_vote > ${minrating} `
    }

    var where = ''
    if(year||genre||minrating){
        where = `Where`
    }

    var and1 = ''
    if((whereYear&&whereGenre)||(whereYear&&whereRating)){
        and1 = `AND`
    }

    var and2 = ''
    if(whereGenre&&whereRating){
        and2 = `AND`
    }

    var queryString = `SELECT COUNT(Movie.iMDb_title_id) as countMovieAmount
    FROM Movie JOIN Ratings R on Movie.iMDb_title_id = R.iMDb_title_id
    ${where} ${whereYear} ${and1} ${whereGenre} ${and2} ${whereRating}
       `

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

//return 10top of selected genre
async function top10Genre(req, res) {
    var genre = req.params.genre 

    var queryString = `SELECT title, cover_url, M.iMDb_title_id, description,iMDb_average_vote
    FROM Movie M JOIN Ratings R on M.iMDb_title_id = R.iMDb_title_id
    WHERE genre Like '%${genre}%' AND iMDb_total_votes > 50000
    Order by iMDb_average_vote DESC
    LIMIT 10`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

//return 10top of selected language
async function top10Language(req, res) {
    var language = req.params.language 

    var queryString = `SELECT title, cover_url, M.iMDb_title_id, description,iMDb_average_vote
    FROM Movie M JOIN Ratings R on M.iMDb_title_id = R.iMDb_title_id
    WHERE language Like '${language}%' AND iMDb_total_votes > 5000
    Order by iMDb_average_vote DESC
    LIMIT 10`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}
//get movie detail
async function movieDetail(req, res) {
    var id = req.query.id ? req.query.id : null

    var queryString = `SELECT *
    FROM Movie M JOIN Ratings R on M.iMDb_title_id = R.iMDb_title_id
    Where M.iMDb_title_id Like '${id}'`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

//get actor casted in this movie
async function movieCast(req, res) {
    var id = req.query.id ? req.query.id : null

    var queryString = `SELECT name, Mc.name_id as name_id, headshot_url
    FROM Movie M JOIN Casts C on M.iMDb_title_id = C.iMDb_title_id
    JOIN Movie_cast Mc on C.name_id = Mc.name_id JOIN Cast_headshot Ch on Mc.name_id = Ch.name_id
    Where M.iMDb_title_id Like '${id}' 
    AND (C.category Like "actress" OR C.category Like "actor")`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

//get actor for actor page
async function allActor(req, res) {

    var namekeyword = req.query.namekeyword ? req.query.namekeyword : null
    var page = req.query.page 

    var whereNameKeyword = '';
    if (namekeyword) {
        whereNameKeyword = ` AND name like '%${namekeyword}%' `
    }

    var queryString = `SELECT DISTINCT(Mc.name_id),name,bio, headshot_url
    FROM (SELECT name_id, iMDb_title_id
          FROM Casts
          WHERE category = "actress" OR category = "actor") C
    JOIN Movie_cast Mc on Mc.name_id = C.name_id
    JOIN Cast_headshot Ch on Mc.name_id = Ch.name_id
    JOIN Movie M ON M.iMDb_title_id = C.iMDb_title_id
    WHERE M.year > 1990
    ${whereNameKeyword}
    GROUP BY Mc.name_id
    Limit 10 offset ${(page-1)*10}
    `

    
    connection.query(queryString, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    })
}

async function countActor(req, res) {

    var namekeyword = req.query.namekeyword ? req.query.namekeyword : null
 
    var whereNameKeyword = '';
    if (namekeyword) {
        whereNameKeyword = ` AND name like '%${namekeyword}%' `
    }

    var queryString = `SELECT COUNT(Mc.name_id) as countActorAmount
    FROM (SELECT name_id, iMDb_title_id
          FROM Casts
          WHERE category = "actress" OR category = "actor") C
    JOIN Movie_cast Mc on Mc.name_id = C.name_id
    JOIN Cast_headshot Ch on Mc.name_id = Ch.name_id
    JOIN Movie M ON M.iMDb_title_id = C.iMDb_title_id
    WHERE M.year > 1990
    ${whereNameKeyword}
      `


    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });

}


async function keywordMovie(req, res) {

    var word = req.params.word

    queryString = `SELECT DISTINCT M.iMDb_title_id, title, year, genre, director, cover_url, description  
        FROM Movie M JOIN Casts C on M.iMDb_title_id = C.iMDb_title_id 
        JOIN Movie_cast Mc on Mc.name_id = C.name_id JOIN Ratings R on C.iMDb_title_id = R.iMDb_title_id
        WHERE (title LIKE '%${word}%') OR (director LIKE '%${word}%') OR (genre LIKE '%${word}%') 
        OR (Mc.name LIKE '%${word}%') OR (year LIKE '%${word}%') OR (language LIKE '%${word}%')
        Order by year DESC
        `
        ;


    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }

    })

}

 async function keywordActor(req, res) {

    var name = req.params.name

    var queryString = `SELECT Mc.name_id,name, headshot_url,bio
    FROM Movie_cast Mc Join Cast_headshot Ch on Mc.name_id = Ch.name_id
    WHERE name = '${name}'`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });

}

async function actorDetail(req, res) {

    var id = req.params.id

    var queryString = `SELECT *
    FROM Casts C JOIN Movie_cast Mc on Mc.name_id = C.name_id
    JOIN Cast_headshot Ch on Mc.name_id = Ch.name_id
    WHERE Mc.name_id = '${id}'`

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });

}
/**
 * movies that selected actor casted in
 */ 
async function actorCasted(req, res) {

    var id = req.params.id

    var page = req.query.page ?req.query.page : null



    var queryString = `Select title, M.iMDb_title_id, cover_url, description
    FROM Movie M join Casts C on M.iMDb_title_id = C.iMDb_title_id JOIN Movie_cast Mc on Mc.name_id = C.name_id
    WHERE C.name_id LIKE '%${id}%'
    ORDER BY year DESC
    `
    

    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });

}
/**
 * return actors born on today
 */
async function actorBornToday(req,res){

    var date = req.params.date

    var queryString = `SELECT DISTINCT Mc.name_id, name, headshot_url
    FROM Movie_cast Mc JOIN Casts C on Mc.name_id = C.name_id
    JOIN Cast_headshot Ch on Mc.name_id = Ch.name_id
    WHERE date_of_birth LIKE "%-${date}" AND (category LIKE "actor" OR category LIKE "actress")
    ORDER BY date_of_birth DESC`

    
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });


}




async function addLikeMovie(req,res){

    var uid = req.query.uid
    var title_id = req.query.title_id

    var queryString = `INSERT INTO User_LikedMovie(uid, iMDb_title_id) VALUES ('${uid}','${title_id}');
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json(error.sqlMessage.split("'")[0])
        } else if (results) {

            res.json('Successful')
        }
    });
}
async function addLikeActor(req,res){

    var uid = req.query.uid
    var name_id = req.query.name_id

    var queryString = `INSERT INTO User_LikedActor(uid, name_id) VALUES ('${uid}','${name_id}');
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json(error.sqlMessage.split("'")[0])
        } else if (results) {

            res.json('Successful')
        }
    });
}

async function similarMovie(req,res){

    var language = req.query.language
    var genre = req.query.genre
    var director = req.query.director
    var page = req.query.page

    var queryString = `SELECT * from Movie 
    WHERE genre LIKE '%${genre}%' or director LIKE '%${director}%' or language LIKE '%${language}%'
    Limit 5 offset ${(page-1)*5};
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function userLikeMovie(req,res){

    var uid = req.query.uid ? req.query.uid : null

    var queryString = `SELECT * from User_LikedMovie U join MOVIEBASE.Movie M on M.iMDb_title_id = U.iMDb_title_id
    WHERE uid = "${uid}"
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function userLikeActor(req,res){

    var uid = req.query.uid ? req.query.uid : null

    var queryString = `SELECT * from User_LikedActor U join MOVIEBASE.Movie_cast M on M.name_id = U.name_id 
    join Cast_headshot Ch on M.name_id = Ch.name_id
    WHERE uid = "${uid}"
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function home100Movie(req,res){

    var page = req.query.page 

    var queryString = `SELECT * FROM Movie M join Ratings R on M.iMDb_title_id = R.iMDb_title_id
    WHERE iMDb_total_votes > 500000
    ORDER BY iMDb_average_vote DESC
    LIMIT 10 OFFSET ${(page-1)*10}
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function mostVotedMovie(req,res){



    var queryString = `SELECT * from Ratings R join Movie M on M.iMDb_title_id = R.iMDb_title_id 
    ORDER BY iMDb_total_votes DESC LIMIT 1
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}

async function movieRecommendForUser(req,res){

    var uid = req.query.uid

    var randomPage = parseInt(Math.random() * (100 - 2) + 2)

    var queryString = `SELECT * FROM Movie M JOIN MOVIEBASE.Ratings R on M.iMDb_title_id = R.iMDb_title_id
    WHERE genre = (SELECT MAX(genre) from User_LikedMovie U JOIN MOVIEBASE.Movie M on M.iMDb_title_id = U.iMDb_title_id
    Where uid = "${uid}") ORDER BY iMDb_average_vote DESC
    LIMIT 10 OFFSET ${randomPage}
    `
    connection.query(queryString, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {

            res.json({ results: results })
        }
    });
}




module.exports = {
    keywordMovie,
    keywordActor,
    actorDetail,
    movies,movieDetail,allActor,movieCast,top10Genre,top10Language,
    actorCasted,actorBornToday,addLikeMovie,addLikeActor,
    similarMovie,home100Movie,countMovies,countActor,userLikeMovie,mostVotedMovie,userLikeActor,movieRecommendForUser

}
