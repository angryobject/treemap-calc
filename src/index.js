const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

export default function treemapCalc(data, width, height, percent = false) {
  const rect = createRect(width, height);
  const nodes = data
    .map((d, i) => ({
      id: i,
      value: d,
      rect: null,
    }))
    .sort((a, b) => b.value - a.value);

  fitNodesInRect(nodes, rect);

  return nodes.sort((a, b) => a.id - b.id).map(node => {
    if (percent) {
      node.rect.x /= width / 100;
      node.rect.y /= height / 100;
      node.rect.width /= width / 100;
      node.rect.height /= height / 100;
    }

    return node.rect;
  });
}

function createRect(width = 0, height = 0, x = 0, y = 0) {
  return { width, height, x, y };
}

function fitNodesInRect(nodes, rect) {
  if (nodes.length == 1) {
    nodes[0].rect = clone(rect);
    return;
  }

  const halves = splitNodes(nodes);
  const leftSum = sumValues(halves.left);
  const rightSum = sumValues(halves.right);
  const totalSum = leftSum + rightSum;

  let midPoint;
  let orientation;

  if (leftSum + rightSum <= 0) {
    midPoint = 0;
    orientation = HORIZONTAL;
  } else {
    if (isWide(rect)) {
      orientation = HORIZONTAL;
      midPoint = Math.round(leftSum * rect.width / totalSum);
    } else {
      orientation = VERTICAL;
      midPoint = Math.round(leftSum * rect.height / totalSum);
    }
  }

  if (orientation === HORIZONTAL) {
    fitNodesInRect(
      halves.left,
      createRect(midPoint, rect.height, rect.x, rect.y)
    );
    fitNodesInRect(
      halves.right,
      createRect(rect.width - midPoint, rect.height, rect.x + midPoint, rect.y)
    );
  } else {
    fitNodesInRect(
      halves.left,
      createRect(rect.width, midPoint, rect.x, rect.y)
    );
    fitNodesInRect(
      halves.right,
      createRect(rect.width, rect.height - midPoint, rect.x, rect.y + midPoint)
    );
  }
}

function splitNodes(nodes) {
  const sum = sumValues(nodes);

  let midPoint = 0;

  if (sum === 0) {
    midPoint = Math.round(nodes.length / 2);
  } else {
    const halfSum = sum / 2;

    for (let acc = 0, i = 0; i < nodes.length; i++) {
      if (i > 0 && acc + nodes[i].value > halfSum) {
        midPoint = i;
        break;
      }

      acc += nodes[i].value;
    }
  }

  return {
    left: nodes.slice(0, midPoint),
    right: nodes.slice(midPoint),
  };
}

function sumValues(nodes) {
  return nodes.reduce((acc, node) => acc + node.value, 0);
}

function isWide(rect) {
  return rect.width > rect.height;
}

function clone(obj) {
  return Object.assign({}, obj);
}
