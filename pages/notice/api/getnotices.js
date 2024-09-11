import {http} from '@/utils/http'

export const getarticles = async (cates) =>{
	let additionid = cates.id==null?'':'&id='+cates.id
	let additiontypeName = cates.typeName==null?'':'&typeName='+cates.typeName
	let additionkeyword = cates.keyword==null?'':'&keyword='+cates.keyword
	let noticeurl='/notifications?isActive=1' + additionid + additiontypeName+ additionkeyword;
	console.log(noticeurl)
	const res = await http(noticeurl,'GET',{},);
	return res.data;
}