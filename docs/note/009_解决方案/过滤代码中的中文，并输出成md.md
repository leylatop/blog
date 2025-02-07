```js
const fs = require('fs')

const path = require('path')

  

function walk (dir, callback) {

fs.readdirSync(dir).forEach(file => {

const filePath = path.join(dir, file)

if (fs.statSync(filePath).isDirectory()) {

walk(filePath, callback)

} else {

callback(filePath)

}

})

}

// 需要过滤掉的路径或文件

const exportList = [ 'node_modules/', '.md', '.eslintrc.js', '.json', 'script/', '.git/', 'i18n-gitignore/', 'src/configs/i18n/', '.ci/', 'mock/' ]

function filterChinese (filePath) {

const extname = path.extname(filePath)

if (extname !== '.js' && extname !== '.ts' && extname !== '.jsx' && extname !== '.tsx') {

return false

}

let flag = false

for (let i = 0; i < exportList.length; i++) {

const p = exportList[i]

if (filePath.includes(p)) {

flag = true

break

}

}

if (flag) return false

const content = fs.readFileSync(filePath, 'utf-8')

if (/[\u4e00-\u9fa5]/.test(content)) {

return { filePath, content }

}

return false

}

  

function generateMarkdown (data) {

let markdown = '# Files with Chinese characters\n\n'

data.forEach(file => {

markdown += `## ${file.filePath}\n\n`

file.lines.forEach(line => {

markdown += `- Line ${line.lineNumber}: ${line.text}\n`

})

markdown += '\n'

})

return markdown

}

  

function saveMarkdown (markdown) {

fs.writeFileSync('chinese-files.md', markdown)

}

  

function filterFiles () {

const filesWithData = []

walk('src', filePath => {

const data = filterChinese(filePath)

if (data) {

const lines = data.content.split('\n').map((line, index) => {

line = line.trim()

if (line.length === 0) return null

if (line.includes('console.')) return null

// 1. 若该行包含行内注释，则先处理一下line内容

if (/\/\/.*[\u4e00-\u9fa5]/.test(line)) {

line = line.trim().replace(/\/\/.*[\u4e00-\u9fa5]/g, '')

}

// 注释1 - 匹配单行注释

if (/\/\/.*[\u4e00-\u9fa5]/.test(line)) {

return null

}

/* 注释2 */

if (/\/\*[\s\S]*?[\u4e00-\u9fa5][\s\S]*?\*\//.test(line)) {

return null

}

/**

* 注释3 --- 这一行

*/

if (/\*[\s\S]*[\u4e00-\u9fa5]/.test(line)) {

return null

}

if (/[\u4e00-\u9fa5]/.test(line)) {

return {

lineNumber: index + 1,

text: line.trim()

}

}

return null

}).filter(Boolean)

if (lines.length > 0) {

filesWithData.push({

filePath: filePath,

lines: lines

})

}

}

})

return filesWithData

}

  

const data = filterFiles()

const markdown = generateMarkdown(data)

saveMarkdown(markdown)

console.log('Done!')


```
