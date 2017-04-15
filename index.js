const fs = require("fs");
const Assert = require("assert");
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

function assumptionEqual(expr1, expr2) {
    "use strict";

    try {
        Assert.deepEqual(expr1, expr2);
    } catch (e) {
        const stack = myStackTrace();
        const call = stack[1];
        const file = call.getFileName();
        const lineno = call.getLineNumber();
        let src = fs.readFileSync(file, 'utf8');
        const line = src.split('\n')[lineno - 1];
        src = line.match(/assumptionEqual\((.*)\)/)[1];

        throw new AssumptionError(file, lineno, src, `${JSON.stringify(expr1)} != ${JSON.stringify(expr2)}`);
    }
}


module.exports = {
    assumption,
    assumptionEqual
};
