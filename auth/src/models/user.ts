import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
// Define the interface for the User document
export interface IUser extends Document {
    email: string;
    password: string;
}

// Define the User schema
const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(_, ret){
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        },
    }  // changed _id to id for consistency, removed password and version key property from response
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.set("password", hash);
    }
    done();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
