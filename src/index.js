import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Row, Col, Checkbox, Result, Space, Tag, Menu, Select, Button, message, Badge } from 'antd';
import { withLayer } from "@kne/antd-enhance";
import { apis as _apis } from './preset';
import get from 'lodash/get';
import './index.scss';
import cloneDeep from 'lodash/cloneDeep';

const getCount = (data, id, industries = []) => {
	const childId = (data || []).filter(item => item.parentCode === id && industries.indexOf(item.code) > -1).map(item => item.code);
	return childId.length;
}

export const RemoteData = ({ loader, options, onLoad, children }) => {
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
		return <Result status="error" title="获取数据发生错误" subTitle={error.message} />
	}
	
	if (!data||get(data,'length',0)===0) {
		return "-"
	}
	return children(data)
};

const SearchInput = ({ dataSource,onChange, industriesCode ,level}) => {
	const [value, setValue] = useState(null);
	const [data, setData] = useState([]);
	return <Select className='industry-modal-search' value={value} onChange={(value) => {
		if (industriesCode.indexOf(value) > -1) return;
		onChange && onChange(_apis.getIndustryById(dataSource,value));
		setValue(null);
		setData([]);
	}} showSearch placeholder="输入行业关键词" style={{ width: '250px' }}
		defaultActiveFirstOption={false}
		showArrow={false}
		notFoundContent={null}
		onSearch={(value) => {
			return apis.searchIndustries(value,level).then((list) => {
				setData(list);
			});
		}}
		filterOption={false}
		options={data} />
};

export const apis = _apis;

export const DisplayIndustry = ({ id, children }) => {
	if(!Array.isArray(id)){
		id=[id];
	}
	return <RemoteData loader={apis.getIndustry} options={id}>{children}</RemoteData>
};

export { default as preset } from './preset';


const IndustrySelect = ({ dataSource, labelInValue, onCancel, title, size, defaultValue, onChange, modalTitleRight, selectLevel, ...props }) => {
	const [industries, setIndustries] = useState((() => {
		if (!Array.isArray(defaultValue)) return [];
		const _default = labelInValue ? defaultValue.map(item => get(item, "value")) : defaultValue;

		return _default.map((id,index) => {
			const _filter = apis.getIndustryById(dataSource, id)||{};

			if (_filter) {
				return {
					label: _filter.chName||"-",
					value: id,
					parentCode: _filter.parentCode,
					level: _filter.level
				}
			}
			return defaultValue[index]
		})
	})());
	const [selectedKeys, setSelectedKeys] = useState();

	const industriesCode = useMemo(() => {
		return industries.map(item => get(item, 'value', ""));
	}, [industries]);

	const menuList = useMemo(() => {
		return apis.getLeftList(dataSource)
	}, [dataSource]);

	const rightList = useMemo(() => {
		return apis.getRightList(dataSource, selectedKeys);
	}, [selectedKeys, dataSource])

	const appendIndustry = async (obj) => {
		const { chName: label, level, parentCode, code: value } = obj;

		let _Industrys = cloneDeep(industries);

		if (_Industrys.length >= size) {
			message.error(`最多选择${size}个`);
			return;
		}

		if (level === '0') {
			_Industrys = _Industrys.filter(item => item.parentCode !== value);
		}

		_Industrys.push({ label, level, parentCode, value });

		setIndustries([..._Industrys]);
	};
	const removeIndustry = (code) => {
		setIndustries((list) => {
			let _list = cloneDeep(list);
			if (code.level === '0') {
				_list = list.filter(item => item.parentCode !== code)
			}
			const index = _list.map(item => get(item, 'value')).indexOf(code);
			_list.splice(index, 1);
			return _list;
		});
	};
	useEffect(()=>{
		if (get(defaultValue,'length',0)>0) {
			const _filter = apis.getIndustryById(dataSource, labelInValue?get(defaultValue,"[0].value"):defaultValue[0]);
			if(_filter){
				setSelectedKeys(_filter.parentCode?_filter.parentCode:_filter.code)
			}
			return;
		}
		setSelectedKeys(get(menuList, '[0].code'))
	},[menuList,defaultValue,dataSource,labelInValue])

	return <Modal {...props} width={1000} centered
		wrapClassName="industry-modal"
		onCancel={onCancel}
		title={<Row align="middle" justify="space-between">
			<Col>{title}</Col>
			<Col pull={1}>
				<SearchInput
				dataSource={dataSource}
				level={selectLevel}
					industriesCode={industriesCode}
					labelInValue={labelInValue}
					onChange={(value) => {
						appendIndustry(value);
						setSelectedKeys(value.parentCode?value.parentCode:value.code);
					}} />
			</Col>
			{modalTitleRight && <Col pull={2}>
				{modalTitleRight}
			</Col>}
		</Row>} footer={
			<Space className='industry-modal-footer' direction='vertical' size={12}>
				<Row align='middle' justify='start'>
					<Space wrap={false} size={8} className='industry-modal-selected'>
						<span style={{
							whiteSpace: 'nowrap'
						}}>已选{industries.length}/{size}）：</span>
						{industries.map(({ value, label }, index) => {
							return <Tag key={value} className='industry-modal-tag' closable={true} onClose={() => {
								removeIndustry(value);
							}}>{label}</Tag>;
						})}
					</Space>
				</Row>
				<Row justify='end'>
					<Space size={8} >
						<Button onClick={onCancel}>取消</Button>
						<Button type="primary" onClick={() => {
							onChange(industries);
						}}>确认</Button>

					</Space>
				</Row> 
			</Space>}>
		<Row wrap={false}>
			<Col className='industry-modal-left-col'>
				<div className='industry-modal-left'>
					<Menu selectedKeys={selectedKeys} onSelect={(item) => {
						setSelectedKeys(item.key);
					}}>
						{menuList.map((item) => {
							const count = getCount(dataSource, item.code, industriesCode);
							return <Menu.Item key={item.code}>
								<Space wrap={false} size={0} className='industry-name'>
									{selectLevel > 1 ? <Space>
										<Checkbox
											checked={industriesCode.indexOf(item.code) > -1}
											indeterminate={industries.some(key => key.parentCode === item.code && industriesCode.indexOf(item.code) === -1)}
											onChange={(e) => {
												const checked = e.target.checked;

												if (checked) {
													appendIndustry(item);
												} else {
													removeIndustry(item.code);
												}
											}} />
										<span>{item.chName}</span>
									</Space> : <>
										<Space justify="center">
											<span>{item.chName}</span>
											{count > 0 && <span className="industry-modal-count">({count})</span>}
										</Space>
									</>}

								</Space>
							</Menu.Item>;
						})}
					</Menu>
				</div>
			</Col>
			<Col flex={1} className='industry-modal-right'>
			<Row style={{ flex: 1 }} className="industry-modal-right-content">
						<Col flex={1}>
							<Space direction="vertical" style={{ width: '100%' }}>
								<Row wrap justify='space-between'>
									{(rightList || []).map((item) => <Col span={8} key={item.code}>
										<Checkbox
											disabled={selectLevel > 1 && industriesCode.indexOf(item.parentCode) > -1 ? true : false}
											checked={selectLevel > 1 && industriesCode.indexOf(item.parentCode) > -1 ? true : industriesCode.indexOf(item.code) > -1}
											onChange={(e) => {
												const checked = e.target.checked;
												if (checked) {
													appendIndustry(item);
												} else {
													removeIndustry(item.code);
												}
											}}
										>{item.chName}</Checkbox>
									</Col>)}
								</Row>

							</Space>
						</Col>
					</Row>
			</Col>
		</Row>
	</Modal>
};



IndustrySelect.defaultProps = {
	title: "请选择行业",
	size: 1,
	defaultValue: [],
	selectLevel: 1,
	labelInValue: false,
	onChange: () => {
	}
};

export const createIndustrySelect = withLayer(({ close, onChange, labelInValue, ...props }) => {
	return <RemoteData loader={apis.getAllList}>{(dataSource) => {
		return <IndustrySelect {...props}
			dataSource={dataSource}
			labelInValue={labelInValue}
			onCancel={close}
			onChange={(value) => {
				let changeValue = []
				if (get(value, 'length', 0) > 0) {
					changeValue = labelInValue ? value.map(item => ({ label: get(item, "label"), value: get(item, 'value') })) :
						value.map(item => get(item, "value"))
				}

				onChange && onChange(changeValue);
				close();
			}} />
	}}</RemoteData>

});

export default IndustrySelect;