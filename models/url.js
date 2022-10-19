import mongoose from 'mongoose';

const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    }
});

const Url = mongoose.model('url', urlSchema);

export default Url;