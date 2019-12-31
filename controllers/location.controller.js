const moment = require('moment');

const io = require('../socket');

const Bus = require('../models/bus.model');
const Location = require('../models/location.model');

exports.getBusLastLocation = async (req, res, next) => {
    let busId = await Bus.find().select('_id');
    busId = busId.map(el => el._id);
    return Location.find({ busId: { $in: busId }, createdAt: { $gte: moment().startOf('day').toDate(), $lte: moment().endOf('day').toDate() } })
        .populate('busId')
        .sort({ createdAt: -1 })
        .then(result => {
            const uniqLocation = result.filter((thing, index, self) => {
                return index === self.findIndex((t) => (
                    t.busId._id === thing.busId._id
                ));
            });
            return res.status(200).json({ length: uniqLocation.length, data: uniqLocation });
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
        .then(result => {
            /* istanbul ignore if */
            if (process.env.ENVIRONMENT === 'PRODUCTION') {
                io.getIO().emit('location', {
                    type: 'ADD_LOCATION',
                    payload: result
                });
            }
            return res.status(201).json({ message: 'Success add bus location' });
        })
        .catch(error => res.status(400).json({ message: error.toString() }));
};
