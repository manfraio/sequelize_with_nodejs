const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('../utils/asyncHandler');

exports.createCategory = asyncHandler(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

    return res.status(201).json(newCategory);
})

exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.findAll();

    return res.status(200).json(categories)
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    category.name = req.body.name;

    const updatedCategory = await category.save();

    return res.status(200).json(updatedCategory);
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const productCount = await Product.count({
        where: {
            categoryId: category.id
        }
    })

    if (productCount) {
        return res.status(409).json({ error: `Category id is being used in ${productCount} product(s)` });
    }

    await category.destroy();

    return res.status(204).send();
})