import { Schema, model, type Document } from 'mongoose';

interface Username extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const userSchema = new Schema<Username>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',

        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {   
        toJSON: {
            virtuals: true,
        },
        id: false,
        
    },
);
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model<Username>('User', userSchema);

export default User;

