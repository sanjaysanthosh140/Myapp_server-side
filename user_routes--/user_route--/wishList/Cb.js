"use strict";
const cb = (err, result) => {
    if (err) {
        return {
            result: err,
        };
    }
    else {
        return {
            result: result,
        };
    }
};
module.exports = cb;
