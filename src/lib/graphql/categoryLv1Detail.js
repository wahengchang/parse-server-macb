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
      query getCatLv1 {
        categoryLv1 (id: "${id}"){
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
              children {
                count 
              }
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