import { Radio } from 'antd';
import '../../css/CustomRadio.css';  // カスタムCSSをインポート

// eslint-disable-next-line react/prop-types
const CustomRadio = ({ options, ...props }) => (
    <Radio.Group
        className="custom-radio-group"
        options={options}
        {...props}
    />
);

export default CustomRadio;