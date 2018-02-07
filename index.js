'use strict';

var replacements = {
    from: '[]{}:,"',
    to:   '()-!*.~'
};

var hash = {};
replacements.from.split('').forEach((c, n) => hash[c] = replacements.to[n]);
replacements.to.split('').forEach((c, n) => hash[c] = replacements.from[n]);

function replace(src) {
    src = src || "";

    var chars = src.split('');
    chars.forEach((c, n) => {
        if (hash[c]) {
            chars[n] = hash[c];
        }
    });

    return chars.join('');
}

function stringify(param) {
    return replace(JSON.stringify(param));
}

function parse(dumbsonString) {
    return JSON.parse(replace(dumbsonString));
}

function stringifyQuery(object) {
    return Object.keys(object).map(key => key + "=" + stringify(object[key])).join('&');
}

function parseQueryString(querystring) {
    var result = {};
    var parts = querystring.substring(querystring.indexOf('?')+1).split('&');
    var params = {};
    var pair;

    for (var i = 0; i < parts.length; i++) {
        if (parts[i]) {
            pair = parts[i].split('=');
            result[pair[0]] = parse(pair[1]);
        }
    }

    return result;
}

module.exports = { stringify, parse, stringifyQuery, parseQueryString }