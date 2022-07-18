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
    getLeftList: () => {
        return apis.loadData().then(({data}) => {
            return data.filter(item=>item.level === '0'&&item.code!=="000")
        });
    },
    getRightList: (id) => {
        return apis.loadData().then(({data}) => {
            return data.filter(item=>item.level === '1'&&item.parentCode===id)
        });
    },
    getIndustry: (id) => {
        return apis.loadData().then(({data}) => {
            return data.find(item=>item.level === '1'&&item.code===id)
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
                    value: item.code
                };
            });
        });
    }
};

const preset = (options) => {
    Object.assign(apis, options);
};

export default preset;

