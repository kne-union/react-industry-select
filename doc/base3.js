const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const {useState}=React;

const BaseExample = ()=>{
    const [v,setV]=useState([{label:'xxx',value:"001001"}]);

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
