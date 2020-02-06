module.exports = (app) => {
    const velo = require('../controllers/velo.controller.js');

    // Create a new velo
    app.post('/api/bikes', velo.create);

    // Retrieve all velos
    app.get('/api/bikes', velo.findAll);

    // Retrieve a single Note with veloId
    app.get('/api/bikes/:veloId', velo.findOne);

    // Update a Note with veloId
    app.put('/api/bikes/:veloId', velo.update);

    // Delete a Note with veloId
    app.delete('/api/bikes/:veloId', velo.delete);
}