import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/PopupSettingHome.jsx";
import Setting from "./components/pages/PopupSetting.jsx"


const AppRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<Setting/>}/>
                <Route path="/edit" element={<Setting/>}/>
            </Routes>
        </div>
    )
}

export default AppRoute;