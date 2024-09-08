import React, { useState } from 'react';
import {Form, Select, Input, Radio, Button, Space, Typography, Modal, Divider} from 'antd';
import { PlusOutlined, MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import '../../css/TopLayout.css';

const { Option } = Select;
const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const SiteSetting = ({ form }) => {
    const [siteType, setSiteType] = useState(null);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [isMatchModalVisible, setIsMatchModalVisible] = useState(false);
    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

    const siteTypes = [
        { value: 'typeA', label: 'タイプA' },
        { value: 'typeB', label: 'タイプB' },
    ];

    const siteList = [
        { id: '1', name: 'サイトA', url: 'https://siteA.com/urlno1' },
        { id: '2', name: 'サイトB', url: 'https://siteB.com/urlno2' },
        { id: '3', name: 'サイトC', url: 'https://siteC.com/urlno3' },
    ];

    const urlMatchTypes = [
        { value: 'contains', label: '含む' },
        { value: 'notContains', label: '含まない' },
        { value: 'exactMatch', label: '完全一致' },
        { value: 'endsWith', label: '後方一致' },
        { value: 'startsWith', label: '前方一致' },
    ];

    const plusPages = [
        { value: 'top', label: 'TOPページ' },
        { value: 'siteList', label: 'サイト一覧ページ' },
        { value: 'siteDetail', label: 'サイト詳細ページ' },
        { value: 'faq', label: 'よくある質問ページ' }
    ];

    const showMatchModal = () => {
        setIsMatchModalVisible(true);
    };

    const handleMatchOk = () => {
        setIsMatchModalVisible(false);
    };

    const handleMatchCancel = () => {
        setIsMatchModalVisible(false);
    };

    const showHelpModal = () => {
        setIsHelpModalVisible(true);
    };

    const handleHelpOk = () => {
        setIsHelpModalVisible(false);
    };

    const handleHelpCancel = () => {
        setIsHelpModalVisible(false);
    };

    const ExplanationModal = () => (
        <Modal
            title="マッチタイプとは"
            visible={isMatchModalVisible}
            onOk={handleMatchOk}
            onCancel={handleMatchCancel}
        >
            <Typography>
                <Paragraph>
                    URLのマッチタイプとは、指定したURLやドメインなどの文字がどのようにサイトのURLと一致するかを定義します。<br/>
                    以下は各マッチタイプの具体的な説明です。
                </Paragraph>
                <Paragraph>
                    <Text strong>含む：</Text> 指定したURLやドメインを含むすべてのページがポップアップ表示の対象となります。<br/>
                    例：'example.com'を指定した場合<br/>'https://example.com/page1'や'https://subdomain.example.com'のページでポップアップが表示されます。
                </Paragraph>
                <Paragraph>
                    <Text strong>含まない：</Text> 指定したURLやドメインを含まないすべてのページがポップアップ表示の対象となります。<br/>
                    例：'example.com'を指定した場合、'https://othersite.com'は対象となりますが、'https://example.com/page1'は対象外となります。
                </Paragraph>
                <Paragraph>
                    <Text strong>完全一致：</Text> 指定したURLやドメインと完全に一致するページのみがポップアップ表示の対象となります。<br/>
                    例：'https://example.com/page1'を指定した場合、そのURLのみが対象となり、'https://example.com/page2'は対象外となります。
                </Paragraph>
                <Paragraph>
                    <Text strong>後方一致：</Text> 指定したURLやドメインで終わるすべてのページがポップアップ表示の対象となります。<br/>
                    例：'/products'を指定した場合、'https://example.com/products'や'https://othersite.com/products'が対象となります。
                </Paragraph>
                <Paragraph>
                    <Text strong>前方一致：</Text> 指定したURLやドメインで始まるすべてのページがポップアップ表示の対象となります。<br/>
                    例：'https://example.com'を指定した場合、'https://example.com/page1'や'https://example.com/products'が対象となります。
                </Paragraph>
            </Typography>
        </Modal>
    );

    const ExplanationHeplModal = () => (
        <Modal
            title="使い方ガイド"
            visible={isHelpModalVisible}
            onOk={handleHelpOk}
            onCancel={handleHelpCancel}
        >
            <Typography>
                <Paragraph>
                    場合別の使い方の例です。
                </Paragraph>
                <Paragraph>
                    <Text strong>タイトル<br/></Text> 説明
                </Paragraph>
            </Typography>
        </Modal>
    );

    const handleSiteTypeChange = (value) => {
        setSiteType(value);
        setSelectedAreas([]);
        setSelectedSite(null);
        form.resetFields(['siteName', 'siteUrl', 'urlMatchType', 'selectedPage','manualUrls', 'urlSets']);
    };

    const handleSiteNameChange = (value) => {
        const selected = siteList.find(site => site.id === value);
        if (selected) {
            setSelectedSite(selected);
            form.setFieldsValue({
                selectedSiteName: selected.name,
                urlSets: [{ urlMatchType: undefined, siteUrl: selected.url }]
            });
        }
    };

    const handlePageChange = () => {
        setSelectedAreas([]);
    };

    const handleManualUrlChange = (value) => {
        form.setFieldsValue({ manualUrls: value });
    };

    return (
        <>
            <Form.Item
                name="siteType"
                label="種別選択"
                className="form-item-sitename"
                rules={[{ required: true, message: '種別を選択してください' }]}
            >
                <Select onChange={handleSiteTypeChange}>
                    {siteTypes.map(type => (
                        <Option key={type.value} value={type.value}>{type.label}</Option>
                    ))}
                </Select>
            </Form.Item>

            {(siteType === 'typeA') && (
                <>
                    <Form.Item
                        extra="ここで選んだサイトがポップアップ設定の対象になります。下記で他のサイトのURLを入力してもポップアップは表示されません。下記で指定できるタイプはここで選んだサイト内のURLマッチタイプです"
                        className="form-item-sitename"
                        name="siteName"
                        label="サイト名"
                        rules={[{ required: true, message: 'サイトを選択してください' }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            onChange={handleSiteNameChange}
                        >
                            {siteList.map(site => (
                                <Option key={site.id} value={site.id}>{site.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item className="form-item-sitename" name="selectedSiteName" hidden>
                        <Input />
                    </Form.Item>

                    {selectedSite && (
                        <>
                            <div className="form-item-sitename">
                                <Divider/>
                                <Space className="help-text" align="center">
                                    <Button type="link" onClick={showMatchModal} icon={<InfoCircleOutlined />}>
                                        マッチタイプとは？
                                    </Button>
                                </Space>
                                <ExplanationModal />

                                <Space className="help-text" align="center">
                                    <Button type="link" onClick={showHelpModal} icon={<InfoCircleOutlined />}>
                                        使い方ガイド
                                    </Button>
                                </Space>
                                <ExplanationHeplModal />
                            </div>
                            <Form.List name="urlSets">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} align="baseline">
                                                <Form.Item
                                                    extra="phpは常に含まれません"
                                                    className="form-item-sitename"
                                                    {...restField}
                                                    name={[name, 'urlMatchType']}
                                                    rules={[{ required: true, message: 'URLの指定タイプを選択してください' }]}
                                                >
                                                    <Select style={{ width: 200 }} placeholder="URLのマッチタイプ">
                                                        {urlMatchTypes.map(type => (
                                                            <Option key={type.value} value={type.value}>{type.label}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    style={{height: 120, width: 500}}
                                                    extra="改行で複数入力"
                                                    className="form-item-sitename"
                                                    {...restField}
                                                    name={[name, 'siteUrl']}
                                                    rules={[{ required: true, message: 'URLを入力してください' }]}
                                                >
                                                    <TextArea
                                                        placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                                                    />
                                                    {/*<Input style={{ width: 300 }} placeholder="例：https://~~~~、saimu、al" />*/}
                                                </Form.Item>
                                                {fields.length > 1 && (
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                )}
                                            </Space>
                                        ))}
                                        <Form.Item className="form-item-sitename">
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                URLセットを追加
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )}
                </>
            )}

            {siteType === 'typeB' && (
                <>
                    <Form.Item
                        className="form-item-sitename"
                        name="urlInputMethod"
                        label="ポップアップを表示するページの指定方法"
                        rules={[{required: true, message: 'URL入力方法を選択してください'}]}
                    >
                        <Radio.Group>
                            <Radio value="page">ページで指定</Radio>
                            <Radio value="manual">URL手動入力で指定</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        className="form-item-sitename"
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.urlInputMethod !== currentValues.urlInputMethod}
                    >
                        {({getFieldValue}) => {
                            const urlInputMethod = getFieldValue('urlInputMethod');
                            if (urlInputMethod === 'page') {
                                return (
                                    <>
                                        <Form.Item
                                            className="form-item-sitename"
                                            name="selectedPlusPage"
                                            label="ページ選択"
                                            rules={[{required: true, message: 'ページを選択してください'}]}
                                        >
                                            <Select onChange={handlePageChange}>
                                                {plusPages.map(page => (
                                                    <Option key={page.value} value={page.value}>{page.label}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </>
                                );
                            } else if (urlInputMethod === 'manual') {
                                return (
                                    <>
                                        <div className="form-item-sitename">
                                            {/*<Divider/>*/}
                                            <Space className="help-text" align="center">
                                                <Button type="link" onClick={showMatchModal}
                                                        icon={<InfoCircleOutlined/>}>
                                                    マッチタイプとは？
                                                </Button>
                                            </Space>
                                            <ExplanationModal/>
                                        </div>
                                        <Form.Item
                                            extra="phpは常に含みません"
                                            className="form-item-sitename"
                                            name="urlMatchType"
                                            label="URLのマッチタイプ選択"
                                            rules={[{required: true, message: 'URLの指定タイプを選択してください'}]}
                                        >
                                            <Select>
                                                {urlMatchTypes.map(type => (
                                                    <Option key={type.value} value={type.value}>{type.label}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            className="form-item-sitename"
                                            name="manualUrls"
                                            label="URL入力（1行に1つのURLを入力してください）"
                                            rules={[{required: true, message: 'URLを入力してください'}]}
                                        >
                                            <TextArea
                                                style={{height: 120, resize: 'vertical'}}
                                                onChange={(e) => handleManualUrlChange(e.target.value)}
                                                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                                            />
                                        </Form.Item>
                                    </>
                                );
                            }
                            return null;
                        }}
                    </Form.Item>
                </>
            )}
        </>
    );
};

export default SiteSetting;