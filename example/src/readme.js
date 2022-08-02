import * as component_13 from '@kne/react-industry-select';
import * as component_14 from 'antd';
const readmeConfig = {
    name: `@kne/react-industry-select`,
    description: `行业选择器`,
    summary: `<p>全国城市选择器</p>`,
    api: `<h3>其他属性参考antd modal的props</h3>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>title</td>
<td>模态框标题</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>size</td>
<td>支持多选</td>
<td>boolean</td>
<td>1</td>
</tr>
<tr>
<td>defaultValue</td>
<td>默认选中项</td>
<td>array</td>
<td>-</td>
</tr>
<tr>
<td>onChange</td>
<td>选中触发事件</td>
<td>function(value)</td>
<td>-</td>
</tr>
</tbody>
</table>
<h3>IndustrySelect.createIndustrySelect</h3>
<p>参数同上</p>
<h3>IndustrySelect.DisplayIndustry</h3>
<h4>这是一个组件</h4>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>选中的项的id</td>
<td>string</td>
<td>-</td>
</tr>
</tbody>
</table>`,
    example: {
        isFull: false,
        className: `react_industry_select_8c848`,
        style: ``,
        list: [{
    title: `行业类别`,
    description: `选择行业类别，可支持多选，数据可以自己扩展`,
    code: `const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
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

`,
    scope: [{
    name: "IndustrySelect",
    packageName: "@kne/react-industry-select",
    component: component_13
},{
    name: "Antd",
    packageName: "antd",
    component: component_14
}]
}]
    }
};
export default readmeConfig;
