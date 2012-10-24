/*
 * Copyright (c) 2012, Joyent, Inc. All rights reserved.
 *
 * A brief overview of this source file: what is its purpose.
 */

var assert = require('assert-plus');
var restify = require('restify');
var util = require('util');

function UnallocatedVMError(message) {
    restify.RestError.call(this,
        409,
        'UnallocatedVMError',
        message,
        UnallocatedVMError);

    this.name = 'UnallocatedVMError';
}

util.inherits(UnallocatedVMError, restify.RestError);


/*
 * Base function for validation errors
 */
function ValidationFailedError(message, errors) {
    assert.string(message, 'message');
    assert.arrayOfObject(errors, 'errors');

    restify.RestError.call(this, {
        restCode: this.constructor.restCode,
        statusCode: this.constructor.statusCode,
        message: message,
        body: {
            code: this.constructor.restCode,
            message: message,
            errors: errors
        }
    });
}

util.inherits(ValidationFailedError, restify.RestError);
ValidationFailedError.prototype.name = 'ValidationFailedError';
ValidationFailedError.restCode = 'ValidationFailed';
ValidationFailedError.statusCode = 409;



exports.invalidUuidErr = function(field, message) {
    return {
        field: field || 'uuid',
        code: 'Invalid',
        message: message || 'Invalid UUID'
    };
};


exports.invalidParamErr = function(field, message) {
    assert.string(field, 'field');

    return {
        field: field,
        code: 'Invalid',
        message: message || 'Invalid parameter'
    };
};


exports.duplicateParamErr = function(field, message) {
    assert.string(field, 'field');

    return {
        field: field,
        code: 'Duplicate',
        message: message || 'Already exists'
    };
};


exports.missingParamErr = function(field, message) {
    assert.string(field, 'field');

    var obj = {
        field: field ,
        code: 'MissingParameter'
    };

    if (message) {
        obj.message = message;
    }

    return obj;
};


exports.UnallocatedVMError = UnallocatedVMError;
exports.ValidationFailedError = ValidationFailedError;