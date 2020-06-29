import UserController from './controller';

const router = require('express').Router();

router.get('/profile', (req, res)=>{
    // let data = JSON.stringify(req.res);
    // console.log("req.res : " + data)
    res.send(req.user);
})

router.post('/profile', UserController.updateProfile)

export default router;