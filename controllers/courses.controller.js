const Course = require('../models/Course')
const CourseCategory = require('../models/CourseCategory')
const CoursePrice = require('../models/coursePrices')
const Price = require('../models/Price')
const Category = require('../models/category')



exports.getById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const course = await Course.findOne({
        include: [
            {
                model: CourseCategory,
                include: [{ model: Category }]
            },
            {
                model: CoursePrice,
                include: [{ model: Price }]
            }
        ],
        where: { id }
    });
    if (!course) {
        return res.status(404).send({
            message: `No course found with the id ${id}`,
        });
    }

    return res.status(200).send(course);
};

exports.getAll = async (req, res) => {
    const courses = await Course.findAll();

    if (!courses) {
        return res.status(404).send({
            message: `No product found.`,
        });
    }

    return res.status(200).send(courses);
};

exports.create = async (req, res) => {
    console.log(req.body);
    const { name, photo, description, content, ownerId } = req.body;
    // Checks if the product name exists. parentId can be null if the product is a parent product.
    if (!name || !description || !ownerId) {
        return res.status(400).send({
            message: "You need to fill in the course name.",
        });
    }

    // Checks if the product name exists
    let courseExists = await Course.findOne({
        where: { name }
    });
    if (courseExists) return res.status(400).send({ message: `A course named ${name} already exists!` });

    // Create product
    try {

        let newCourse = await Course.create({
            name,
            photo,
            description,
            content,
            ownerId
        });
        return res.status(201).send(newCourse);
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.update = async (req, res) => {
    const { name, photo, description, content, ownerId } = req.body;
    const { id } = req.params;

    const course = await Course.findOne({ where: { id } });

    if (!course) {
        return res.status(400).send({
            message: `No course exists with the id ${id}`,
        });
    }

    try {
        if (name) {
            course.name = name;
        }
        if (photo) {
            course.photo = photo;
        }
        if (description) {
            course.description = description;
        }
        if (content) {
            course.content = content;
        }
        if (ownerId) {
            course.ownerId = ownerId;
        }
        course.save();
        return res.status(200).send({
            message: `Course ${name} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Please provide the ID of the course you are trying to delete.` });


    const course = await Course.findOne({ where: { id } });

    if (!course) {
        return res.status(400).send({ message: `No course exists with the id ${id}` });
    }

    try {
        await course.destroy();
        return res.status(204).send({ message: `Course ${id} has been deleted.` });
    } catch (err) {
        return res.status(500).send({
            message: `Error : ${err.message}`,
        });
    }
};