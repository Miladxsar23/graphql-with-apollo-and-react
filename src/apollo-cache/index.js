import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
/*configuration cache for apollo client*/
const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        issues: {
          ...relayStylePagination(),
          keyArgs: ["states"],
        }, 
        issue : {
          keyArgs : ["number"]
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
    Issue : {
      fields : {
        comments : relayStylePagination()
      }
    }
  },

});

export default cache;
