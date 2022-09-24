import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
/*configuration cache for apollo client*/
const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        issues: {
          ...relayStylePagination(), 
          keyArgs:["states"]
        }
      },
    },
    User: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Organization: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  },
});

export default cache;
