const velo = require('../model/velo.model.js');

// Create and Save a new velo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.Name) {
        return res.status(400).send({
            message: "velo Name can not be empty"
        });
    }
    // Create a velo
    const AVelo = new velo({
        Name: req.body.Name,
        Brand: req.body.Brand,
        Accessories: req.body.Accessories,
        stock: req.body.stock ,
        isElectric: req.body.isElectric,
        releaseDate: req.body.releaseDate
    });

    // Save velo in the database
    AVelo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the velo."
        });
    });
};


// Retrieve and return all velos from the database.
exports.findAll = (req, res) => {
    velo.find()
        .then(velo => {
            res.send(velo);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving velos."
        });
    });
};


// Find a single note with a veloid
exports.findOne = (req, res) => {
    velo.findById(req.params.veloId)
        .then(velo => {
            if(!velo) {
                return res.status(404).send({
                    message: "Velo not found with id " + req.params.veloId
                });
            }
            res.send(velo);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Velo not found with id " + req.params.veloId
            });
        }
        return res.status(500).send({
            message: "Error retrieving velo with id " + req.params.veloId
        });
    });
};


// Update a note identified by the veloId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.Name) {
        return res.status(400).send({
            message: "Velo has to be named WARNING it's Name and not name"
        });
    }

    // Find note and update it with the request body
    velo.findByIdAndUpdate(req.params.veloId, {
        name: req.body.name || "void",
        brand: req.body.brand || "void",
        Accessories: req.body.Accessories || "void",
        stock: req.body.stock,
        releaseDate: req.body.releaseDate,
        isElectric: req.body.isElectric || "void"
    }, {new: true})
        .then(velo => {
            if(!velo) {
                return res.status(404).send({
                    message: "Velo not found with id " + req.params.veloId
                });
            }
            res.send(velo);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Velo not found with id " + req.params.veloId
            });
        }
        return res.status(500).send({
            message: "Error updating velo with id " + req.params.veloId
        });
    });
};


// Delete a velo with the specified veloId in the request
exports.delete = (req, res) => {
    velo.findByIdAndRemove(req.params.veloId)
        .then(velo => {
            if(!velo) {
                return res.status(404).send({
                    message: "Velo not found with id " + req.params.veloId
                });
            }
            res.send({message: "Velo deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Velo not found with id " + req.params.veloId
            });
        }
        return res.status(500).send({
            message: "Could not delete velo with id " + req.params.veloId
        });
    });
};
