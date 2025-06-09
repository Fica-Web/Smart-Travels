import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
    code: String,
    name: String,
    city: String,
    country: String,
    state: String,
});

const Airport = mongoose.model('Airport', airportSchema);
export default Airport;
