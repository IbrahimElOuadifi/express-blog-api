import mongose from 'mongoose';

const saveSchema = mongose.Schema({
    fromUser: String,
    toPost: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Save = mongose.model('Save', saveSchema);

export default Save;