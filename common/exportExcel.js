// exportExcel.js 可以直接复制
let imgCount = 1;//图片计数器
 
/**
 * 导出Excel
 * @param {Object} fileName 文件名 会自动拼接时间戳防止重名
 * @param {Object} data 数据内容 格式说明见下
 * @param {Object} callback 导出成功的回调方法 返回文件保存路径
 * 
 * 二维数组 其中外层数组中的每个元素为数组 对应一行    内层数组中的每个元素为object对象 对应每个单元格 属性如下：
 * type 类型 text为文字 img为图片 默认文字
 * width 单元格宽度 请带单位 默认300px
 * height 单元格高度 请带单位 默认25px
 * color 文字颜色 默认黑色
 * fontSize 字号 请带单位 默认16px
 * textAlign 文字对齐方式 默认left
 * imgWidth 仅type为img时需要 图片宽度 无需带单位 默认25
 * imgHeight 仅type为img时需要 图片高度 无需带单位 默认25
 * content 单元格内容 type为img时为图片路径 仅支持base64
 * colspan 跨列 默认1
 * rowspan 跨行 默认1
 * 
 * 示例：
 * [
	[{
		content: '姓名',
		color: 'blue',
		type: 'text',
		width: '200px',
		height: '25px',
		fontSize: '16px'
	}, {
		content: '性别',
		color: 'blue',
		type: 'text',
		width: '200px',
		height: '25px',
		fontSize: '16px'
	}, {
		content: '头像',
		color: 'blue',
		type: 'text',
		width: '200px',
		height: '25px',
		fontSize: '16px'
	}],
	[{
		content: '张三',
		color: 'blue',
		type: 'text',
		width: '200px',
		height: '25px',
		fontSize: '16px',
		colspan: 2,
		rowspan:2
	}, {
		content: 'base64图片',
		type: 'img',
		width: '200px',
		height: '25px',
		imgWidth: 25,
		imgHeight: 25
	}],
	[{
		content: '123',
		color: 'blue',
		type: 'text',
		width: '200px',
		height: '25px',
		fontSize: '16px'
	}]
]
 */
let doExport = function (fileName,data,callback){
	imgCount = 1;
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	if(month < 10){
		month = '0' + month;
	}
	if(day < 10){
		day = '0' + day;
	}
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minute < 10){
		minute = '0' + minute;
	}
	if(second < 10){
		second = '0' + second;
	}
	let name = fileName || '导出的Excel';
	let reg = /\\|\//g;
	name = name.replace(reg,'|');
	name = '' + year + month + day + hour + minute + second + '_' + name;
	uni.showLoading({
		title: '正在导出',
		mask: true
	});
	formatTable(name,data,callback);
}
 
async function formatTable(name,data,callback){
	let table = `<table style="line-height:3;">`;
	for (let item of data) {
		table += `<tr>`;
		for (let i of item) {
			let width = i.width || '70px';
			let height = i.height || '25px';
			let color = i.color || 'balck';
			let fontSize = i.fontSize || '16px';
			let textAlign = i.textAlign || 'left';
			let border = i.border || 'none';
			let colspan = i.colspan || 1;
			let rowspan = i.rowspan || 1;
			if(i.type==='img'){
				let imgWidth = i.imgWidth || 25;
				let imgHeight = i.imgHeight || 25;
				let src = await saveImg(name,i.content);
				console.log(src);
				if(src === 'fail'){
					uni.hideLoading();
					uni.showToast({
						title: '导出失败,请确认是否授权文件权限',
						icon: 'none'
					});
					return;
				}
				table += `<td style="width:${width};height:${height};color:${color};font-size:${fontSize};text-align:${textAlign};border:${border}" colspan="${colspan}" rowspan="${rowspan}"><img src="/图片${imgCount}.jpg" width="${imgWidth}" height="${imgHeight}">(图片${imgCount}.jpg)</td>`;
				imgCount ++;
			}else{
				table += `<td style="width:${width};height:${height};color:${color};font-size:${fontSize};text-align:${textAlign};border:${border};word-wrap:break-word;word-break:break-all;font-family:'宋体'" colspan="${colspan}" rowspan="${rowspan}">${i.content}</td>`;
			}
		}
		table += `</tr>`;
	}
	table += `</table>`;
	exportFile(formatTemplate(table),name,callback);
}
 
function formatTemplate(data) {
	let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
			xmlns:x="urn:schemas-microsoft-com:office:excel" 
			xmlns="http://www.w3.org/TR/REC-html40">
			<head><!--[if gte mso 9]><xml encoding="UTF-8"><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
			<x:Name>sheet1</x:Name>
			<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
			</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
			</head><body>${data}</body></html>`;
	return template;
}
 
function exportFile(fileData,documentName,callback) {
	createDir(documentName,(dirEntry,path,name) => {
		dirEntry.getFile(`${documentName}.xlsx`, {
			create: true
		}, (fileEntry) => {
			fileEntry.createWriter((writer) => {
				writer.onwritestart = (e) => {
					console.log('onwritestart');
				}
				writer.onwrite = (e) => {
					// 成功导出数据;
					setTimeout(() => {
						uni.hideLoading();
						uni.showToast({
							title: "成功导出",
							icon: "success"
						});
						console.log(`导出成功，文件位置：${path}/${documentName}.xlsx`);
						callback(`${path}/${documentName}.xlsx`);
					}, 1000);
				};
				// 写入内容;
				writer.write(fileData);
			}, function(e) {
				console.log(e.message);
				uni.hideLoading();
				uni.showToast({
					title: '导出失败,请确认是否授权文件权限',
					icon: 'none'
				});
			});
		},err=>{
			console.log(err);
			uni.hideLoading();
			uni.showToast({
				title: '导出失败,请确认是否授权文件权限',
				icon: 'none'
			});
		});
	});
}
 
function saveImg(name,base64){
	return new Promise((resolve,reject) => {
		createDir(name,(dirEntry,path,name) => {
			let bitmap = new plus.nativeObj.Bitmap('图片'+imgCount);
			bitmap.loadBase64Data(base64,res => {
				console.log(`图片${imgCount}加载base64成功`);
				let fileName = '_documents/导出的Excel/' + name + '/图片' + imgCount + '.jpg';
				bitmap.save(fileName,{overwrite:true,quality:100,format:'jpg'},res1 => {
					console.log(res1);
					console.log(`图片${imgCount}保存成功,路径:${fileName}`);
					bitmap.clear();
					resolve('success');
				},err1 => {
					console.log(err1);
					reject('fail');
				});
			},err => {
				console.log(err);
				reject('fail');
			});
		});
	});
}
 
function createDir(name,callback){
	plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, (fs) => {
		let rootObj = fs.root;
		let fullPath = rootObj.fullPath;
		rootObj.getDirectory('导出的Excel',{create:true},dirEntry => {
			dirEntry.getDirectory(name,{create:true},dirEntry2 => {
				let pathStr = fullPath.replace("/storage/emulated/0", "");
				pathStr += '导出的Excel/'+name;
				console.log(`目录${pathStr}创建成功`);
				callback(dirEntry2,pathStr,name);
			},err2=>{
				console.log(err2);
				uni.hideLoading();
				uni.showToast({
					title: '导出失败,请确认是否授权文件权限',
					icon: 'none'
				});
			});
		},err1=>{
			console.log(err1);
			uni.hideLoading();
			uni.showToast({
				title: '导出失败,请确认是否授权文件权限',
				icon: 'none'
			});
		});
	},err=>{
		console.log(err);
		uni.hideLoading();
		uni.showToast({
			title: '导出失败,请确认是否授权文件权限',
			icon: 'none'
		});
	});
}
 
export{ doExport };