<template>
  <div class="catlv1Containter">
    <v-card-text>
      <div>共 {{ count }} 個</div>
    </v-card-text>
    <div class="container">
        <v-badge class='catlv1Item' v-for="(item, index) in catLv1List" :key='index' color="pink" :content="item.countCompany">
            <v-btn
              :disabled='selectedItem === item.id'
              color="gray"
              @click='_onClickCatLv1(item)'
            >
                {{item.title}} : {{item.children.count}}
            </v-btn>
        </v-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatLv1',
  props: {
    catLv1Data: Object
  },
  data: function() {
    const catLv1List = this.catLv1Data.results
    for(const [index, lv1Item] of catLv1List.entries()) {
        const lv2List = lv1Item.children.results
        let countLv1Company = 0 
        for(const lv2 of lv2List) {
            countLv1Company += lv2.children.count
        }
        catLv1List[index].countCompany = countLv1Company
    }
    return {
        count: this.catLv1Data.count,
        catLv1List,
        selectedItem: null
    }
  },
  methods: {
    _onClickCatLv1: function (item) {
      this.selectedItem = item.id
      this.$emit("onClickCatLv1", item.id)
    }
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
