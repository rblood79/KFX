
import React, { useRef, useEffect, useState} from 'react';
import _ from 'lodash';
import { getColor } from '../Mixin'

const App = (props) => {
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    
    const item = props.item;
    const aver = props.aver || [0, 0, 0, 0];
    const total = props.total;
    //
    const def = Object.keys(aver).map(key => ({ key, value: aver[key] }));
    const now = Object.keys(item).map(key => ({ key, value: item[key] }));

    const items = [];
    items.push(def)
    items.push(now)
    //console.log(items)

    const fillColor = getColor(total, 0, 240, 0.48);
    const strokeColor = getColor(total, 0, 240, 1);
    const canvasRef = useRef(null);

    const fixSize = 0.5;
    const width = 480;
    const height = 360;
    const wCenter = width * 0.5;
    const hCenter = height * 0.5;
    const size = 20;
    const timeout = useRef(null);
    let curArr = [];
    let startArr = [];
    let endArr = []
    let delta;
    let animationComplete = true;
    let FPS = 60;
    let duration = 20;

    curArr.push(props.cur);
    startArr.push(props.cur);
    endArr.push(Object.keys(item).map(key => (item[key])));

    const base = () => {
        context.strokeStyle = "#ccc";  // 선 색깔
        context.lineJoin = 'round';	// 선 끄트머리(?)
        context.lineWidth = 1;		// 선 굵기
        context.shadowBlur = 0;
        //세로
        context.beginPath();
        context.moveTo(wCenter + fixSize, size);
        context.lineTo(wCenter + fixSize, height - size);
        //가로
        context.moveTo(80, hCenter + fixSize);
        context.lineTo(width - 80, hCenter + fixSize);
        //context.closePath();
        //
        context.stroke();
        //
        let ss = ((height / 2) - size) / 5;
        let polygonPoints = [
            wCenter, hCenter - ss * 5, // 0
            wCenter + ss * 5, hCenter, // 1
            wCenter, hCenter + ss * 5, // 2
            wCenter - ss * 5, hCenter, // 3
        ];
        context.fillPolygon(polygonPoints, 'rgba(0,0,0,0.0)', '#a4a4a4');
        for (let i = 0; i < 5; i++) {
            const inSize = ss * i;
            let polygonPoints = [
                wCenter, hCenter - inSize,
                wCenter + inSize, hCenter,
                wCenter, hCenter + inSize,
                wCenter - inSize, hCenter,
            ];
            context.fillPolygon(polygonPoints, 'rgba(0,0,0,0)', '#dedede');
        }
        context.font = 'bold 12px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'bottom';
        context.fillStyle = '#1c1c1c';
        context.shadowBlur = 0;
        context.fillText(now[0].key, wCenter, hCenter - 165);

        context.textAlign = 'left';
        context.textBaseline = 'middle';
        context.fillText(now[1].key, wCenter + 165, hCenter);

        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillText(now[2].key, wCenter, hCenter + 165);

        context.textAlign = 'right';
        context.textBaseline = 'middle';
        context.fillText(now[3].key, wCenter - 165, hCenter);
    }

    const draw = (arr) => {
        context.clearRect(0, 0, 480, 360);
        const ss = ((height / 2) - size) / 100;
        const setArray = [
            { stroke: 'rgba(0,0,0,0.24)', fill: 'rgba(0,0,0,0.16)', width: 1, shadow: 0 },
            { stroke: strokeColor, fill: fillColor, width: 1.6, shadow: 0 },
        ]
        base();
        _.map(items, (item, i) => {
            let polygonPoints = [];
            if (i === 0) {
                polygonPoints = [
                    wCenter, hCenter - ss * item[0].value,
                    wCenter + ss * item[1].value, hCenter,
                    wCenter, hCenter + ss * item[2].value,
                    wCenter - ss * item[3].value, hCenter,
                ];
            } else {
                polygonPoints = [
                    wCenter, hCenter - ss * arr[0],
                    wCenter + ss * arr[1], hCenter,
                    wCenter, hCenter + ss * arr[2],
                    wCenter - ss * arr[3], hCenter,
                ];
            }
            context.fillPolygon(polygonPoints,
                setArray[i].fill,
                setArray[i].stroke,
                setArray[i].width,
                setArray[i].shadow,
            );
        })
    }

    const loop = () => {
        for (let i = 0; i < endArr.length; i += 1) {
            for (let t = 0; t < endArr[i].length; t += 1) {
                delta = (endArr[i][t] - startArr[i][t]) / duration;
                curArr[i][t] += delta;
                if (delta) {
                    animationComplete = false;
                };
            };
        };
        //
        let temp0 = endArr.length - 1;
        let temp1 = endArr[temp0].length - 1;

        if (Math.round(endArr[temp0][temp1] * 10) / 10 === Math.round(startArr[temp0][temp1] * 10) / 10) {
            animationComplete = true;
        };
        if (animationComplete) {
            draw(endArr[0]);
            clearTimeout(timeout.current);
            //cancelAnimationFrame(loop);
        } else {
            draw(curArr[0])
            timeout.current = setTimeout(() => { loop() }, FPS / duration);
            //requestAnimationFrame(loop);
            
        };
    };

    useEffect(() => {
        setCanvas(canvasRef.current);
        canvas && setContext(canvas.getContext('2d'));
        if (context) {
            clearTimeout(timeout.current);
            loop();
            //requestAnimationFrame(loop);
        }
    }, [canvas, context, item])

    return (
        <canvas ref={canvasRef} className="canvas" width={480} height={360} />
    );
}

export default App;

CanvasRenderingContext2D.prototype.fillPolygon = function (points, fillColor, strokeColor, lineWidth, shadow) {
    if (points.length <= 0) return;
    this.closePath();
    this.strokeStyle = strokeColor;  // 선 색깔
    this.lineJoin = 'round';	// 선 끄트머리(?)
    this.lineWidth = lineWidth || .5;		// 선 굵기
    this.fillStyle = fillColor;
    this.beginPath();
    this.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length - 1; i += 2) {
        this.lineTo(points[i], points[i + 1])
    }
    this.shadowColor = fillColor;
    this.shadowBlur = shadow || 0;
    this.closePath();
    this.stroke();
    this.fill();
}