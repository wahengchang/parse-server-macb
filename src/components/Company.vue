<template>
  <div class="catlv1Containter">
    <div>共 {{ count }} 個</div>
    <div class="container">
      <v-data-table
        dense
        :headers="headers"
        :items="companyList"
        :items-per-page="999"
        class="elevation-1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Company',
  props: {
    companyData: Object
  },
  data: function() {
      return {
          headers: [
            { text: 'Title', value: 'title' },
            // { text: 'Href', value: 'href' },
            { text: 'Tel', value: 'tel' },
            { text: 'Email', value: 'email' },
            { text: 'Fax', value: 'fax' },
            { text: 'Address', value: 'addressZh' },
          ],
          count: this.companyData.count,
          companyList: this.companyData.results
      }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.catlv1Containter {
}
.catlv1Item {
    margin: 5px 10px;
}
</style>
