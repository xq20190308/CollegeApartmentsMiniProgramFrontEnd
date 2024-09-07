# ml-excel-to-json
=================

该云函数可以直接将EXCEL表格数据转为JSON数据,无需调用文件上传插件,简单实用

### 云函数示例
```javascript
const {
	excelTojson,jsonToexcel
} = require('ml-excel-to-json');
exports.main = async (event, context) => {
	//json转excel 数据/标题/字段映射关系/类型 包含(file,base64)
	let jsonToexcel = await jsonToexcel(event.data, event.title, event.mapping, event.type,{merges:event.merges});
	let excelTojson = await excelTojson(event.data, event.sheetList);
	return {
		code: 0,
		excelTojson,
		jsonToexcel
	}
};
```

### 以下是文件转base64的js

```javascript
function urlTobase64(url, callback) {
	uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer',
		success: res => {
			let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
			callback(base64)
		}
	});
}
```

### 前端示例

```javascript
import {
		excelToData,
		dataToExcel
	} from '@/uni_modules/ml-excel-to-json/jssdk/parseExcel.js'
	methods:{
		getData() {
			let sheetList = [{
					index: 0,
					keys: ['姓名', '电话', '姓名1'],
					keysIndex: 0,
					startIndex: 1,
					endIndex: 8
				},
				{
					index: 0,
					keys: ['姓名1', '电话2'],
					keysIndex: 0,
					startIndex: 1,
					endIndex: -1
				}
			]
			excelToData('getExcelToJson', sheetList)
				.then(res => {
					console.log(res)
				})
		}
	}
	
```

### jsonToExcel

```javascript
import {
		excelToData,
		dataToExcel
	} from '@/uni_modules/ml-excel-to-json/jssdk/parseExcel.js'
	data(){
		return {
				title: 'Hello',
				data: [{
					id: "1",
					name: "test"
				}, {
					id: "2",
					name: "t2"
				}, {
					id: "3",
					name: "hello3"
				}],
				mapping: {
					name: "姓名"
				},
				type: "file" //base64 转本地下载 file 文件url  其他方法参见 https://www.npmjs.com/package/xlsx 搜索 input type
			}
	}
	
	methods:{
		getExcel() {
			dataToExcel('getJsonToExcel', {
				params: {
					data: this.data,
					title: this.title,
					mapping: this.mapping,
					type: this.type,
					merges: [{
						start: [0, 1],
						end: [0, 4]
					}]
				},
				autoDownload:true,
				fileName:'hello'
			})
			.then(res =>{
				console.log(res)
			})
		}
	}
	
```

### excel转json

| 属性					| 类型	| 默认值	| 说明																														|
|--|--|--|--|
| data					| String| null		| 这里传入文件的base64																										|
| sheetList				| Array	| []		| excel表格sheet页,当Array存在多个sheet时，会按照每个sheet的定义来合并所获取到的数据。也就是所有的数据会合并到一个数组中。	|
| sheetList.index		| int	| 0		| sheet页的索引号，例如excel表格第一页为0	,索引号现在支持-1了,-1将自动获取现在活动中的sheet页																				|
| sheetList.keys		| Array	| null		| keys对应excel表格的cols keys[0]对应cols[0],当与keysIndex同时存在时,keys生效												|
| sheetList.keysIndex	| int	| 0		| keysIndex可以指定excel表内哪一行作为表头来使用,当与keys同时存在时,keys生效												|
| sheetList.startIndex	| int	| 1		| startIndex可以决定你需要从第几行开始来获取数据																			|
| sheetList.endtIndex	| int	| null或-1	| endIndex可以决定你的数据到第几行来结尾																					|
|	sheetList.autoKey	|	string	|	null	|	autoKey可以通过某个字段为空时自动截断该sheet页中的数据。这个属性需要与keysIndex配合使用,无法与keys同时使用	|

### json转excel
| 属性		| 类型	| 默认值| 说明																								|
|--|--|--|--|
| data		| data	| []	| 传入数据																							|
| title		| string| null	| 文件标题																							|
| mapping	| object| {}	| 字段映射(将字段映射为标题)																		|
| type		| string| base64| 支持base64及file file为url base64需自行对数据转换为文件.file的url是将文件存入云存储并返回的fileID	|
| options.merges	| array	|	[]	| 这是一个合并单元格的功能，具体使用方法参见jsonToExcel	|
|options.appendHeaderData	|	 array	|	[]	|	数组应为[[]]类型,它可以让你在映射的表头上方增加任意数量的自定义数据	|

# 现在它可以操控单元格的样式了

|样式|子样式|默认值|说明|
|--|--|--|--|
|alignment	|vertical		|bottom		|"top" or "center" or "bottom"																	|
|			|horizontal		|left		|"left" or "center" or "right"																	|
|			|wrapText		|false		|true or false																					|
|			|textRotation	|0			|0 to 180, or 255 ,180 is rotated down 180 degrees, 255 is special, aligned vertically			|
|border		|top			|			|{ style: BORDER_STYLE, color: COLOR_STYLE }													|
|			|bottom			|			|{ style: BORDER_STYLE, color: COLOR_STYLE }													|
|			|left			|			|{ style: BORDER_STYLE, color: COLOR_STYLE }													|
|			|right			|			|{ style: BORDER_STYLE, color: COLOR_STYLE }													|
|			|diagonal		|			|{ style: BORDER_STYLE, color: COLOR_STYLE, diagonalUp: true/false, diagonalDown: true/false }	|
|fill		|patternType	|"none"		|"solid" or "none"																				|
|			|fgColor		|			|foreground color: see COLOR_STYLE																|
|			|bgColor		|			|background color: see COLOR_STYLE																|
|font		|bold			|false		|font bold true or false																		|
|			|color			|			|font color COLOR_STYLE																			|
|			|italic			|false		|font italic true or false																		|
|			|name			|"Calibri"	|font name																						|
|			|strike			|false		|font strikethrough true or false																|
|			|sz				|"11"		|font size (points)																				|
|			|underline		|false		|font underline true or false																	|
|			|vertAlign		|			|"superscript" or "subscript"																	|
|numFmt		|				|0			|Ex: "0" // integer index to built in formats, see StyleBuilder.SSF property					|
|			|				|			|Ex: "0.00%" // string matching a built-in format, see StyleBuilder.SSF							|
|			|				|			|Ex: "0.0%" // string specifying a custom format												|
|			|				|			|Ex: "0.00%;\\(0.00%\\);\\-;@" // string specifying a custom format, escaping special characters|
|			|				|			|Ex: "m/dd/yy" // string a date format using Excel's format notation							|
|			|				|			|COLOR_STYLE {object} Properties																|
|			|				|			|Colors for border, fill, font are specified as an name/value object - use one of the following:|

###颜色描述


|颜色样式	|描述				|示例															|
|--			|--					|--																|
|rgb		|hex RGB value		|{rgb: "FFCC00"}												|
|theme		|theme color index	|{theme: 4} // (0-n) // Theme color index 4 ("Blue, Accent 1")	|
|tint		|tint by percent	|{theme: 1, tint: 0.4} // ("Blue, Accent 1, Lighter 40%")		|

###BORDER_STYLE {string} Properties
边框样式值如下:

dashDotDot
dashDot
dashed
dotted
hair
mediumDashDotDot
mediumDashDot
mediumDashed
medium
slantDashDot
thick
thin
Border Notes

Borders for merged areas are specified for each cell within the merged area. For example, to apply a box border to a merged area of 3x3 cells, border styles would need to be specified for eight different cells:

left borders (for the three cells on the left)
right borders (for the cells on the right)
top borders (for the cells on the top)
bottom borders (for the cells on the left)

