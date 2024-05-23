import Product from "../models/Product.js";

const createProduct = product => Product.create(product);

const getProducts = (page = 1, limit = 10, sort, category, minPrice, maxPrice, name) => {
    limit = Math.min(limit, 10);

    const matchStage = {};
    const sortStage = {};

    // Apply category filter if provided
    if (category) matchStage.category = category;

    // Apply price filters if provided
    if ((minPrice !== undefined && !isNaN(minPrice)) || (maxPrice !== undefined && !isNaN(maxPrice))) {
        matchStage.price = {};
        if (minPrice !== undefined) matchStage.price.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined) matchStage.price.$lte = parseFloat(maxPrice);
    }

    // Apply search term if provided
    if (name) {
        matchStage.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    // Apply sorting
    if (sort === 'asc') sortStage.price = 1;
    else if (sort === 'desc') sortStage.price = -1;
    else sortStage.createdAt = -1; // Default sorting by createdAt in descending order

    const aggregationPipeline = [
        { $match: matchStage },
        { $sort: sortStage },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $project: {
                images: {
                    $map: {
                        input: "$images",
                        as: "image",
                        in: { $concat: [`${process.env.API_BASEURL}/products/`, "$$image"] }
                    }
                },
                name: 1,
                description: 1,
                price: 1
            }
        }
    ];

    // Execute aggregation pipeline
    return Promise.all([
        Product.aggregate(aggregationPipeline),
        Product.countDocuments(matchStage)
    ]).then(([results, total]) => {
        const pagination = {
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            totalItems: total
        };

        return { pagination, data: results };
    });
};


const getProduct = id => Product.findById(id);

export default {
    createProduct,
    getProducts,
    getProduct
}