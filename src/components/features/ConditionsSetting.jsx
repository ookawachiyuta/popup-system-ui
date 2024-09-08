import React, { useEffect } from 'react';
import { Form, Radio, Input, Space } from 'antd';
import '../../css/TopLayout.css';

const ConditionSetting = ({ form, initialData = {} }) => {
    let { settion = '', delayDisplaySeconds = '' } = initialData;

    useEffect(() => {
        let timing = 'immediately';
        let timingSeconds = '';
        let frequency = 'once-per-session';
        if (delayDisplaySeconds !== '即時') {
            timing = 'delayed';
            timingSeconds = delayDisplaySeconds.replace('秒後', '');
        }
        if (settion === '毎回') {
            frequency = 'every-time';
        }
        form.setFieldsValue({
            timing,
            timingSeconds,
            frequency
        });
    }, [form, settion, delayDisplaySeconds]);

    return (
        <div className="condition-setting">
            <Form.Item rules={[{ required: true}]} className="form-item" name="timing" label="表示するタイミング">
                <Radio.Group>
                    <Space direction="vertical">
                        <Radio value="immediately">ページ訪問後すぐに表示</Radio>
                        <Radio value="delayed">
                            ページ訪問後
                            <Form.Item name="timingSeconds" noStyle>
                                <Input
                                    type="number"
                                    style={{ width: 100, margin: '0 8px' }}
                                    min={0}
                                />
                            </Form.Item>
                            秒で表示
                        </Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>

            <Form.Item rules={[{ required: true}]} className="form-item" name="frequency" label="頻度">
                <Radio.Group>
                    <Space direction="vertical">
                        <Radio value="once-per-session">1セッション1回まで</Radio>
                        <Radio value="every-time">毎回表示</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
        </div>
    );
}

export default ConditionSetting;