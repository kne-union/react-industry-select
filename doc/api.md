### 其他属性参考antd modal的props
|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|  title  | 模态框标题 | string | - |
|  size  | 支持多选 | boolean | 1 |
|  defaultValue  | 默认选中项 | array | - |
|  onChange  | 选中触发事件 | function(value) | - |


### IndustrySelect.createIndustrySelect
参数同上

### IndustrySelect.DisplayIndustry
#### 这是一个组件
|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|  id  | 选中的项的id，支持字符串或数组格式 | string/array | - |
|  children  | id是数组返回的也是数组，id是字符串，返回的是对象 | function({list}=>{}) | - |


#### preset

| 属性名          | 说明                    | 类型     | 默认值 |
|--------------|-----------------------|--------|-----|
|options| 需要覆盖的参数,具体参数参考下面api部分 |object|-|

#### api

| 属性名                     | 说明                    | 类型     | 默认值 |
|-------------------------|-----------------------|--------|-----|
| loadData                | 获取行业数据，默认采用内置数据|function|-|
| getAllList          |获取所有行业数据列表|function|-|
| getLeftList            |获取左侧一级行业列表|funciton|-|
| getAllRightList                 |获取包含一级二级数据列表|function|-|
| getIndustry(id)             |传入行业ID返回行业数据|function|-|
| getChildById(id)     |通过一级id，获取二级行业|function|-|
| searchIndustries(searchStr) |通过关键字搜索行业，支持拼音首字母缩写|function|-|