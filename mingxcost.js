/*jslint */
/*global */

var MINGXCOST = (function () {
    "use strict";

    return {
        "parseTable": function (csv) {
            var data;

            data = csv.split("\n").map(function (r) {
                return r.split(",").map(function (v) {
                    return parseInt(v, 10);
                });
            });

            return data.filter(function (r) {
                return !isNaN(r[0]);
            });
        },
        "verifyTable": function (data) {
            var s, k, len, errors;

            errors = [];
            len = data[0].length;
            data.forEach(function (r, i) {
                if (r.length !== len) {
                    errors.push("row " + (i + 1) + " has " + r.length + " columns (" + len + " expected)");
                }

                r.forEach(function (v, j) {
                    if (isNaN(v)) {
                        errors.push("row " + (i + 1) + " column " + (j + 1) + " is not an integer number");
                    } else {
                        if (v < 1) {
                            errors.push("row " + (i + 1) + " column " + (j + 1) + " is not positive");
                        }
                    }
                });
            });

            s = Math.sqrt(len);
            if (!Number.isInteger(s)) {
                errors.push("row length is not a square number (was " + len + ")");
            }

            s = s + 1; // stride
            data.forEach(function (r, i) {
                k = 0;
                while (k < r.length) {
                    if (r[k] !== 1) {
                        errors.push("row " + (i + 1) + " column " + (k + 1) + " is not a unit (was " + r[k] + ")");
                    }
                    k += s;
                }
            });

            return errors;
        },
        "minTime": function (data) {
            var s, t, w, src, dst, mins;

            if (data[0].length === 1) {
                return 0; // already on last node
            }

            s = Math.sqrt(data[0].length);
            mins = data[0].slice(0, s);

            for (t = 1; t < data.length && t < mins[s - 1]; t = t + 1) {
                for (src = 0; src < s; src = src + 1) {
                    if (mins[src] <= t) {
                        for (dst = 0; dst < s; dst = dst + 1) {
                            w = t + data[t][src * s + dst];
                            if (w < mins[dst]) {
                                mins[dst] = w;
                            }
                        }
                    }
                }
            }

            return mins[s - 1];
        }
    };
}());
