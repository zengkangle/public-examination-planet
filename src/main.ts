// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'

//引入uploader
import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'

//引入vue-wplayer
import WPlayer from 'vue-wplayer';

//引入样式
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-drawer.css";


// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)
//使用上传器
app.use(uploader)
//使用WPlayer播放器
app.use(WPlayer)
// 挂载整个应用到app容器中
app.mount('#app')
