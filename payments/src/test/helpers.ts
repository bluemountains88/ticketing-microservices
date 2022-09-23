import mongoose from 'mongoose';

export const newId = () => new mongoose.Types.ObjectId().toHexString();