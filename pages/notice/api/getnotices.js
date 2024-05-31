import {http} from '@/utils/http'

export const getarticles = async (cates) =>{
	console.log("分类请求的参数",cates);
	let additionid = '';
	if(cates.id!=null){
		additionid='&id='+cates.id
	}
	let additiontypeName = '';
	if(cates.typeName!=null){
		additiontypeName='&typeName='+cates.typeName
	}
	let additionkeyword = '';
	if(cates.keyword!=null){
		additionkeyword='&keyword='+cates.keyword
	}
	// let additionid = '';
	// if(cates.id!=null){
	// 	additionid='&id='+cates.id
	// }
	let noticeurl='/notifications?isActive=1' + additionid + additiontypeName+ additionkeyword;
	// if(cates!=null){
	// 	noticeurl='/notifications?id='+cates;
	// }
	//获取通知数据
	const res = await http(noticeurl,'GET',{},)
	
	console.log("封装后请求的结果",res);
	let result = res.data;
	console.log("result",result);
	return result;
}