const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    ingredients: [String],
    category: String,
});

module.exports = mongoose.model('Meal', mealSchema);
