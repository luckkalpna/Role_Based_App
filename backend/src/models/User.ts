// backend/models/User.ts
import mongoose, { Document, Schema, Types } from 'mongoose'; // Import Types
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId; // <--- Add this line to explicitly type _id
    name: string;
    email: string;
    password: string;
    role: 'User' | 'Admin';
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['User', 'Admin'], default: 'User' },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;