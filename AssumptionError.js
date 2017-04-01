"use strict";


class AssumptionError {
    constructor (file, line, src) {
        this.file = file;
        this.line = line;
        this.src = src;
    }

    toString() {
        return `${this.file}: ${this.line}: ${this.src}`;
    }
}


module.exports = AssumptionError;