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

