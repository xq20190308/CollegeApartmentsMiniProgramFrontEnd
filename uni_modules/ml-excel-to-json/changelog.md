## 2.0.1（2023-04-20）
上传示例项目
## 2.0.0（2023-04-20）
### 云函数新增
- sheetList.index 新增-1值可自动获取活动工作表内容
- sheetList.autoKey 可通过必要的字段判断是否截断数据。注意该功能只能与keysIndex使用不支持与keys使用
- 现在jsonToexcel公共函数同时支持3种传输形式，分别是原方案的5参传入以及优化后的2参<data,options>以及最为常见的1参传入<options>。他们并无太多差别只是将参数写入options中进行传输。
### 云函数优化
- 性能优化,现在您无需提取数据的sheet表将不在进行数据提取。
- 框架优化
### 前端新增
- 新增 dataToExcel 数据转表格
- 新增 excelToData 表格转数据
- js封装,现在您可以通过dataToExcel以及excelToFile来进行快捷的上传及下载excel表格详情请自行下载示例项目进行查看
- import {excelToData,dataToExcel} from '@/uni_modules/ml-excel-to-json/jssdk/parseExcel.js'
## 1.3.1（2023-04-17）
options增加appendHeaderData属性
## 1.1.1（2023-04-07）
现在jsonToExcel支持合并单元格了
## 1.1.0（2023-04-07）
jsonToExcel现在可以进行合并单元格并导出了
## 1.0.6（2022-06-06）
增加excel样式编辑
## 1.0.5（2022-06-01）
增加excelToarray函数,可以直接获取sheetname,方便自行处理数据

excelTojson函数现在已经可以获取sheet页的名称了

## 1.0.4（2022-05-20）
更新
## 1.0.3（2022-05-20）
现已支持json转excel,支持类型base64与file,base64请自行编写转换及下载逻辑,file文件自动上传至云存储并返回url需自行编辑后续下载逻辑.
因node-xlsx 在npm install 安装的情况下目录大小会达到15M 即现已改为sheetjs已减轻云函数大小至250K
## 1.0.2（2022-05-19）
取消基于node_xlsx,改为采用sheetJS完成操作,降低云函数体积,调整回传数据为json,回传参数加入key值
## 1.0.0（2021-11-10）
初次发布
