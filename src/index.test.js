import treemap from './index.js';

test('simple landscape', () => {
  const values = [50, 50];
  const rects = treemap(values, 100, 50);

  expect(rects.length).toBe(2);
  expect(rects[0]).toEqual({ x: 0, y: 0, width: 50, height: 50 });
  expect(rects[1]).toEqual({ x: 50, y: 0, width: 50, height: 50 });
});

test('simple portrait', () => {
  const values = [50, 50];
  const rects = treemap(values, 50, 100);

  expect(rects.length).toBe(2);
  expect(rects[0]).toEqual({ x: 0, y: 0, width: 50, height: 50 });
  expect(rects[1]).toEqual({ x: 0, y: 50, width: 50, height: 50 });
});

test('simple percents', () => {
  const values = [50, 50];
  const rects = treemap(values, 100, 50, true);

  expect(rects.length).toBe(2);
  expect(rects[0]).toEqual({ x: 0, y: 0, width: 50, height: 100 });
  expect(rects[1]).toEqual({ x: 50, y: 0, width: 50, height: 100 });
});

test('complex landscape', () => {
  const values = [10, 50, 30, 10];
  const rects = treemap(values, 100, 50);

  expect(rects.length).toBe(4);
  expect(rects[1]).toEqual({ x: 0, y: 0, width: 50, height: 50 });
  expect(rects[2]).toEqual({ x: 50, y: 0, width: 50, height: 30 });
  expect(rects[0]).toEqual({ x: 50, y: 30, width: 25, height: 20 });
  expect(rects[3]).toEqual({ x: 75, y: 30, width: 25, height: 20 });
});

test('complex portrait', () => {
  const values = [10, 50, 30, 10];
  const rects = treemap(values, 50, 100);

  expect(rects.length).toBe(4);
  expect(rects[1]).toEqual({ x: 0, y: 0, width: 50, height: 50 });
  expect(rects[2]).toEqual({ x: 0, y: 50, width: 50, height: 30 });
  expect(rects[0]).toEqual({ x: 0, y: 80, width: 25, height: 20 });
  expect(rects[3]).toEqual({ x: 25, y: 80, width: 25, height: 20 });
});
