import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
    name: String,
    city: String,
    country: String,
    iata: String,
}, {
    timestamps: true
});

const Airport = mongoose.model('Airport', airportSchema);
export default Airport;
