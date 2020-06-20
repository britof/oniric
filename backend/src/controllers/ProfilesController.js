const Profile = require('../database/models/profile');
const profile = require('../database/models/profile');

module.exports = {

    async delete(req, res) {
        const deleted = await Profile.deleteOne({_id: req.body._id});
        return deleted;
    },

    //get someone's whitelist
    async whitelist(req, res) {
        const profileId = req.profileId;
        await Profile.findById(profileId, (err, profile) => {
            if(err) {
                res.status(500).send({error: err})
                return;
            }
            if(profile){
                const whitelist = profile.whitelist;
                return res.status(200).json(whitelist);
            }
        });
        res.status(500).send({message: "Could not retrieve whitelist!"});
        return;
        
    },

    //add profile to whitelist
    async addP_to_whitelist(req, res) {
        const newId = req.body.id;
        const profileId = req.profileId;

        //if newId already is in whitelist
        const profile = await Profile.findById(profileId);
        const whitelist = profile.whitelist;
        if(whitelist.includes(newId))
        {
            console.log(whitelist);
            return res.status(200).send({message: "Id is already in whitelist."})
        }

        var updated = await Profile.findById(profileId);
        updated.whitelist.push(newId);
        const U = await Profile.findByIdAndUpdate(profileId, updated, (err, updt) => {
            if(err) {
                return res.status(500).send({error: err})
            }
            return res.status(200).send({U,updt})
        }); 
    }
}