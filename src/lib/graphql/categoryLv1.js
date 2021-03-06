import axios from 'axios'

const list = () => axios({
    method: 'POST',
    headers: {
      "X-Parse-Application-Id": "APPLICATION_ID",
      "X-Parse-Master-Key": "MASTER_KEY"
    },
    url: '/graphql',
    data: {
      query: `
      query getCatLv1 {
        categoryLv1s {
          count
          results {
            id
            title
            createdAt
            updatedAt
            children {
              count 
              results {
                title
                id
                children {
                  count 
                }
              }
            }
          }
        }
      }
        `
    }
  })

  export default {
      list
  }