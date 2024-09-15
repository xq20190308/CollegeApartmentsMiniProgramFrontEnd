import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
export const useGradesStore = defineStore('Grades', ()=>{
	const  Grades= ref([])
	return {Grades}
})