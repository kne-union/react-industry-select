
# react-industry-select


### 描述

行业选择器


### 安装

```shell
npm i --save @kne/react-industry-select
```


### 概述

行业选择器，可支持多选和单选，可以通过覆盖preset的apis的方法扩展此组件


### 示例

#### 示例代码

- 行业类别多选
- 多选
- IndustrySelect(@kne/react-industry-select),Antd(antd)

```jsx
const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const {useState}=React;

const BaseExample = ()=>{
    const [v,setV]=useState(["040","420"]);

    return <Button onClick={()=>{
        createIndustrySelect({
            defaultValue:v,
            size:3,
            onChange:(code)=>{
                setV(code);
            }
        })
    }}>
        <DisplayIndustry id={v}>{(list)=>{
            if(Array.isArray(list)){
                return list.map(item=>item.chName).join(",")
            }
            return list&&list.chName
        }}</DisplayIndustry>
    </Button>
};

render(<BaseExample />);

```

- 行业类别单选
- 单选
- IndustrySelect(@kne/react-industry-select),Antd(antd)

```jsx
const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const {useState}=React;

const BaseExample = ()=>{
    const [v,setV]=useState(["040"]);

    return <Button onClick={()=>{
        createIndustrySelect({
            defaultValue:v,
            size:1,
            onChange:(code)=>{
                setV(code);
            }
        })
    }}>
        <DisplayIndustry id={v}>{(list)=>{
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
|  id  | 选中的项的id，支持字符串或数组格式 | string/array | - |
|  children  | id是数组返回的也是数组，id是字符串，返回的是对象 | function({list}=>{}) | - |


