 exports 字段：
```json
 {
	 // package.json
	 // ...其他配置
	 "exports": {
	    ".": {
	      "types": "./lib/types/index.d.ts",
	      "default": "./lib/api.js"
	    },
	    "./config": {
	      "types": "./lib/types/config-api.d.ts",
	      "default": "./lib/config-api.js"
	    },
	    "./package.json": "./package.json",
	    "./use-at-your-own-risk": {
	      "types": "./lib/types/use-at-your-own-risk.d.ts",
	      "default": "./lib/unsupported-api.js"
	    },
	    "./rules": {
	      "types": "./lib/types/rules.d.ts"
	    },
	    "./universal": {
	      "types": "./lib/types/universal.d.ts",
	      "default": "./lib/universal.js"
	    }
	  }
}
```

exports 字段的场景及其作用：
- 一般用在工具包中
- 可以选择性的暴露文件
- 没有在 exports 字段中的文件，不可以直接被引用
- 避免暴露不稳定的 api 和文件



 