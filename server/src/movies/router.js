import MovieController from './controller';

const router = require('express').Router();

router.get('/all', MovieController.getAllMovies)

export default router; 