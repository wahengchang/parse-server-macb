<template>
  <div class="catlv2Containter">
    <v-card-text>
      <div>共 {{ count }} 個</div>
    </v-card-text>
    <div class="container">
        <!-- <v-badge class='catlv2Item' v-for="(item, index) in catLv2List" :key='index' color="pink" :content="item.children.count"> -->
        <v-badge class='catlv2Item' v-for="(item, index) in catLv2List" :key='index' :content="item.children.count">
            <v-btn
              :disabled='selectedItem === item.id'
              color="gray"
              @click='_onClickCatLv2(item)'
            >
                {{item.title}}
            </v-btn>
        </v-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatLv2',
  props: {
    catLv2Data: Object
  },
  data: function() {
      return {
        count: this.catLv2Data.count,
        catLv2List: this.catLv2Data.results,
        selectedItem: null
    }
  },
  methods: {
    _onClickCatLv2: function (item) {
      this.selectedItem = item.id
      this.$emit("onClickCatLv2", item.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.catlv2Containter {
}
.catlv2Item {
    margin: 5px 10px;
}
</style>
