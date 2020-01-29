<template>
  <div class="home">
    <!-- {{catLv1Data && catLv1Data.results}} -->
    <div v-if='catLv1Data' class='cardContainer'>
      <div>
          <h3> 第一分類 </h3>
          <ReactiveTextInput
            v-for="(formatItem, index) in formFormat"
            :key='index'
            :label='(formatItem.field.toUpperCase && formatItem.field.toUpperCase()) || formatItem.field'
            :editable='formatItem.editable'
            :initValue='catLv1Data[formatItem.field]'
            @handlerUpdate='formatItem.handler(formatItem.field, catLv1Data.id, $event)'
          />
      </div>   
      <div>
        <div v-if='catLv1Data.children.results' class='cardContainer'>
            <h3> 第二分類 </h3>
              <router-link :to='`/catLv2/${item.id}`' v-for='(item, index) in catLv1Data.children.results' class='row rowContainer' :key='index'>
                <div class='rowCell'>{{item.title}}</div>
                <div class='rowCell'>{{item.children.count}}</div>
                <div class='rowCell'>{{_easyReadDateFormat(item.createdAt)}}</div>
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
import catLv1Detail from '../lib/graphql/categoryLv1Detail'
import time from '../lib/time'

export default {
  name: "catLv1Detail",
  components: {ReactiveTextInput},
  data() {
    const formFormat = [
      {field: 'title', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'createdAt', editable: false, isChange: false},
      {field: 'updatedAt', editable: false, isChange: false},
    ]

    return {
      catLv1Data: null,
      formFormat
    };
  },
  async mounted() {
    try {
      this.$store.system.isLoading = true
      await this.initCatLv1()
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
      const CategoryLv1 = Parse.Object.extend("CategoryLv1");
      const query = new Parse.Query(CategoryLv1);
      const obj = await query.get(id)
      obj.set(field, event)
      await obj.save()
      this.catLv1Data[field] = event
      this.$store.system.isLoading = false
    },
    initCatLv1: async function() {
      const {id} = this.$route.params
      const resultLv1 = await catLv1Detail.get(id)
      this.catLv1Data = resultLv1.data.data.categoryLv1
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