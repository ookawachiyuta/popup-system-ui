import AppRoute from "../../route.jsx";
import { Link } from "react-router-dom"
import {MenuOutlined} from "@ant-design/icons";
import {CsrfProvider} from "../context/CsrfContext.jsx";
import "../../css/TopLayout.css"

const TopLayout = () => {
    return (
        <div className="app-container">
            <header className="header-content">
                <div className="header-icon">
                    <MenuOutlined />
                </div>
                <div className="header-title">
                    <h1>PopupSystem</h1>
                </div>
            </header>
            <div className="main-container">
                <aside className="sidebar">
                    <div className="sidebar-item">
                        <Link to="/">ポップアップ設定</Link>
                    </div>
                </aside>
                <main className="main-content">
                    <CsrfProvider>
                        <AppRoute/>
                    </CsrfProvider>
                </main>
            </div>
        </div>
    )
}

export default TopLayout;