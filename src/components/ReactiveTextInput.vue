
<template>
    <v-row>
        <v-col cols="8">
            <v-text-field
                class='loginInput'
                :value="innerValue"
                :label="label"
                :disabled="!editable"
                @keyup.enter="handlerPressEnter"
                @input='handlerOnChange'
                @change='handlerOnChange'
            />
        </v-col>
        <v-col cols="4">
            <NotificationMsg ref='msgNoti'/>
            <button class='reactiveButton' v-if='editable && isChanged' @click='handlerPressEnter(innerValue)'>
                save
            </button>
            <button class='reactiveButton reset' v-if='editable && isChanged' @click='handlerOnReset'>
                reset
            </button>
        </v-col>
    </v-row>
</template>

<script>
import NotificationMsg from '@/components/NotificationMsg'

export default {
  name: "reactiveTextInput",
  components: {NotificationMsg},
  props: {
    label: String,
    editable: Boolean,
    initValue: String,
  },
  data() {
    const innerValue = this.initValue
    const isChanged = false
    return {
        innerValue,
        isChanged,
        msg: null
    };
  },
  async mounted() {
  },
  methods: {
    handlerPressEnter: async function() {
        await this.$emit("handlerUpdate", this.innerValue)
        await this.$sleep(0.1)
        this.$refs.msgNoti.triggerMessage(`update ${this.label} success`)
        this.isChanged = false
    },
    handlerOnChange: function(e) {
        console.log('1-1-1-1-')
        this.isChanged = true
        this.innerValue = e
    },
    handlerOnReset: function(){
        this.innerValue = this.initValue
        this.isChanged = false
    }
  },
};
</script>

<style scoped>
.loginInput{
    width: 500px;
}
.reactiveButton {
    border: 1px gray solid;
    width: 50px;
    background: lightgray;
    color: black;
    margin: 5px 0;
}

.reset {
    background: #aaeeee;
}
</style>