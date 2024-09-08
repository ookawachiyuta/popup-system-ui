import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin, Typography } from 'antd';
import PropTypes from "prop-types";

const { Text } = Typography;

const Loading = ({message="読み込み中です"}) => (
    <Flex
        align="center"
        justify="center"
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
        }}
    >
        <Flex vertical align="center" gap="middle">
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 48,
                        }}
                        spin
                    />
                }
            />
            <Text>{message}</Text>
        </Flex>
    </Flex>
);

Loading.propTypes = {
    message: PropTypes.string,
};

export default Loading;