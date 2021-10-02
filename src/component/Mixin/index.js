import { useEffect, useState, } from 'react';
import _ from 'lodash';

export function getColor(percent, start, end, alpha) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start,
        d = alpha ? alpha : 1;
    return 'hsla(' + c + ', 60%, 48%, ' + d + ')';
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

export function useData(arr, num, checkList) {
    const [data, setData] = useState({
        data: undefined
    });
    useEffect(() => {
        let wAverage = 0;
        const customizer = ((obj, src) => {
            if (obj === 'N') {
                return 0;
            } else {
                wAverage += src;
            };
        });
        const keyArray = _.keys(arr[num].기준정보);
        const weight = arr[num].가중치;
        const used = _.cloneDeep(checkList);
        const weightFix = _.mergeWith(used, weight, customizer);
        const lists = _.cloneDeep(arr[num].호수추천);
        _.each(lists, (obj) => {
            let valueSum = 0;
            _.map(obj, (v, k) => {
                //console.log(k, v)
                const findKey = keyArray.find(element => element === k);
                if (findKey && used) {
                    valueSum += (v * weightFix[k])
                    //valueSum += (v * used[findKey])
                }
            })
            obj.TOTAL = Number((valueSum / wAverage).toFixed(2));
        });

        const temp = _.sortBy(lists, 'TOTAL').reverse();
        setData({
            data: temp,
        });
    }, [arr, num, checkList]);
    return data;
}

export const debounce = (fn, ms) => {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this);
        }, ms);
    };
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        flag: false,
    });
    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowSize({width: window.innerWidth - 32, height: window.innerHeight});
        }, 100);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export function useMove(type, count, grid) {
    const [move, setMove] = useState({
        x: 0,
    });
    const size = useWindowSize();
    useEffect(() => {
        let _x = 0;
        let _c = type === 'list' ? size.width * 0.5 : 0;
        if (type === 'list') {
            _x = Math.round(_c - ((grid.width + grid.gap) * count) - (grid.width * 0.5))
            //} else if (data.length > 15 && !base) {
        } else {
            _x = Math.round(_c - ((grid.width + grid.gap) * count))
        };
        setMove({
            x: _x,
        });
    }, [type, count, grid, size]);
    return move;
}

export function useGridNum(total, type) {
    const [gridNum, setGridNum] = useState({
        col: undefined,
        row: undefined,
        end: undefined,
        gap: undefined,
        width: undefined,
        height: undefined,
    });
    const size = useWindowSize();
    useEffect(() => {
        if (!total) {
            return { col: 0, row: 0, end: 0, gap: 0, width: 0, height: 0 };
        }
        const targetWidth = size.width;
        const count = Math.floor(size.width / 360);

        let _row = 1;
        let _col = total;
        let _end = total - 1;
        let _gap = 96;

        let _width = type === 'list' ? 360 : Math.round((targetWidth - (16 * (count - 1))) / count);
        let _height = 160;

        let rowNum = Math.round(targetWidth / _width);
        let colNum = Math.ceil(total / rowNum);
        let colMin = Math.min(colNum, 3)

        if (type === 'grid') {
            if (colNum > 3) {
                _row = colMin;
                _col = Math.ceil(total / _row);
            } else {
                _row = colMin;
                _col = rowNum;
            };
            _gap = 16;
            _end = _col - Math.round(targetWidth / _width);
        };
        setGridNum({
            col: _col,
            row: _row,
            end: _end,
            gap: _gap,
            width: _width,
            height: _height,
        });
    }, [total, type, size]);
    return gridNum;
}

export function shuffle(dataSet) {
    const array = dataSet.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
