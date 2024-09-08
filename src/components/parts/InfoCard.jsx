import { Card } from 'antd';
import PropTypes from 'prop-types';

const InfoCard = ({ title, children }) => (
    <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '16px', // 必要に応じて左右のパディングを調整
    }}>
        <Card
            title={title}
            bordered={false}
            style={{
                width: '100%',

            }}
        >
            {children}
        </Card>
    </div>
);

InfoCard.propTypes = {
        title: PropTypes.string,
        children: PropTypes.node,
};

export default InfoCard;