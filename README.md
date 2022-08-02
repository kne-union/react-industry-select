
# react-industry-select


### 描述

行业选择器


### 安装

```shell
npm i --save @kne/react-industry-select
```


### 概述

全国城市选择器


### 示例

#### 示例代码

- 行业类别
- 选择行业类别，可支持多选，数据可以自己扩展
- IndustrySelect(@kne/react-industry-select),Antd(antd)

```jsx
const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const BaseExample = ()=>{
    return <Button onClick={()=>{
        createIndustrySelect({
            defaultValue:["040","420"],
            size:3
        })
    }}>
        <DisplayIndustry id={["040","420"]}>{(list)=>{
            if(Array.isArray(list)){
                return list.map(item=>item.chName).join(",")
            }
            return list&&list.chName
        }}</DisplayIndustry>
    </Button>
};

render(<BaseExample />);

```


### API

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
|  id  | 选中的项的id | string | - |


