import cal from './components/cal' // 引入组件
const fukacal = {
  install (Vue, options) {
    Vue.component(cal.name, cal) // 全局组件
  }
}
export default fukacal
