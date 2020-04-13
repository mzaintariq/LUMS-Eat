const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
    RestaurantID: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    address: {type: String, required: true, unique: false},
    number: {type: Number, required: true, unique: true},
    category: {type: String, required: true, unique: false},
    description: {type: String, required: true, unique: false},
    openingtime: {type: Date, required: true, unique: false},
    closingtime: {type: Date, required: true, unique: false},
}, {
    timestamps: true,
});


const Restaurants = mongoose.model('Restaurants', restaurantsSchema);
// Restaurants.ensureIndexes()


module.exports = Restaurants;