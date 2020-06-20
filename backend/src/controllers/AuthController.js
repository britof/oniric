const config = require("../config/auth.config");
const Profile = require("../database/models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    async signup(req, res) {
        const profile = new Profile({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email
        });
    
        await profile.save((err, profile) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            return res.json(profile);
        });
    },

    signin(req, res) {
        Profile
            .findOne({username: req.body.username})
            .exec((err, profile) => {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }
    
                if(!profile) {
                    return res.status(404).send({message: "Username not found!"});
                }
    
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    profile.password
                );
    
                if(!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid password!"
                    });
                }
    
                var token = jwt.sign({id: profile._id}, config.secret, {
                    expiresIn: 86400 //24h
                });
    
                return res.status(200).send({ 
                    id: profile._id,
                    username: profile.username,
                    auth: true,
                    accessToken: token
                });
            });
    }
}
