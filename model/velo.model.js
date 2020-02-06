const mongoose = require('mongoose');

const VeloSchema = mongoose.Schema({
    Name: String,
    Brand: String,
    Accessories: String,
    stock: Intl,
    isElectric: Boolean,
    releaseDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Velo', VeloSchema);
