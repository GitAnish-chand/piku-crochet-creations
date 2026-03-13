const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();

        res.json({
            totalProducts,
            totalCategories
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error while fetching statistics' });
    }
};
