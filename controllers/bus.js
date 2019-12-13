const Bus = require('../models/bus');

exports.getBus = (req, res, next) => {
    return Bus.find()
        .then(result => res.status(200).json({ length: result.length, data: result }))
        .catch(error => res.status(400).json({ message: error.toString() }));
};

exports.addBus = (req, res, next) => {
    const {
        plateNumber,
        driver,
        entryPoint
    } = req.body;
    const newBus = new Bus({
        plateNumber,
        driver,
        entryPoint
    });
    return newBus.save()
        .then(result => res.status(201).json({ message: 'Success add new bus' }))
        .catch(error => res.status(400).json({ message: error.toString() }));
};

exports.updateBus = (req, res, next) => {
    const id = req.params.id;
    const {
        plateNumber,
        driver,
        entryPoint,
        status
    } = req.body;
    const newBus = new Bus({
        _id: id,
        plateNumber,
        driver,
        entryPoint,
        status
    });
    return Bus.findOneAndUpdate({ _id: id }, newBus, { runValidators: true }, (error, document, result) => {
        if (error) {
            return res.status(400).json({ message: error.toString() });
        } else if (!document) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        return res.status(200).json({ message: 'Success update bus' });
    });
};

exports.deleteBus = (req, res, next) => {
    const id = req.params.id;
    return Bus.findOneAndDelete({ _id: id }, (error, result) => {
        if (error) {
            return res.status(400).json({ message: error.toString() });
        } else if (!result) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        return res.status(200).json({ message: 'Success delete bus' });
    });
};
