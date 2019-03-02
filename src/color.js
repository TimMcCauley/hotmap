/**
 * Color.js
 *
 * Authors: nconrad
 */

import {matMinMax} from './utils';

let schemeCategory20RGBs = [
    'rgb(31, 119, 180)',
    'rgb(174, 199, 232)',
    'rgb(255, 127, 14)',
    'rgb(255, 187, 120)',
    'rgb(44, 160, 44)',
    'rgb(152, 223, 138)',
    'rgb(214, 39, 40)',
    'rgb(255, 152, 150)',
    'rgb(148, 103, 189)',
    'rgb(197, 176, 213)',
    'rgb(140, 86, 75)',
    'rgb(196, 156, 148)',
    'rgb(227, 119, 194)',
    'rgb(247, 182, 210)',
    'rgb(127, 127, 127)',
    'rgb(199, 199, 199)',
    'rgb(188, 189, 34)',
    'rgb(219, 219, 141)',
    'rgb(23, 190, 207)',
    'rgb(158, 218, 229)'
];

const schemeCategory20Hex = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5'
];

const schemeCategory20 = [
    0x1f77b4,
    0xaec7e8,
    0xff7f0e,
    0xffbb78,
    0x2ca02c,
    0x98df8a,
    0xd62728,
    0xff9896,
    0x9467bd,
    0xc5b0d5,
    0x8c564b,
    0xc49c94,
    0xe377c2,
    0xf7b6d2,
    0x7f7f7f,
    0xc7c7c7,
    0xbcbd22,
    0xdbdb8d,
    0x17becf,
    0x9edae5
];


function getCategoryColors(categories) {
    // assume length of all categories is same
    let indexes = categories[0].map(cat => 0);
    let mappings = categories[0].map(cat => { return {}; });
    let colorMatrix = [];

    categories.forEach((set, i) => {
        let row = [];
        set.forEach((cat, j) => {
            if (cat in mappings[j]) {
                row.push( mappings[j][cat] );
            } else {
                // alternate colors starting from start/end of list
                let index = j % 2
                    ? indexes[j] % 20
                    : Math.abs(schemeCategory20.length - 1 - indexes[j]) % 20;

                let color = schemeCategory20[index];
                mappings[j][cat] = color;
                row.push(color);

                // increment each categories' color index
                indexes[j]++;
            }
        });
        colorMatrix.push(row);
    });

    return colorMatrix;
}

// see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(rgb) {
    return '0x' + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
}

// see https://stackoverflow.com/a/30144587
function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

/**
 * Returns matrix of hex values given start and stop rgbs of gradient
 * @param {*} matrix matrix to compute
 * @param {*} rgb1 [r, g, b]
 * @param {*} rgb2 [r, g, b]
 */
function matGradient(matrix, rgb1, rgb2) {
    let max = matMinMax(matrix).max;
    matrix = matrix.map(r => r.map(val => rgbToHex( pickHex(rgb1, rgb2, val / max)) ) );
    return matrix;
}

function getRandomColorMatrix(m, n) {
    let colors = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < m; j++) {
            let color = '0x' + (Math.random() * 0xFFFFFF << 0).toString(16);
            row.push(color);
        }
        colors.push(row);
    }
    return colors;
}

/**
 *
 * @param {*} matrix matrix of values
 * @param {*} f function for returning color
 */
function getColorMatrix(matrix, settings) {
    if (settings == 'gradient') {
        return matGradient(matrix, [255, 0, 0], [255, 255, 255]);
    }

    let {bins, colors} = settings;

    if (bins.length !== colors.length)
        throw 'When specifying "bins", the number of bins and colors must be equal.';

    // parse bin list and create function to return color
    bins = parseColorBins(bins);
    let f = binColorFunction(bins, colors);

    let n = matrix[0].length,
        m = matrix.length;

    let cMatrix = [];
    for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            let val = matrix[i][j];
            let color = f(val);

            if (color === null)
                throw Error(`Could not map value ${val} to a color.  (i,j)=(${i},${j})`);

            row.push(color);
        }
        cMatrix.push(row);
    }

    return cMatrix;
}

function parseColorBins(bins) {
    let opRegex = /(>|<|=|<=|>=)+/gm;
    let valRegex = /(\d+)/gm;
    bins = bins.map(binStr => {
        return {
            op: binStr.match(opRegex)[0],
            val: binStr.match(valRegex)[0]
        };
    });

    return bins;
}

function binColorFunction(bins, colors) {
    return (val) => {
        let color = null;
        for (let i = 0; i < bins.length; i++) {
            let bin = bins[i],
                v = parseInt(bin.val);

            if (bin.op === '=' && val == v) {
                color = colors[i];
                break;
            } else if (bin.op === '<=' && val <= v) {
                color = colors[i];
                break;
            } else if (bin.op === '<' && val < v) {
                color = colors[i];
                break;
            } else if (bin.op === '>' && val > v) {
                color = colors[i];
                break;
            } else if (bin.op === '>=' && val >= v) {
                color = colors[i];
                break;
            }
        }

        return color;
    };
}


export {
    getColorMatrix,
    getRandomColorMatrix,
    getCategoryColors,
    parseColorBins,
    toHex
};