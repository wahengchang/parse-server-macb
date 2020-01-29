import axios from 'axios'

const get = (id) => axios({
    method: 'POST',
    headers: {
      "X-Parse-Application-Id": "APPLICATION_ID",
      "X-Parse-Master-Key": "MASTER_KEY"
    },
    url: '/graphql',
    data: {
      query: `
      query getCatLv2 {
        categoryLv2 (id: "${id}"){
          id
          title
          createdAt
          updatedAt
          children {
            count 
            results {
              title
              id
              createdAt
              updatedAt
            }
          }
        }
      }
        `
    }
  })

  export default {
      get
  }