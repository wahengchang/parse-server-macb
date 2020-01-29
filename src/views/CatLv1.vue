<template>
  <div class="home">
    <!-- {{catLv1Data && catLv1Data.results}} -->
    <div v-if='catLv1Data' class='cardContainer'>
        <h3> 第一分類 </h3>
          <router-link :to='`/catLv1/${item.id}`' v-for='(item, index) in catLv1Data.results' class='row' :key='index'>
            <div class='rowCell'>{{item.title}}</div>
            <div class='rowCell'>{{item.children.count}}</div>
            <div class='rowCell'>{{_easyReadDateFormat(item.createdAt)}}</div>
            <div class='rowCell'>{{_easyReadDateFormat(item.updatedAt)}}</div>
          </router-link> 
    </div>
  </div>
</template>

<script>
// import Parse from "parse";
import catLv1 from '../lib/graphql/categoryLv1'
import time from '../lib/time'

export default {
  name: "catLv1",
  data() {
    return {
      catLv1Data: null,
    };
  },
  async mounted() {
    try {
      this.$store.system.isLoading = true
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
    _easyReadDateFormat: time.easyReadDateFormat
  },
  components: {}
};
</script>

<style scoped>
.row {
  margin: 10px 0;
  padding-top: 10px;
  border-top: 1px gray solid;
  text-decoration: none;
  color: gray;
}
.rowCell {
  width: 100px;
}
</style>