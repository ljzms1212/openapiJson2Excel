const fs = require('fs')

// 直接使用 require 函数加载 package.json
const packageJson = require('./package.json');

console.log(packageJson); // 输出 package.json 中的 name 字段
let filePath = packageJson.config.filePath

// filePath = `C:\\Users\\zhangmaosong\\Downloads\\PMS.openapi.json`

let str = fs.readFileSync(filePath, 'utf-8')

let jsonData = JSON.parse(str)

let excelData = []
for (var pathKey in jsonData.paths) {
    let path = pathKey
    let routeInfo = jsonData.paths[path]
    let method = Object.keys(routeInfo)[0]
    let summary = Object.values(routeInfo)[0].summary
    let tags = Object.values(routeInfo)[0].tags.join(',')
    excelData.push({ path, method, summary, tags })
}
// console.log(excelData)

const XLSX = require('xlsx');

// 将JSON转换为工作表
const worksheet = XLSX.utils.json_to_sheet(excelData);

// 将工作表添加到工作簿
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

const path = require('path')
let extname = path.extname(filePath)
let outputPath = filePath.substring(0, filePath.lastIndexOf(extname)) + '-output.xlsx'
// 写入文件
XLSX.writeFile(workbook, outputPath);
console.log('outputPath:', outputPath)
// // 等待用户输入
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// readline.question('请输入json 文件地址', (file) => {

//     console.log(`Hello, ${name}!`);
//     readline.close(); // 关闭输入流
// });
