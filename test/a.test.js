const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../app');
const Bus = require('../models/bus');
const Location = require('../models/location');
const expected = chai.expect;

chai.use(chaiHttp);

var busId;

describe('BUS', () => {
    before(done => {
        Bus.deleteMany({}, err => {
            Location.deleteMany({}, err => {
                done();
            });
        });
    });

    it('GET BUS WITH 0 DATA', done => {
        chai.request(server)
            .get('/api/bus')
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(0);
                done();
            });
    });

    it('ADD NEW BUS', done => {
        chai.request(server)
            .post('/api/bus')
            .send({
                plateNumber: 'BP 123 AB',
                driver: 'Reynanda'
            })
            .end((err, res) => {
                expected(res.status).eql(201);
                done();
            });
    });

    it('ADD NEW BUS', done => {
        chai.request(server)
            .post('/api/bus')
            .send({
                plateNumber: 'BP 456 CD',
                driver: 'Putra'
            })
            .end((err, res) => {
                expected(res.status).eql(201);
                done();
            });
    });

    it('GET BUS WITH 2 DATA', done => {
        chai.request(server)
            .get('/api/bus')
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(2);
                busId = res.body.data[0]._id;
                done();
            });
    });

    it('UPDATE BUS', done => {
        chai.request(server)
            .put(`/api/bus/${busId}`)
            .send({
                status: true
            })
            .end((err, res) => {
                expected(res.status).eql(200);
                done();
            });
    });

    it('GET BUS WITH 2 DATA', done => {
        chai.request(server)
            .get('/api/bus')
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(2);
                done();
            });
    });

    it('DELETE BUS', done => {
        chai.request(server)
            .delete(`/api/bus/${busId}`)
            .end((err, res) => {
                expected(res.status).eql(200);
                done();
            });
    });

    it('GET BUS WITH 1 DATA', done => {
        chai.request(server)
            .get('/api/bus')
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(1);
                busId = res.body.data[0]._id;
                done();
            });
    });

    it('UPDATE BUS NEGATIVE TEST', done => {
        chai.request(server)
            .put(`/api/bus/${mongoose.mongo.ObjectId()}`)
            .send({
                status: true
            })
            .end((err, res) => {
                expected(res.status).eql(404);
                done();
            });
    });

    it('DELETE BUS NEGATIVE TEST', done => {
        chai.request(server)
            .delete(`/api/bus/${mongoose.mongo.ObjectId()}`)
            .end((err, res) => {
                expected(res.status).eql(404);
                done();
            });
    });

    it('UPDATE BUS NEGATIVE TEST', done => {
        chai.request(server)
            .put(`/api/bus/123`)
            .send({
                status: true
            })
            .end((err, res) => {
                expected(res.status).eql(400);
                done();
            });
    });

    it('DELETE BUS NEGATIVE TEST', done => {
        chai.request(server)
            .delete(`/api/bus/123`)
            .end((err, res) => {
                expected(res.status).eql(400);
                done();
            });
    });

    it('ADD NEW BUS NEGATIVE TEST', done => {
        chai.request(server)
            .post('/api/bus')
            .end((err, res) => {
                expected(res.status).eql(400);
                done();
            });
    });
});

describe('LOCATION', () => {
    it('GET BUS LAST LOCATION', done => {
        chai.request(server)
            .get(`/api/location`)
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(0);
                done();
            });
    });

    it('ADD BUS LAST LOCATION', done => {
        chai.request(server)
            .post('/api/location')
            .send({
                latitude: 0,
                longitude: 0,
                busId
            })
            .end((err, res) => {
                expected(res.status).eql(201);
                done();
            });
    });

    it('ADD BUS LAST LOCATION', done => {
        chai.request(server)
            .post('/api/location')
            .send({
                latitude: 1,
                longitude: 1,
                busId
            })
            .end((err, res) => {
                expected(res.status).eql(201);
                done();
            });
    });

    it('ADD BUS LAST LOCATION', done => {
        chai.request(server)
            .post('/api/location')
            .send({
                latitude: 2,
                longitude: 2,
                busId
            })
            .end((err, res) => {
                expected(res.status).eql(201);
                done();
            });
    });

    it('GET BUS LAST LOCATION', done => {
        chai.request(server)
            .get(`/api/location`)
            .end((err, res) => {
                expected(res.status).eql(200);
                expected(res.body.length).eql(1);
                done();
            });
    });

    it('ADD BUS LAST LOCATION NEGATIVE TEST', done => {
        chai.request(server)
            .post('/api/location')
            .end((err, res) => {
                expected(res.status).eql(400);
                done();
            });
    });
});
