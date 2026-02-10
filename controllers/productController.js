const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require('../utils/asyncHandler');

exports.createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    return res.status(201).json(newProduct);
})

exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll({
        attributes: { exclude: ['categoryId'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }
        ]
    });

    return res.status(200).json(products);
})

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id, {
        attributes: { exclude: ['categoryId'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }
        ]
    });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }

    return res.status(200).json(product);    
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await product.update(req.body);

    return res.status(200).json(updatedProduct);
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    return res.status(204).send();    
})

exports.getProductsByCategoryId = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    if (!await Category.findByPk(categoryId)) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const products = await Product.findAll({
        where: { categoryId },
        attributes: { exclude: ['categoryId'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }
        ]        
    })

    return res.status(200).json(products);
})