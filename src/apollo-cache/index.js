import { InMemoryCache } from "@apollo/client";
import { mergedEdges } from "./helper";
/*configuration cache for apollo client*/
const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        name: {
          read(name) {
            return name.toUpperCase();
          },
        },
      },
    },
    User: {
      fields: {
        repositories: {
          keyArgs : false, 
          merge(existing, incoming, { readField, mergeObjects }) {
            if (!existing) return incoming;
            if (!incoming) return existing;
            return {
              ...existing,
              ...incoming,
              edges: mergedEdges(existing, incoming, readField, mergeObjects),
            };
          },
        },
      },
    },
  },
});

export default cache;
