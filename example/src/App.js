import IndustrySelect,{createIndustrySelect} from '@kne/react-industry-select';
import 'antd/dist/antd.css';

const App = () => {
    createIndustrySelect({
        defaultValue:['040']
    })
    return null;
};

export default App;