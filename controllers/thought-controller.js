const {Thought} = require('../models');

module.exports = {
    async getAllThoughts(req, res){
        try{
            const allThoughts = await Thought.find();
            res.json(allThoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne( { _id: req.params.thoughtId } )

            if(!thought){
                return res.status(404).json( { message: 'No thought found with this id!' } )
            }
            res.json(thought);
        }catch (err){
            res.status(500).json(err);
        }
    },
    async createThought(req, res){
        try{
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async updateThought(req, res){
        try{
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set:req.body },
                { runValidators: true, new: true }
            );
            if(!updatedThought){
                res.status(404).json( { message:'No thought found with this id!' } );
            }
            res.json(updatedThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res){
        try{
            const toDelete = await Thought.findOneAndDelete( { _id: req.params.thoughtId } );
           
            if(!toDelete){
                return res.status(404).json( { message: 'No thought found with this ID!' } )
            }
            res.json( { message: 'Thought deleted successfully!' } );
        }catch(err){
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

        if (!newReaction) {
            return res
            .status(404)
            .json( { message: 'No reaction found with this ID!' } );
        }

        res.json(newReaction);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
        const toDelete = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!toDelete) {
            return res
            .status(404)
            .json( { message: 'No reaction found with this ID!' } );
        }

        res.json( { message: 'Reaction deleted successfully!' } );
        } catch (err) {
        res.status(500).json(err);
        }
    },
};