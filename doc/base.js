const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;

const BaseExample = ()=>{
    return <Button onClick={()=>{
        createIndustrySelect({
            defaultValue:["040"]
        })
    }}>
        <DisplayIndustry id={"040"}>{(list)=>list.chName}</DisplayIndustry>
    </Button>
};

render(<BaseExample />);
