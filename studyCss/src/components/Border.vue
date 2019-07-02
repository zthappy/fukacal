<template>
    <div id="lc-border">
        <div class="border-item1">
             无边框,没有style就没有边框
        </div>
        <div class="border-item2">
             默认边框（3-4px,颜色随字体颜色）
        </div>
         <div class="border-item3">
             上/右/下/左分别设置
        </div>
        <div><span v-for="(item,index) in styleList" :key="index" @click="chooseCurStyle(item)" class='lc-btn'>{{item}}</span></div>
        <div v-bind:style="{border:'5px '+curStyle+' green'}">边框</div>
        <div><span class='border-item4'>渐变</span></div>
    </div>
</template>
<script>
import {name} from '../../config/ex.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      styleList:['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset','inherit'],
      curStyle:''
    }
  },
  computed: {
    //   curStyle() {
    //       console.log(this.styleList[0]);
    //       return this.styleList[5];
    //   }
  },
  methods:{
      chooseCurStyle(item) {
          this.curStyle = item;
      }
  },
  created() {
      console.log(name)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border-item1 {
    border:1px red;
}
.border-item2 {
    border:solid;
    color:blanchedalmond;
}
.border-item3 {
    border-top:1px solid green;
    border-right:2px dotted red;
    border-bottom: 3px double yellow;
    border-left: 4px dashed blue;
}
.lc-btn {
    display: inline-block;
    padding: 10px 0;
    width: 25%;
    margin: 3px;
    border-radius: 3px;
    background: rgb(0, 162, 255);
    color:#fff;
}
</style>
