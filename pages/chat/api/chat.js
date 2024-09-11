export const getimage=(avatarUrl)=>{
	console.log("avatarUrl:",avatarUrl)
	uni.getImageInfo({
		src:avatarUrl,
		complete(res){
			console.log(res)
		}
	})
	uni.downloadFile({
		url:avatarUrl,
		success: (res) => {
			console.log("res:",res)
			let FileSystemManager=wx.getFileSystemManager()
			FileSystemManager.saveFile({
				tempFilePath:res.tempFilePath,
				success: (success) => {
					console.log("success",success)
				},
				fail: (e) => {
					console.log("e",e)
				}
			})
		},
		fail: (err) => {
			console.log("err",err)
		}
	})
}