const Meal = require('../models/Meal');
const modelName = 'Meal';

const addMeals = async (req, res) => {
    const { name, price, image, ingredients, category } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        const duplicate = await Meal.findOne({ name }).exec();
        if (duplicate) {
            return res.status(400).json({ message: `${modelName} Already Exists!` });
        }

        const result = await Meal.create({ name, price, image, ingredients, category });
        res.status(201).json({ success: `New ${modelName} Created!`, data: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received DELETE request for ID:', id);
        const meal = await Meal.findById(id);
        if (!meal) {
            console.log('Meal not found');
            return res.status(404).json({ message: `${modelName} not found` });
        }
        await Meal.deleteOne({ _id: id });
        console.log('Meal deleted');
        res.status(200).json({ success: `${modelName} deleted` });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
};

const updateMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, image, ingredients, category } = req.body;
        const meal = await Meal.findById(id);

        if (!meal) {
            return res.status(404).json({ message: `${modelName} not found` });
        }

        meal.name = name ?? meal.name;
        meal.price = price ?? meal.price;
        meal.image = image ?? meal.image;
        meal.ingredients = ingredients ?? meal.ingredients;
        meal.category = category ?? meal.category;

        const updatedMeal = await meal.save();
        res.status(200).json({ success: `${modelName} updated`, data: updatedMeal });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addMeals, getMeals, deleteMeal, updateMeal };
