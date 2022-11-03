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
