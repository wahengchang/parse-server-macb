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
      query getCatLv2 {
        categoryLv2s {
          count
          results {
            id
          }
        }
      }
        `
    }
  })

  export default {
      list
  }