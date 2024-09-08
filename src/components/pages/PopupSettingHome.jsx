import React, { useState } from 'react';
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../css/PopupSettingHome.css"
import { Link } from "react-router-dom";
import PopupSettingTable from "../features/PopupSettingTable.jsx";

const PopupSettingHome = () => {
    const [selectedSiteType, setSelectedSiteType] = useState('all');

    const handleSiteTypeChange = (e) => {
        setSelectedSiteType(e.target.value);
    };

    return (
        <div className={"home"}>
            <div className="home-header">
                <div className="right-content">
                    <div className="select-group">
                        <p className="site-title">サイト種別：</p>

                        <div className="select-wrapper">
                            <select
                                name="sites"
                                id="site-select"
                                className="text-select"
                                value={selectedSiteType}
                                onChange={handleSiteTypeChange}
                            >
                                <option value="all">すべて</option>
                                <option value="typeA">TypeA</option>
                                <option value="typeB">TypeB</option>
                            </select>
                        </div>
                    </div>
                    <Link to={"/add"}>
                        <Button type="primary" style={{ backgroundColor: '#37B7C3' }}>
                            <PlusOutlined />新規
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={"home-main"}>
                <PopupSettingTable selectedSiteType={selectedSiteType} />
            </div>
        </div>
    )
}

export default PopupSettingHome;