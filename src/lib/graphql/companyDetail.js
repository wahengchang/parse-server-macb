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
      query getCompany {
        company (id: "${id}"){
          id
          title
          href
          tel
          email
          address
          addressZh
          fax
          createdAt
          updatedAt
          parent {
            id
            title
            parent {
              id
              title
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