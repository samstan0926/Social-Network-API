import { Schema, model, Types , type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[],
}
interface Reaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}
const reactionSchema = new Schema<Reaction>(


    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            length: [1, 280],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {   
        toJSON: {
            virtuals: true,
        },
        id: false,

    },
);
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            length: [1, 280],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [{
            type: String,
            required: true,

        }],
        reactions: [reactionSchema],
    },
    {   
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
        id: false,
        
    },
);
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;

