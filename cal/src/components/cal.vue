<template>
  <div class="hello">
    <div class='weekdays'>
      <ul><li v-for='(item,i) in weekList' :key='i'>{{item}}</li></ul>
    </div>
    <div class="dateList">
      <ul v-for='(item,i) in dayArr' :key='i'>
        <div>{{item.name}}</div>
        <li v-for='(itemarr,j) in item.arr' :key='j' @click="chooseDate(item,j)">{{itemarr.day}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fukacal',
  data () {
    return {
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      startDate: new Date(),
      monthcount: 12,
      dayArr: []
    }
  },
  mounted () {
    this.getAlldays()
  },
  computed: {
  },
  methods: {
    getMonthDays (year, month) {
      return new Date(year, month, 0).getDate()
    },
    // 每个月的第一天 用null表示，例如1号是周三，则前面放3个null,周日是0，前面放0个null
    getMonthList (year, month) {
      let monthlist = []
      let count = this.getMonthDays(year, month)
      let nullcount = new Date(year, month - 1, 1).getDay()
      for (var j = 0; j < nullcount; j++) {
        monthlist.push({day: null, active: false})
      }
      for (var i = 1; i <= count; i++) {
        monthlist.push({day: i, active: true})
      }
      return monthlist
    },
    getAlldays () {
      let monthstart = new Date(this.startDate).getMonth() + 1
      let monthend = monthstart + this.monthcount
      let currentYear = new Date(this.startDate).getFullYear()
      for (var i = monthstart; i < monthend; i++) {
        let temp = {
          'name': '',
          'arr': []
        }
        let year = currentYear
        let month = i
        if (i > 12) {
          year = Number(currentYear) + 1
          month = i % 12
        }
        temp.name = year + '-' + month
        // let count = this.getMonthDays(year, month)
        // for (var j = 1; j < count + 1; j++) {
        //   temp.arr.push(j)
        // }
        temp.arr = this.getMonthList(year, month)
        this.dayArr.push(temp)
      }
    },
    chooseDate (item, index) {
      let data = item.name + '-' + item.arr[index].day
      this.$emit('choose', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  overflow: hidden;
  list-style-type: none;
  padding: 0;
}
li {
  float: left;
  width: 14.2857143%;
  height: 40px;
  line-height:40px;
}
a {
  color: #42b983;
}
</style>
