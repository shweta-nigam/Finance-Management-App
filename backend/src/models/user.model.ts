import mongoose, { Schema, Model, Document } from "mongoose"
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string,
    username?: string,
    password?: string,
    email: string,
    avatar?: string,
    isVerified?: boolean,
    googleId?: string,
    isPlanActive: boolean,
    role: "User" | "Admin",
    verificationToken?: string,
    verificationTokenExpiry?: Date,
    accessToken?: string,
    accessTokenExpiry?: Date,
    refreshToken?: string,
    refreshTokenExpiry?: Date
    createdAt: string,
    updatedAt: string
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: function () {
            // Only require password if user didn't sign up via Google
            return !this.googleId;
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isPlanActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    avatar: {
        type: String,
        set: (val: string) => (val && val.trim() !== "" ? val : null)
    },
    googleId: {
        type: String
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    accessToken: String,
    accessTokenExpiry: Date,
    refreshToken: String,
    refreshTokenExpiry: Date,


},
    { timestamps: true }
)

userSchema.index({ username: 1 }, { unique: true, sparse: true })

//  Hash password before saving (only if password exists)
userSchema.pre("save", async function (next) {
    // only hash when password is new or modified
    if (!this.isModified("password") || !this.password) return next()

    try {
        const hashPassword = await bcrypt.hash(this.password, 10)
        this.password = hashPassword
        next()
    } catch (error) {
        console.error("Error while hashing password");
        next(error as Error)        // if error , it stop saving in document and pass the error to errorHandle middleware
    }
})


export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

