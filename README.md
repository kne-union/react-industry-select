
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
    const [v,setV]=useState([{label:'xxx',value:"001001"},{label:'xxx',value:"420"}]);

    return <Button onClick={()=>{
        createIndustrySelect({
            labelInValue:true,
            defaultValue:v,
            size:3,
            onChange:(code,item)=>{
                setV(code);
            }
        })
    }}>
        <DisplayIndustry id={v.map(item=>item.value)}>{(list)=>{

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
    const [v,setV]=useState(["0028"]);

    return <Button onClick={()=>{
        createIndustrySelect({
            defaultValue:v,
            size:1,
            selectLevel: 2,
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

- 行业类别多选
- 多选层级
- IndustrySelect(@kne/react-industry-select),Antd(antd)

```jsx
const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const {useState}=React;

const BaseExample = ()=>{
    const [v,setV]=useState([{label:'xxx',value:"007"}]);

    return <Button onClick={()=>{
        createIndustrySelect({
            labelInValue:true,
            defaultValue:v,
            size:3,
            selectLevel: 2,
            onChange:(code)=>{
                setV(code);
            }
        })
    }}>
        <DisplayIndustry id={v.map(item=>item.value)}>{(list)=>{
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
|  labelInValue  | value是否包含label | boolean | false |


### IndustrySelect.createIndustrySelect
参数同上

### IndustrySelect.DisplayIndustry
#### 这是一个组件
|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|  id  | 选中的项的id，数组格式 | array | - |
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
| getIndustryByName(name)             |传入行业name返回行业数据|function|-|
| getChildById(id)     |通过一级id，获取二级行业|function|-|
| searchIndustries(searchStr) |通过关键字搜索行业，支持拼音首字母缩写|function|-|
