var HORIZONTAL = 'horizontal';
var VERTICAL = 'vertical';

function treemapCalc(data, width, height) {
  var percent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var rect = createRect(width, height);
  var nodes = data.map(function (d, i) {
    return {
      id: i,
      value: d,
      rect: null
    };
  }).sort(function (a, b) {
    return b.value - a.value;
  });

  fitNodesInRect(nodes, rect);

  return nodes.sort(function (a, b) {
    return a.id - b.id;
  }).map(function (node) {
    if (percent) {
      node.rect.x /= width / 100;
      node.rect.y /= height / 100;
      node.rect.width /= width / 100;
      node.rect.height /= height / 100;
    }

    return node.rect;
  });
}

function createRect() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  return { width: width, height: height, x: x, y: y };
}

function fitNodesInRect(nodes, rect) {
  if (nodes.length == 1) {
    nodes[0].rect = clone(rect);
    return;
  }

  var halves = splitNodes(nodes);
  var leftSum = sumValues(halves.left);
  var rightSum = sumValues(halves.right);
  var totalSum = leftSum + rightSum;

  var midPoint = void 0;
  var orientation = void 0;

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
    fitNodesInRect(halves.left, createRect(midPoint, rect.height, rect.x, rect.y));
    fitNodesInRect(halves.right, createRect(rect.width - midPoint, rect.height, rect.x + midPoint, rect.y));
  } else {
    fitNodesInRect(halves.left, createRect(rect.width, midPoint, rect.x, rect.y));
    fitNodesInRect(halves.right, createRect(rect.width, rect.height - midPoint, rect.x, rect.y + midPoint));
  }
}

function splitNodes(nodes) {
  var sum = sumValues(nodes);

  var midPoint = 0;

  if (sum === 0) {
    midPoint = Math.round(nodes.length / 2);
  } else {
    var halfSum = sum / 2;

    for (var acc = 0, i = 0; i < nodes.length; i++) {
      if (i > 0 && acc + nodes[i].value > halfSum) {
        midPoint = i;
        break;
      }

      acc += nodes[i].value;
    }
  }

  return {
    left: nodes.slice(0, midPoint),
    right: nodes.slice(midPoint)
  };
}

function sumValues(nodes) {
  return nodes.reduce(function (acc, node) {
    return acc + node.value;
  }, 0);
}

function isWide(rect) {
  return rect.width > rect.height;
}

function clone(obj) {
  return Object.assign({}, obj);
}

export default treemapCalc;
