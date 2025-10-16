import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    adddress_line: {
        type: String,
        required: true, 
        default: ""
    },
    city: {
        type: String,
        required: true, 
        default: ""
    },
    state: {
        type: String,
        required: true, 
        default: ""
    },
    country: {
        type: String,
        required: true, 
        default: ""
    },
    pincode: {
        type: String,
        required: true, 
        default: ""
    },
    phone_number: {
        type: Number,
        required: true, 
        default: ""
    },
    is_default: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: Boolean,
        default: true   
    }
}, {
    timestamps: true,
});

const AddressModel = mongoose.model("Address", addressSchema);  

export default AddressModel;