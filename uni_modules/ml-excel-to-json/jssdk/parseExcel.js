async function urlTobase64(url) {
	const res = await uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer'
	});
	const tempBlob = res.find(item =>{
		return item && item.data
	})
	let base64 = uni.arrayBufferToBase64(tempBlob.data); //把arraybuffer转成base64
	return base64
}

async function downloadXLSX(base64Data, options) {

	var arr = base64Data.split(',');
	var bytes = atob(arr[1]);
	let ab = new ArrayBuffer(bytes.length);
	let ia = new Uint8Array(ab);
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	var blob = new Blob([ab], {
		type: arr[0]
	});
	var url = URL.createObjectURL(blob);
	// #ifdef H5
	var a = document.createElement('a');
	a.href = url;
	a.download = options.fileName + '.xlsx';
	a.click();
	return true;
	// #endif
	// #ifndef H5
	const e = await uni.downloadFile({
		url: url
	})
	return e
	// #endif

}
/*
 * name 云函数名
 * sheetList []
 */
export const excelToData = async function(name,sheetList = []) {
	const res = await uni.chooseFile({
		count: 1,
		extension: ['.xls', '.xlsx']
	});
	const tempFile = res.find(item =>{
		return item && item.tempFilePaths.length > 0
	})
	const base = await urlTobase64(tempFile.tempFilePaths[0]);
	const file = await uniCloud.callFunction({
		name: name,
		data: {
			data: base,
			sheetList
		}
	})
	return file
}

/*
 * name 云函数名
 * options Object {parmas,autoDownload,fileName}
 */
export const dataToExcel = async function(name,options) {
	const res = await uniCloud.callFunction({
		name: name,
		data: options.params
	})
	if(options.autoDownload){
		return await downloadXLSX(res.result.data, {
			fileName:options.fileName
		})
	}else{
		return res
	}
}