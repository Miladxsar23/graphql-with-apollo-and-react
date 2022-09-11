function mergedEdges(existing, incoming, readField, mergeObjects) {
  let merged = existing.edges ? existing.edges.slice(0) : [];
  let nodeNameToIndex = Object.create(null);
  if (existing.edges) {
    existing.edges.forEach(({ node }, index) => {
      const nodeName = readField("name", node);
      nodeNameToIndex[nodeName] = index;
    });
  }
  incoming.edges.forEach((item) => {
    const name = readField("name", item.node);
    const index = nodeNameToIndex[name];
    if (typeof index === "number") {
      merged[index] = mergeObjects(merged[index], item);
    } else {
      nodeNameToIndex[name] = merged.length;
      merged.push(item);
    }
  });
  return merged;
}

export {mergedEdges}
