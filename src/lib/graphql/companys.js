import axios from 'axios'

const list = (id) => axios({
    method: 'POST',
    headers: {
      "X-Parse-Application-Id": "APPLICATION_ID",
      "X-Parse-Master-Key": "MASTER_KEY"
    },
    url: '/graphql',
    data: {
      query: `
      query getCom {
        companies(where: {
          parent: { equalTo: "${id}" }
        })  {
          count
          results {
            id
            title
            href
            tel
            email
            address
            addressZh
            fax
          }
        }
      }
        `
    }
  })

  export default {
      list
  }