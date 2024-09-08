import React, { useEffect } from 'react';
import { Form, Radio, Space } from 'antd';
import '../../css/TopLayout.css';

const CloseButtonSetting = ({ form, initialData = {} }) => {
    let { closeButtonType = '' } = initialData;

    useEffect(() => {
        let buttonPosition = '';
        let buttonColor = '';
        if (closeButtonType !== '') {
            let position = closeButtonType.slice(0, 2);
            let color = closeButtonType.slice(2);
            buttonPosition = position === "右上" ? "upperRight" : "directlyBelow";
            buttonColor = color === "白色" ? "white" : "black";
        }
        form.setFieldsValue({
            closeButtonPosition: buttonPosition,
            closeButtonColor: buttonColor
        });
    }, [form, closeButtonType]);

    return (
        <div className="close-button-setting">
            <div className="condition-setting">
                <Form.Item rules={[{ required: true}]} className="form-item" name="closeButtonPosition" label="位置">
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value="upperRight">右上</Radio>
                            <Radio value="directlyBelow">直下</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item rules={[{ required: true}]} className="form-item" name="closeButtonColor" label="色">
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value="white">白色</Radio>
                            <Radio value="black">黒色</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </div>
        </div>
    );
}

export default CloseButtonSetting;