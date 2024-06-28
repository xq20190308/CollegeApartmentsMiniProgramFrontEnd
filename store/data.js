import { defineStore } from 'pinia'
import {http} from '../utils/http.js'
import { reactive,ref,computed } from "vue";
export const useDataStore = defineStore('Data', ()=>{
	const classes = ref([])
	const getclasses = async()=>{//http请求在初始化登录时调用
		const res = await http('/class/get-all','GET',{},)
		console.log("getclasses res",res.data)
		classes.value = res.data;
		classes.value=[{
		text: "专业一",
		value: "1-0-0",
		children: [{
			text: "一年级",
			value: "1-1-0",
			children: [{
				text: "1.1.1班",
				value: "1-1-1"
			},
			{
				text: "1.1.2班",
				value: "1-1-2"
			}]
		},{
			text: "二年级",
			value: "1-2-0",
			children: [{
				text: "1.2.1班",
				value: "1-2-1"
			},
			{
				text: "1.2.1班",
				value: "1-2-2"
			}]
		}]
	},{
		text: "专业二",
		value: "2-0-0",
		children: [{
			text: "一年级",
			value: "2-1-0",
			children: [{
				text: "2.1.1班",
				value: "2-1-1"
			},
			{
				text: "2.1.2班",
				value: "2-1-2"
			}]
		},{
			text: "二年级",
			value: "2-2-0",
			children: [{
				text: "2.2.1班",
				value: "2-2-1"
			},
			{
				text: "2.2.2班",
				value: "2-2-2"
			}]
		}]
	},{
		text: "专业三",
		value: "3-0-0",
		children: [{
			text: "一年级",
			value: "3-1-0",
			children: [{
				text: "3.1.1班",
				value: "3-1-1"
			},
			{
				text: "3.1.2班",
				value: "3-1-2"
			}]
		},{
			text: "二年级",
			value: "3-2-0",
			children: [{
				text: "3.2.1班",
				value: "3-2-1"
			},
			{
				text: "3.2.2班",
				value: "3-2-2"
			}]
		}]
	},]
	}
	return {classes,getclasses}
})