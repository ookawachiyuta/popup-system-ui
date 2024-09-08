import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Form } from 'antd';
import '../../css/PopupSetting.css';
import InfoCard from "../parts/InfoCard.jsx";
import FileDataSetting from "../features/FileDataSetting.jsx";
import ConditionSetting from "../features/ConditionsSetting.jsx";
import CloseButtonSetting from "../features/CloseButtonSetting.jsx";
import SiteSetting from "../features/SiteSetting.jsx";
import ScheduleSetting from "../features/ScheduleSetting.jsx";
import FinishSetting from "../features/FinishSetting.jsx";
import { useCsrfContext } from '../context/CsrfContext.jsx';

const PopupSetting = () => {
    const [form] = Form.useForm();
    const { csrfToken, loading } = useCsrfContext();
    const location = useLocation();
    const { data } = location.state || {};
    const isEditData = (data) => {
        return Object.keys(data || {}).length !== 0;
    };

    const onFinish = async (values) => {
        console.log("onFinish");
        console.log(values);
        if (loading) {
            console.log('CSRF token is still loading');
            return;
        }

        const formData = new FormData();
        if (values.popupImage) {
            formData.append('popupImage', values.popupImage[0].originFileObj);
        }

        if (values.imageEditData) {
            formData.append('imageEditData', values.imageEditData[0].originFileObj);
        }
        const key = isEditData(data) ? data.key : '0';
        const jsonData = {
            popupSettingId: key,
            measureName: values.measureName,
            timing: values.timing,
            timingSeconds: values.timingSeconds,
            frequency: values.frequency,
            closeButtonPosition: values.closeButtonPosition,
            closeButtonColor: values.closeButtonColor,
            siteType: values.siteType,
            siteUrl: values.siteUrl,
            urlMatchType: values.urlMatchType,
            selectedSiteName: values.selectedSiteName,
            siteSelection: values.siteSelection,
            displayOption: values.displayOption,
            scheduleSets: values.scheduleSets,
            selectedPlusPage: values.selectedPlusPage,
            manualUrls: values.manualUrls,
            urlSets: values.urlSets
        };
        formData.append('json', JSON.stringify(jsonData));
    };

    return (
        <div className="popup-setting">
            <div className="popup-setting__container">
                <div className="popup-setting__header">
                    <Link to={"/"} className="popup-setting__back-link">
                        <p>＜ 戻る</p>
                    </Link>
                    <h2>{isEditData(data) ? "ポップアップ編集" : "新規ポップアップ登録"}</h2>
                </div>
                <div className="popup-setting__main">
                    <div className="popup-setting__navigation">
                        <ul className="popup-setting__nav-list">
                            <li className="popup-setting__nav-item"><a href={"#add-file-data"}>データアップロード</a></li>
                            <li className="popup-setting__nav-item"><a href={"#add-conditions"}>表示/停止の条件</a></li>
                            <li className="popup-setting__nav-item"><a href={"#add-close-button"}>閉じるボタン</a></li>
                            {!isEditData(data) && (
                                <li className="popup-setting__nav-item"><a href={"#add-site"}>サイト</a></li>
                            )}
                            <li className="popup-setting__nav-item"><a href={"#add-schedule"}>スケジュール</a></li>
                            <li className="popup-setting__nav-item"><a href={"#add-finish"}>公開</a></li>
                        </ul>
                    </div>
                    <div className="popup-setting__form-container">
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <section id="add-file-data">
                                <InfoCard title={"データアップロード"}>
                                    <FileDataSetting form={form} initialData={data} />
                                </InfoCard>
                            </section>
                            <section id="add-conditions">
                                <InfoCard title={"表示/停止の条件"}>
                                    <ConditionSetting form={form} initialData={data} />
                                </InfoCard>
                            </section>
                            <section id="add-close-button">
                                <InfoCard title={"閉じるボタン"}>
                                    <CloseButtonSetting form={form} initialData={data} />
                                </InfoCard>
                            </section>
                            <section id="add-site">
                                {!isEditData(data) && (
                                    <InfoCard title={"サイト"}>
                                        <SiteSetting form={form} initialData={data} />
                                    </InfoCard>
                                )}
                            </section>
                            <section id="add-schedule">
                                <InfoCard title={"スケジュール"}>
                                    <ScheduleSetting
                                        form={form}
                                        initialData={data}
                                    />
                                </InfoCard>
                            </section>
                            <section id="add-finish">
                                <InfoCard title={"公開"}>
                                    <FinishSetting form={form} />
                                </InfoCard>
                            </section>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupSetting;