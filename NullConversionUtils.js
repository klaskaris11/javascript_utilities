
function emptyStringNullifier(key, value) {
    if (value==='')
        return null;
    else
        return value;
}

function undefinedNullifier(key, value) {
    if (value===undefined)
        return null;
    else
        return value;
}

export function nullifyEmptyStrings(o) {
    return JSON.parse(JSON.stringify(o, emptyStringNullifier));
}

export function substituteUndefinedWithNull(o) {
    return JSON.parse(JSON.stringify(o, undefinedNullifier));
}

export function substituteUndefinedWithNullAndNullifyEmptyStrings(o) {
    // the order is important!
    return nullifyEmptyStrings(substituteUndefinedWithNull(o));
}