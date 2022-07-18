import React, {useState, useEffect, useRef} from 'react';
import {Modal, Row, Col, Tabs, Result, Spin, Menu, Space, Tag, Empty, Divider, Select, Button, message} from 'antd';
import {withLayer} from "@kne/antd-enhance";
import {apis as _apis} from './preset';

export const RemoteData = ({loader, options, onLoad, children}) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const onLoadRef = useRef(onLoad);
    onLoadRef.current = onLoad;
    useEffect(() => {
        Promise.resolve(loader(options)).then((data) => {
            onLoadRef.current && onLoadRef.current(data);
            setData(data);
        }).catch((e) => {
            console.error(e);
            setError(e);
        });
    }, [loader, options]);
    if (error) {
        return <Result status="error" title="获取数据发生错误" subTitle={error.message}/>
    }
    if (!data) {
        return <Spin/>
    }
    return children(data)
};

const {TabPane} = Tabs;

const SearchInput = ({onChange}) => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    return <Select value={value} onChange={(value) => {
        onChange && onChange(value);
        setValue(null);
        setData([]);
    }} showSearch placeholder="搜索城市" style={{width: '250px'}}
                   defaultActiveFirstOption={false}
                   showArrow={false}
                   notFoundContent={null}
                   onSearch={(value) => {
                       return apis.searchCities(value).then((list) => {
                           setData(list);
                       });
                   }}
                   filterOption={false} options={data}/>
};

export const apis = _apis;

export const DisplayCity = ({id, children}) => {
    return <RemoteData loader={apis.getCity} options={id}>{children}</RemoteData>
};

export {default as preset} from './preset';


const CitySelect = ({title, size, defaultValue, onChange, ...props}) => {
    const [cities, setCities] = useState(defaultValue);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const appendCity = (code) => {
        if (size === 1) {
            setCities([code]);
            onChange([code]);
            return;
        }
        if (cities.length >= size) {
            message.error(`最多选择${size}个`);
            return;
        }
        return apis.combineCities(code, cities).then((list) => {
            setCities(list);
            size === 1 && onChange(list);
        })
    };
    const removeCity = (code) => {
        setCities((list) => {
            const newList = list.slice(0);
            const index = list.indexOf(code);
            newList.splice(index, 1);
            return newList;
        });
    };
    return <Modal {...props} title={<Row align="middle" justify="space-between">
        <Col>{title}</Col>
        <Col pull={2}><SearchInput onChange={(value) => {
            appendCity(value);
        }}/></Col>
    </Row>} footer={null}>
        <Row>
            <Col span={6}>
                <Tabs destroyInactiveTabPane>
                    {[{key: 'china', tab: '国内', loader: apis.getChinaCities}, {
                        key: 'foreign', tab: '海外', loader: apis.getCountries
                    }].map((item) => <TabPane tab={item.tab} key={item.key}>
                        <div style={{
                            height: '400px', overflowY: 'auto'
                        }}>
                            <RemoteData loader={item.loader} onLoad={(data) => {
                                data && data.length && setSelectedKeys([data[0].id]);
                            }}>{(data) => {
                                return <Menu selectedKeys={selectedKeys} onSelect={(item) => {
                                    setSelectedKeys([item.key]);
                                }}>
                                    {data.map((item) => <Menu.Item key={item.id}>{item.name}</Menu.Item>)}
                                </Menu>;
                            }}</RemoteData>
                        </div>
                    </TabPane>)}
                </Tabs>
            </Col>
            <Col span={18} style={{
                display: 'flex', flexDirection: 'column'
            }}>
                <Row style={{flex: 1}}>
                    <Col offset={1} flex={1}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            {selectedKeys[0] ? <>
                                <Divider orientation="left"><RemoteData loader={apis.getCity}
                                                                        options={selectedKeys[0]}>{(data) => data.city.name}</RemoteData></Divider>
                                <RemoteData loader={apis.getList} options={selectedKeys[0]}>{(data) => {
                                    return <Space wrap>
                                        {data.map(({code, name}) => <Tag.CheckableTag
                                            checked={cities.indexOf(code) > -1}
                                            onChange={(checked) => {
                                                if (checked) {
                                                    appendCity(code);
                                                } else {
                                                    removeCity(code);
                                                }
                                            }}
                                            key={code}>{name}</Tag.CheckableTag>)}
                                    </Space>;
                                }}</RemoteData></> : <Empty/>}

                        </Space>
                    </Col>
                </Row>
                <Row wrap={false} align="middle">
                    <Col offset={1} style={{
                        whiteSpace: 'nowrap'
                    }}>已选{size > 1 ? <>（{cities.length}/{size}）</> : null}：</Col>
                    <Col flex={1} style={{
                        maxHeight: '70px', overflowY: 'auto'
                    }}>
                        {cities.map((id) => {
                            return <DisplayCity key={id} id={id}>{(data) => {
                                return <Tag closable={size > 1} onClose={() => {
                                    removeCity(id);
                                }}>{data.parent ? `${data.parent.name}·${data.city.name}` : data.city.name}</Tag>;
                            }}</DisplayCity>
                        })}
                    </Col>
                    {size > 1 ? <Col>
                        <Button type="primary" onClick={() => {
                            onChange(cities);
                        }}>确认</Button>
                    </Col> : null}

                </Row>
            </Col>
        </Row>
    </Modal>;
};

CitySelect.defaultProps = {
    title: "请选择城市", size: 1, defaultValue: [], onChange: () => {
    }
};

export const createCitySelect = withLayer(({close, onChange, ...props}) => {
    return <CitySelect {...props} onChange={(value) => {
        onChange && onChange(value);
        close();
    }}/>
});

export default CitySelect;