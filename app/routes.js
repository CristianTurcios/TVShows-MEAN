module.exports = function(app) 
{
    var TvShow = require('./models/tvshows.js');

    // api ---------------------------------------------------------------------
    // get all TvShow
    app.get('/api/getListTvShows', function(req, res) {

        // use mongoose to get all TvShows in the database
        TvShow.find(function(err, allTvShows) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (!err)
                res.json(allTvShows); // return all  in JSON format  
            else
                res.send("Error");
        });
    });

    // get TvShowById
    app.get('/api/getListTvShows/:TvShowId', function (req, res) {
        TvShow.findById(req.params.TvShowId, function (err, tvshow) {
            if (!err)
                res.send(tvshow);
            else 
                res.send("Error");
        });
    });

    // create todo and send back all TvShow after creation
    app.post('/api/saveTvShows', function(req, res) {        
        var tvshow = new TvShow({
            title:   req.body.title,
            year:    req.body.year,
            country: req.body.country,
            poster:  req.body.poster,
            seasons: req.body.seasons,
            genre:   req.body.genre,
            summary: req.body.summary
        });

        tvshow.save(function (err) {
            if (!err) {
                console.log('Created');
                res.send("Success");
            } else {
                console.log('ERROR: ' + err);
                res.send("Error");
            }
        });
    });

    //PUT - Update a register already exists
    app.put('/api/updateTvShows/:TvShowId', function (req, res) {
        TvShow.findById(req.params.TvShowId, function (err, tvshow) {
            tvshow.title =   req.body.title;
            tvshow.year =    req.body.year;
            tvshow.country = req.body.country;
            tvshow.poster =  req.body.poster;
            tvshow.seasons = req.body.seasons;
            tvshow.genre =   req.body.genre;
            tvshow.summary = req.body.summary;

            tvshow.save(function (err) {
                if (!err) {
                    console.log('Updated');
                    res.send(tvshow);
                } else {
                    console.log('ERROR: ' + err);
                    res.send("Error");
                }

            });
        });
    });

    app.delete('/api/deleteListTvShows/:TvShowId', function (req, res) {
        TvShow.findById(req.params.TvShowId, function (err, tvshow) {
            tvshow.remove(function (err) {
                if (!err) {
                    console.log('Removed');
                    res.send("Success");
                } else {
                    console.log('ERROR: ' + err);
                    res.send("Error");
                }
            });
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    

    //Esta es otra forma de definir las rutas
    /*
    
        //DELETE - Delete a TVShow with specified ID
    deleteTVShow = function (req, res) {
        TVShow.findById(req.params.id, function (err, tvshow) {
            tvshow.remove(function (err) {
                if (!err) {
                    console.log('Removed');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
    }
    //Link routes and functions
    app.get('/tvshows', findAllTVShows);
    app.get('/tvshow/:id', findById);
    app.post('/tvshow', addTVShow);
    app.put('/tvshow/:id', updateTVShow);
    app.delete('/tvshow/:id', deleteTVShow);*/
};