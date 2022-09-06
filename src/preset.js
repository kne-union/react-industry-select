export const apis = {
    loadData: (() => {
        let cache;
        return () => {
            if (!cache) {
                cache = import('./industry.json');
            }
            return cache;
        };
    })(),
    getAllList: ()=>{
        return apis.loadData().then(({data}) => {
            return data
        });
    },
    getIndustry: (id) => {
        return apis.loadData().then(({data}) => {
            if(Array.isArray(id)){
                return data.filter(item=>{
                    return id.some(i=>item.code===i)
                })
            }
            if(typeof id === 'string'){
                return data.find(item=>item.code===id)
            }
            return null
        });
    }, 
    searchIndustries: (value) => {
        if (!value) {
            return Promise.resolve([]);
        }
        return apis.loadData().then(({data}) => {
            return data.filter(item=>item.level === '1').filter((item) => {
                return ['pinyin', 'chName', 'shortName', 'enName'].some((name) => {
                    return item[name].toUpperCase().indexOf(value.toUpperCase()) > -1;
                });
            }).map((item) => {
                return {
                    label: item.chName, 
                    value: item.code,
                    item
                };
            });
        });
    }, 
    getLeftList: (data) => data.filter(item=>item.level === '0'&&item.code!=="000"),
    getRightList: (data,id) => data.filter(item=>item.level === '1'&&item.parentCode===id),
    getChildById: (data,id) => data.filter(item=>item.level === '1'&&item.parentCode===id),
    getIndustryById: (data,id) => {
        if(Array.isArray(id)){
            return data.filter(item=>{
                return id.some(i=>item.code===i)
            })
        }
        if(typeof id === 'string'){
            return data.find(item=>item.code===id)
        }
        return null
    }, 
    getIndustryByName: (data,name) => {
        if(Array.isArray(id)){
            return data.filter(item=>{
                return id.some(i=>item.chName===i)
            })
        }
        if(typeof id === 'string'){
            return data.find(item=>item.chName===name)
        }
        return null
    }
};

const preset = (options) => {
    Object.assign(apis, options);
};

export default preset;

