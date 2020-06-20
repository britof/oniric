const Dream = require("../database/models/dream");
const Profile = require("../database/models/profile");

module.exports = {

    async read_public(req, res) {
        //dreams ordered from de newest to the oldest
        const dreams = await Dream.find({private: 2}).sort("-createdAt");
        return res.json(dreams);
    },

    async addD_to_whitelist(req, res) {

        const dream = await Dream.update({_id: req.body.dreamId}, {$set: {"private": 1}});
        if(!dream) {
            res.status(500).send({message: "Could not update dream privacy."});
            return;
        }
        res.status(200).send(dream);
        return;
    },

    async read_whitelisted(req, res) {
        const dreamer = req.body.dreamer;
        const profileId = req.profileId;
        const p = await Profile.find({username: dreamer});
        const authorization = p[0].whitelist.find(id => id === profileId);
        
        if(!authorization) {
            return res.json("You are not in the WhiteList!");
        }
        const dreams = await Dream.find({private: 1}).sort("-createdAt");
        return res.json(dreams);
    },

    //dreams ordered from de newest to the oldest
    async read_private(req, res) {
        const profileId = req.profileId;
        const Dreamer = await Profile.findById(profileId);
        const dreams = await Dream.find({dreamer: Dreamer.username}).sort("-createdAt");
        return res.json(dreams); 
    },

    //create a dream given a body
    async create(req, res) {
        const dream = await Dream.create(req.body);
        return res.json(dream);
    },


    async delete(req, res) {
        const deleted = await Dream.deleteOne({_id: req.body.dreamId});
        return res.json(deleted);
    }
}