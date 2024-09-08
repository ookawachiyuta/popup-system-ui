import React, { useEffect } from 'react';
import {Form, Input, Upload, message } from 'antd';
import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';
import '../../css/TopLayout.css';
import Dragger from 'antd/es/upload/Dragger.js';

const FileDataSetting = ({ form, initialData = {} }) => {
    const {measureName = '', popupImageUrl = '', imageEditDataUrl = '' } = initialData;

    useEffect(() => {
        if (popupImageUrl) {
            form.setFieldsValue({
                popupImage: [{
                    uid: '-1',
                    name: 'existing-popup-image',
                    status: 'done',
                    url: popupImageUrl,
                }],
            });
        }
        if (imageEditDataUrl) {
            form.setFieldsValue({
                imageEditData: [{
                    uid: '-1',
                    name: 'existing-image-edit-data',
                    status: 'done',
                    url: imageEditDataUrl,
                }],
            });
        }
    }, [form, popupImageUrl, imageEditDataUrl]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error(`${file.name} is not an image file`);
        }
        return isImage || Upload.LIST_IGNORE;
    };

    return (
        <div className="file-data-setting">
            <div className="file-data-main">
                <section className="file-data-setting-measureName">
                    <Form.Item
                        className="form-item"
                        name="measureName"
                        label="施策名"
                        initialValue={measureName}
                        rules={[{ required: true, message: '施策名を入力してください' }]}
                    >
                        <Input placeholder="施策名を入力してください" />
                    </Form.Item>
                </section>
                <section className="file-data-setting-dataUpload">
                    <Form.Item
                        className="form-item"
                        name="popupImage"
                        label="ポップアップ写真のアップロード"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'ポップアップ写真を入力してください' }]}
                    >
                        <Dragger
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="picture"
                            accept="image/*"
                        >
                            <p className="ant-upload-drag-icon">
                                <FileImageOutlined/>
                            </p>
                            <p className="ant-upload-text">クリックまたはドラッグしてポップアップ画像をアップロード</p>
                        </Dragger>
                    </Form.Item>

                    <Form.Item
                        extra="編集ファイルをアップロードすることで、ポップアップ写真を編集したい場合一覧からダウンロードできるようになります"
                        className="form-item"
                        name="imageEditData"
                        label="ポップアップ写真の編集ファイルアップロード（任意）"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Dragger
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">クリックまたはドラッグしてファイルをアップロード</p>
                        </Dragger>
                    </Form.Item>
                </section>
            </div>
        </div>
    );
};

export default FileDataSetting;