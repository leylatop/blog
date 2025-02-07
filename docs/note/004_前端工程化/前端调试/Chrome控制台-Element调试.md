console中：
$0为Element面板中当前选中的元素
$1 为上次选中的元素
$2 为上上次选中的元素

最多只能访问到$4

> 获取元素的事件侦听器
> 当前选定元素的事件侦听器： `getEventListeners($0)`

> 调试选中元素的某个事件：
> 调试选定元素的所有事件： `monitorEvents($0)`
> 调试选定元素的特定事件： `monitorEvents($0, ["control", "key"])`