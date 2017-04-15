"use strict";


class AssumptionError {
    constructor (file, line, src, description) {
        this.file = file;
        this.line = line;
        this.src = src;
        this.description = description;
    }

    toString() {
        if (this.description) {
            return `${this.file}: ${this.line}: ${this.src}: ${this.description}`;
        } else {
            return `${this.file}: ${this.line}: ${this.src}`;
        }
    }
}


module.exports = AssumptionError;