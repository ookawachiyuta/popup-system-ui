import React from 'react';
import { Form, Checkbox, Button } from 'antd';
import '../../css/TopLayout.css';

const FinishSetting = ({ form }) => {
    const isConfirmed = Form.useWatch('isConfirmed', form);

    return (
        <div className="finish-setting">
            <div className="confirm-section">
                <Form.Item
                    name="isConfirmed"
                    valuePropName="checked"
                >
                    <Checkbox>
                        設定内容にお間違いないか、今一度ご確認ください。
                    </Checkbox>
                </Form.Item>
            </div>
            <div className="publish-section">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!isConfirmed}
                    >
                        公開
                    </Button>
                </Form.Item>
            </div>
        </div>
    );
}

export default FinishSetting;