# Treemap Calc

> Calculates treemap rectangles for given values

## Install

```bash
# yarn
yarn add treemap-calc
# npm
npm i treemap-calc
```

## Usage

```javascript
import treemap from 'treemap-calc';

const values = [50, 50];
const containerWidth = 100;
const containerHeight = 50;

// set `calcPercents` to `true` to get rects in percentage,
// defaults to `false`
const rects = treemap(
  values,
  containerWidth,
  containerHeight /*, calcPercents */
);

/**
 * rects is:
 *
 * [
 *  { x: 0, y: 0, width: 50, height: 50 },
 *  { x: 50, y: 0, width: 50, height: 50 }
 * ]
 **/
```
