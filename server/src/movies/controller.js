import MovieModel from './model';

export default {
    getAllMovies: (req, res, next) => {    
            MovieModel.find({})
            .then((data) => {
                console.log("data :" + data);
             res.statusCode = 200;
             res.json(data);
            }
             )
            .catch(next)
    }   
}