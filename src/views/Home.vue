<template>
  <div class="home">
    <div v-if='catLv1Data' class='cardContainer'>
        <h3> 第一分類 </h3>
        <v-card>
          <CatLv1Component
            :catLv1Data='catLv1Data'
            @onClickCatLv1='onClickCatLv1'
          />
        </v-card>
        <v-divider />
    </div>
    <div v-else>
      請選一個類別
    </div>

    <div v-if='catLv2Data && catLv2Data.count' class='cardContainer'>
      <h3> 第二分類 </h3>
      <v-card>
        <CatLv2Component
          :catLv2Data='catLv2Data'
          @onClickCatLv2='onClickCatLv2'
        />
      </v-card>
      <v-divider />
    </div>
    <div v-else>
      請選一個類別
    </div>

    <div v-if='companyData' class='cardContainer'>
      <h3> 公司 </h3>
      <CompanyComponent
        :companyData='companyData'
      />
    </div>
    <div v-else>
      請選一個類別
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Parse from 'parse'
import companys from '../lib/graphql/companys'
import catLv1 from '../lib/graphql/categoryLv1'
import CatLv1Component from '@/components/CatLv1'
import CatLv2Component from '@/components/CatLv2'
import CompanyComponent from '@/components/Company'

const sleep = (n=1) => new Promise((resolve)=> {
  return setTimeout(() => {
    return resolve()
  }, n*1000);
})

export default {
  name: "home",
  data() {
    return {
      email: null,
      createdAt: null,
      username: null,
      catLv1Data: null,
      catLv2Data: null,
      companyData: null
    };
  },
  async mounted() {
    try {
      this.$store.system.isLoading = true
      const user = Parse.User.current()
      if(user) {
        const {username, createdAt, email} = user.toJSON()
        this.username = username
        this.createdAt = createdAt
        this.email = email
      }

      const resultLv1 = await catLv1.list()
      this.catLv1Data = resultLv1.data.data.categoryLv1s
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
    onClickCatLv2: async function(id) {
      this.$store.system.isLoading = true
      this.companyData = null
      const result = await companys.list(id)
      this.companyData = result.data.data.companies
      this.$store.system.isLoading = false
    },
    onClickCatLv1: async function(id) {
      this.$store.system.isLoading = true
      this.catLv2Data = null
      this.companyData = null

      await sleep()

      const targetLv1 = this.catLv1Data.results.find(item=>item.id===id)
      this.catLv2Data = targetLv1.children
      this.$store.system.isLoading = false
    }
  },
  components: { CatLv1Component, CatLv2Component, CompanyComponent }
};
</script>

<style scoped>
.cardContainer {
  margin: 20px 0px;
}
</style>
