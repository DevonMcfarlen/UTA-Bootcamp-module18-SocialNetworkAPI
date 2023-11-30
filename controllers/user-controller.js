const {User} = require('../models');

module.exports = {
    async getAllUsers(req, res){
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch(err) {
            res.status(500),json(err);
        }
    },
    async getSingleUser(req, res){
        try {
          const user = await User.findOne( { _id: req.params._id } )

          if(!user){
            return res.status(404).json( { message: 'No user with this id!' } )
          }
          res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res){
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err){
            res.status(500).json(err);
        }
    },
    async updateUser(req, res){
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!updatedUser){
                res.status(404).json( { message: 'No user found with this id!' } );
            }
            res.json(user); 
        } catch(err){
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res){
        try {
            const toDelete = await User.findOneAndDelete( { _id: req.params.userId } );
           
            if(!toDelete){
                return res.status(404).json( { message: 'No user found with this id!' } )
            }
            res.json( { message: 'User deleted successfully!' } );
        } catch(err){
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!newFriend) {
                return res
                .status(404)
                .json( { message: 'No user found with this ID!' } );
        }

        res.json(newFriend);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const toRemove = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!toRemove) {
                return res
                .status(404)
                .json( { message: 'No user found with that ID!' } );
            }

            res.json( { message: 'Friend removed successfully!' } );
        } catch (err) {
        res.status(500).json(err);
        }
    },
}