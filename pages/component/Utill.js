import { useEffect, useRef, useState } from "react";

export function FindColor(percent, start, end) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    return 'hsl(' + c + ', 60%, 48%)';
    //return 'hsl(' + 10 + ', 60%, 48%)';
}

export function byKeys(obj, keys = []) {
    const filtered = {}
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            filtered[key] = obj[key]
        }
    })
    return filtered
}
