/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
"use strict";

var assert          = require('chai').assert;
var structure       = require('../lib/pg-structure.js');
var testDB          = require('./util/db.js');
var db;


describe('pg-structure', function () {
    after(function (done) {
        testDB.dropDB(done);
    });

    it('should callback with informative error if accessed schema is not in DB and forgotten in options.', function (done) {
        testDB.resetDB(1, function () {
            structure('localhost', 'pg_generator_test_724839', testDB.dbConfig.user, testDB.dbConfig.password, {schema: ['public']}, function (err, result) {
                assert.throw(function () { if (err) { throw err; } }, /This schema is also not in the options/);
                db = result;
                done();
            });
        });
    });

    it('should callback with error if parameters are not valid.', function (done) {
        structure(99, 'pg_generator_test_724839', testDB.dbConfig.user, testDB.dbConfig.password, {schema: ['public']}, function (err, result) {
            assert.throw(function () { if (err) { throw err; } }, /host must be a string/);
            done();
        });
    });

    it('should throw error if no callback is provided.', function (done) {
        assert.throw(function () {
            structure('localhost', 'pg_generator_test_724839', testDB.dbConfig.user, testDB.dbConfig.password, {schema: ['public']});
        }, /callback is required/);
        done();
    });
    it('should throw error if non-function parameter provided as callback.', function (done) {
        assert.throw(function () {
            structure('localhost', 'pg_generator_test_724839', testDB.dbConfig.user, testDB.dbConfig.password, {schema: ['public']}, 4);
        }, /callback must be a Function/);
        done();
    });

});