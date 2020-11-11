function range(number) {
  return [...Array(number).keys()];
}

function cardinalToDegrees(cardinalDirection) {
  const cardinals = ['N', 'E', 'S', 'W'];
  const cardinalIndex = cardinals.findIndex(cardinal => cardinal === cardinalDirection);
  return cardinalIndex * 90;
}

function clearChildren(node) {
  if (node && node.childElementCount > 0) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }
}

async function callApi(
  url,
  { method = 'GET', headers = { 'Content-Type': 'application/json' }, body = {} } = {}
) {
  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }
  const response = await fetch(url, { method, headers, body });
  return await response.json();
}
