<template>
  <div class="home">
    <!-- {{catLv2Data && catLv2Data.results}} -->
    <div v-if='catLv2Data' class='cardContainer'>
      <div>
          <h3> 第二分類 </h3>
          <ReactiveTextInput
            v-for="(formatItem, index) in formFormat"
            :key='index'
            :label='(formatItem.field.toUpperCase && formatItem.field.toUpperCase()) || formatItem.field'
            :editable='formatItem.editable'
            :initValue='catLv2Data[formatItem.field]'
            @handlerUpdate='formatItem.handler(formatItem.field, catLv2Data.id, $event)'
          />
      </div>   
      <div>
        <div v-if='catLv2Data.children.results' class='cardContainer'>
            <h3> 公司 </h3>
              <router-link :to='`/company/${item.id}`' v-for='(item, index) in catLv2Data.children.results' class='row rowContainer' :key='index'>
                <div class='rowCell'>{{item.title}}</div>
                <!-- <div class='rowCell'>{{item.children.count}}</div> -->
                <!-- <div class='rowCell'>{{_easyReadDateFormat(item.createdAt)}}</div> -->
                <div class='rowCell'>{{item.email || '--'}}</div>
                <div class='rowCell'>{{item.tel || '--'}}</div>
                <div class='rowCell'>{{_easyReadDateFormat(item.updatedAt)}}</div>
              </router-link> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import ReactiveTextInput from '@/components/ReactiveTextInput'
import catLv2Detail from '../lib/graphql/categoryLv2Detail'
import time from '../lib/time'

export default {
  name: "catLv2Detail",
  components: {ReactiveTextInput},
  data() {
    const formFormat = [
      {field: 'title', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'createdAt', editable: false, isChange: false},
      {field: 'updatedAt', editable: false, isChange: false},
    ]

    return {
      catLv2Data: null,
      formFormat
    };
  },
  async mounted() {
    try {
      this.$store.system.isLoading = true
      await this.initCatLv2()
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
    _easyReadDateFormat: time.easyReadDateFormat,
    handleUpdate: async function(field, id, event) {
      this.$store.system.isLoading = true
      const CategoryLv2 = Parse.Object.extend("CategoryLv2");
      const query = new Parse.Query(CategoryLv2);
      const obj = await query.get(id)
      obj.set(field, event)
      await obj.save()
      this.catLv2Data[field] = event
      this.$store.system.isLoading = false
    },
    initCatLv2: async function() {
      const {id} = this.$route.params
      const resultLv2 = await catLv2Detail.get(id)

      console.log(resultLv2)

      this.catLv2Data = resultLv2.data.data.categoryLv2
    }
  }
};
</script>

<style scoped>
.loginInput {
  min-width: 300px;
}
.rowContainer {
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