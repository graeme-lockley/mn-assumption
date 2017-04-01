const fs = require("fs");
const AssumptionError = require("./AssumptionError");


function myStackTrace() {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    const err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
}


function assumption(expr) {
    "use strict";

    if (expr) return;

    const stack = myStackTrace();
    const call = stack[1];
    const file = call.getFileName();
    const lineno = call.getLineNumber();
    let src = fs.readFileSync(file, 'utf8');
    const line = src.split('\n')[lineno - 1];
    src = line.match(/assumption\((.*)\)/)[1];

    throw new AssumptionError(file, lineno, src);
}


module.exports = assumption;
