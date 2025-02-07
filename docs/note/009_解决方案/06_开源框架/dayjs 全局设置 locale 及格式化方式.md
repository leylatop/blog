1. 按需引入 localizedFormat 插件
```javascript
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

export default dayjs
```

2. 根目录引入locale文件，并全局设置语言
```javascript
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
```

3. 使用，在业务处可以直接使用 LLL 方式进行格式化日期
```javascript
dayjs(order.created_at).format('LLL')
```

4. 更新语言，在步骤1处引入updateLocale 插件
```javascript
dayjs.updateLocale('en')
```