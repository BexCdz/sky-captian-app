// Each page is an SVG on a 200x200 canvas. Every region can be filled with a color.
const petal = (id, cx, cy) => ({ id, shape: 'circle', props: { cx, cy, r: 22 } })

export const PAGES = [
  {
    id: 'fish',
    regions: [
      { id: 'tail', shape: 'polygon', props: { points: '45,100 8,66 8,134' } },
      { id: 'fin', shape: 'polygon', props: { points: '85,66 112,32 128,68' } },
      { id: 'body', shape: 'ellipse', props: { cx: 105, cy: 100, rx: 62, ry: 40 } },
      { id: 'stripe', shape: 'ellipse', props: { cx: 100, cy: 100, rx: 10, ry: 30 } },
      { id: 'eye', shape: 'circle', props: { cx: 138, cy: 92, r: 8 } },
      { id: 'bubble1', shape: 'circle', props: { cx: 178, cy: 70, r: 9 } },
      { id: 'bubble2', shape: 'circle', props: { cx: 188, cy: 45, r: 6 } },
    ],
  },
  {
    id: 'house',
    regions: [
      { id: 'sun', shape: 'circle', props: { cx: 168, cy: 34, r: 20 } },
      { id: 'wall', shape: 'rect', props: { x: 45, y: 95, width: 110, height: 85 } },
      { id: 'roof', shape: 'polygon', props: { points: '35,95 100,38 165,95' } },
      { id: 'door', shape: 'rect', props: { x: 88, y: 128, width: 26, height: 52 } },
      { id: 'window1', shape: 'rect', props: { x: 56, y: 112, width: 24, height: 24 } },
      { id: 'window2', shape: 'rect', props: { x: 120, y: 112, width: 24, height: 24 } },
    ],
  },
  {
    id: 'flower',
    regions: [
      { id: 'stem', shape: 'rect', props: { x: 96, y: 90, width: 8, height: 100 } },
      { id: 'leaf', shape: 'ellipse', props: { cx: 128, cy: 145, rx: 26, ry: 12 } },
      petal('p1', 135, 70),
      petal('p2', 112, 104),
      petal('p3', 72, 91),
      petal('p4', 72, 49),
      petal('p5', 112, 36),
      { id: 'center', shape: 'circle', props: { cx: 100, cy: 70, r: 18 } },
    ],
  },
  {
    id: 'rocket',
    regions: [
      { id: 'flame', shape: 'polygon', props: { points: '82,150 100,190 118,150' } },
      { id: 'finL', shape: 'polygon', props: { points: '72,115 38,160 72,150' } },
      { id: 'finR', shape: 'polygon', props: { points: '128,115 162,160 128,150' } },
      {
        id: 'body',
        shape: 'path',
        props: { d: 'M100,18 C142,52 142,118 130,152 L70,152 C58,118 58,52 100,18 Z' },
      },
      { id: 'window', shape: 'circle', props: { cx: 100, cy: 80, r: 16 } },
    ],
  },
]
