import useDictStore from '@/store/modules/dict'
import { getDicts } from '@/api/system/dict/data'
import { ref, toRefs } from 'vue';
/**
 * 获取字典数据
 */
export function useDict(dictType) {
  console.log(dictType)
  const res = ref([]);
  const dicts = useDictStore().getDict(dictType);
  if (dicts) {
  // if (false) {
	res.value = dicts;
  } else {
	getDicts(dictType).then(resp => {
	  res.value = resp.data.map(p => ({ label: p.dictLabel, value: p.dictValue, class: p.listClass}))
	  useDictStore().setDict(dictType, res.value);
	})
  }
return res;
}