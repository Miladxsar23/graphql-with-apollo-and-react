import { InMemoryCache } from "@apollo/client";

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
  },
});

export default cache;
