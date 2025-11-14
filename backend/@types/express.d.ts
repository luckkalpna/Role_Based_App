// backend/@types/express.d.ts
import { IUser } from '../src/models/User'; // Adjust path if your models are not directly under src/

// Augment the Request type in the Express namespace
declare namespace Express {
    export interface Request {
        user?: IUser; // Make sure this matches your User model interface
    }
}