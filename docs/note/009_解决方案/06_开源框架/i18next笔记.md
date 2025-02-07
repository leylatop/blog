1. i18next仓库提供了I18N类，默认导出的是I18n类的实例：i18n
2. i18n类常用的方法：init方法、use方法、t方法
3. i18n.init()，参数为配置文件和资源文件；在调用init方法时，资源文件会被存到resourceStore中，store本质是一个对象，当我们调用i18n.t() 方法时，底层代码会去resourceStore中使用getResource方法进行获取；
4. i18n.use()，参数为module，可以使用其他模块更好的使用i18n，模块类型为：backend、logger、languageDetector、i18nFormat、postProcessor、formatter、3rdParty，不同类型的module在初始化时，会被存放在module模块中不同的属性中，module必须遵守i18next的开发规范；i18n.use()方法的返回值是i18n，所以后续可以继续链式调用i18n.init()方法；i18n.use()方法必须在i18n.init()方法之前调用，i18n.init() 执行时，会根据this.module 中不同类型的module进行不同的操作；
5. i18n.t()，参数为想要获取的key的值，内部通过Translator实例的translate -> resolve 方法实现获取对应语言；
6. 想要使用i18n，必须引入i18next依赖；
