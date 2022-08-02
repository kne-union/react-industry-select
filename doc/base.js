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
