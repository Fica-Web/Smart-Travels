import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        serviceType: {
            type: String,
            required: true,
            enum: ['flight', 'hotel', 'visa', 'destination', 'insurance', ],
        },

        // Optional fields depending on serviceType
        flightDetails: {
            from: String,
            to: String,
            departureDate: Date,
            // returnDate: Date,
            // passengers: Number,
        },
        hotelDetails: {
            location: String,
            checkInDate: Date,
            checkOutDate: Date,
            guests: Number,
        },
        visaDetails: {
            nationality: String,
            destinationCountry: String,
            // travelDate: Date,
        },
        destinationDetails: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Destination',
            },
            title: String,
            country: String,
        },
        insuranceDetails: {
            travelDuration: String,
            coverageType: String,
        },

        location: {
            type: String,
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'converted', 'ignored'],
            default: 'new',
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Inquiry', inquirySchema);