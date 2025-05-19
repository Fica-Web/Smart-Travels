import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        phone: { 
            type: String 
        },
        isVerified: { 
            type: Boolean, 
            default: false 
        },
        fullName: { 
            type: String 
        },
        dob: { 
            type: Date 
        },
        nationality: { 
            type: String 
        },
        address: {
            street: { 
                type: String 
            },
            city: { 
                type: String 
            },
            state: { 
                type: String 
            },
            country: { 
                type: String 
            },
            postalCode: { 
                type: String 
            },
        },
        bookings: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Booking' 
            }
        ],
        resetPasswordToken: { 
            type: String 
        },
        resetPasswordExpires: { 
            type: Date 
        },
        otpHash: String,
        otpExpires: Date,
    }, 
    { 
        timestamps: true 
    }
);

export default mongoose.model('User', userSchema);