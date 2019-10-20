const Location = require('../models/location');

exports.getBusLastLocation = (req, res, next) => {
    const id = req.params.id;
    return Location.findOne({ busId: id })
        .populate('busId')
        .sort({ createdAt: -1 })
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'No location' })
            }
            return res.status(200).json({ data: result })
        })
        .catch(error => res.status(400).json({ message: error.toString() }));
};

exports.addBustLastLocation = (req, res, next) => {
    const {
        latitude,
        longitude,
        busId
    } = req.body;
    const newLocation = new Location({
        location: {
            coordinates: {
                latitude,
                longitude
            }
        },
        busId
    });
    return newLocation.save()
        .then(result => res.status(201).json({ message: 'Success add bus location' }))
        .catch(error => res.status(400).json({ message: error.toString() }));
};
