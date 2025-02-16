import { Request, Response } from 'express';

import { User, Thought } from '../models/index.js';


export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const students = await Thought.find();



        res.json(students);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json({
                thought});
        } else {
            res.status(404).json({
                message: 'thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};



export const createThought = async (req: Request, res: Response) => {
    try {

        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );
        
        if (!user) {
            return res
                .status(404)
                .json({ message: 'thought created but user found with that ID :(' });
        }
        return res.json(thought);


    } catch (err) {
        return res.status(500).json(err);
    }
}
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )

        if (!thought) {
            res.status(400).json({message: 'No Thought with this ID.' });
        } else {
            res.json(thought);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }


        return res.json({ message: 'thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


export const addReaction = async (req: Request, res: Response) => {

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}


export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}
