<template>
  <div class="home">
    <!-- {{companyData && companyData.results}} -->
    <div v-if='companyData' class='cardContainer'>
      <div>
          <h3> {{companyData.parent.title}} / {{companyData.parent.parent.title}} / 公司 </h3>
          <ReactiveTextInput
            v-for="(formatItem, index) in formFormat"
            :key='index'
            :label='(formatItem.field.toUpperCase && formatItem.field.toUpperCase()) || formatItem.field'
            :editable='formatItem.editable'
            :initValue='companyData[formatItem.field]'
            @handlerUpdate='formatItem.handler(formatItem.field, companyData.id, $event)'
          />
      </div>   
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import ReactiveTextInput from '@/components/ReactiveTextInput'
import companyDetail from '../lib/graphql/companyDetail'
// import time from '../lib/time'

export default {
  name: "companyDetail",
  components: {ReactiveTextInput},
  data() {
    const formFormat = [
      {field: 'title', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'href', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'tel', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'email', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'address', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'addressZh', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'fax', editable: true, handler: this.handleUpdate, isChange: false},
      {field: 'createdAt', editable: false, isChange: false},
      {field: 'updatedAt', editable: false, isChange: false},
    ]

    return {
      companyData: null,
      formFormat
    };
  },
  async mounted() {
    try {
      this.$store.system.isLoading = true
      await this.initCompany()
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
    // _easyReadDateFormat: time.easyReadDateFormat,
    handleUpdate: async function(field, id, event) {
      this.$store.system.isLoading = true
      const Company = Parse.Object.extend("Company");
      const query = new Parse.Query(Company);
      const obj = await query.get(id)
      obj.set(field, event)
      await obj.save()
      this.companyData[field] = event
      this.$store.system.isLoading = false
    },
    initCompany: async function() {
      const {id} = this.$route.params
      const companyResult = await companyDetail.get(id)

      console.log(companyResult)

      this.companyData = companyResult.data.data.company
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