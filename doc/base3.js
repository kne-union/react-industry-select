const {createIndustrySelect,DisplayIndustry}=IndustrySelect;
const {Button}=Antd;
const Form = KneForm;
const {useState}=React;

const BaseExample = ()=>{
    const [v,setV]=useState(["040","420"]);

    return <Form>
        <IndustrySelect/>
    </Form>
};

render(<BaseExample />);
