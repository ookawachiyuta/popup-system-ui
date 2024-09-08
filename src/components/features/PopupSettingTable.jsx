import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import IconButton from '../parts/IconButton.jsx';
import StyledTable from '../parts/StyledTable.jsx';

const PopupSettingTable = ({ selectedSiteType }) => {
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const [sortedInfo, setSortedInfo] = useState({
        columnKey: 'registerDate',
        order: 'descend',
    });

    const showPreview = (imageUrl) => {
        setPreviewImage(imageUrl);
        setIsPreviewVisible(true);
    };

    const handlePreviewClose = () => {
        setIsPreviewVisible(false);
    };

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleDownload = (url, filename) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Download failed:', error));
    };

    //useMemoを使用することでキャッシュ化
    const filteredData = useMemo(() => {
        if (selectedSiteType === 'all') {
            return data;
        }
        return data.filter(item => item.siteType === selectedSiteType);
    }, [selectedSiteType]);

    const columns = [
        {
            title: 'プレビュー',
            width: 150,
            dataIndex: 'preview',
            key: 'preview',
            fixed: 'left',
            render: (_, record) => (
                <div style={{ position: 'relative', width: 150, height: 50 }}>
                    <div style={{padding: '2px 0', fontSize: '12px',}}>
                        {record.downloadUrl ? (
                            <a
                                href={record.downloadUrl}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDownload(record.downloadUrl, `${record.measureName}.jpg`);
                                }}
                                aria-label={`Download ${record.measureName}`}
                            >
                                <DownloadOutlined /> 編集データを取得
                            </a>
                        ) : (
                            <span style={{ color:'gray' }}>編集データなし</span>
                        )}
                    </div>
                    <img
                        src={`/api/images/${record.key}`}
                        alt={`Preview`}
                        style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'cover' }}
                        onClick={() => showPreview(`/api/images/${record.key}`)}
                    />
                </div>
            ),
        },
        {
            title: '施策名',
            width: 150,
            dataIndex: 'measureName',
            key: 'measureName',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        placeholder="施策名を検索"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90, marginRight: 8}}
                    >
                        検索
                    </Button>
                    <Button onClick={() => clearFilters()} size="small" style={{width: 90}}>
                        リセット
                    </Button>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
                record.measureName
                    ? record.measureName.toString().toLowerCase().includes(value.toLowerCase())
                    : '',
        },
        {
            title: 'サイト情報',
            dataIndex: 'siteInfo',
            key: 'siteInfo',
            width: 200,
            render: (_, record) => (
                <>
                    <IconButton
                        className="primary"
                        onClick={() => window.open(record.siteInfo[0], '_blank')}
                    >
                        本番
                    </IconButton>
                    <IconButton
                        className="default"
                        onClick={() => window.open(record.siteInfo[1], '_blank')}
                    >
                        テスト
                    </IconButton>
                </>
            ),
        },
        {
            title: 'スケジュール',
            width: 120,
            dataIndex: 'schedule',
            key: 'schedule',
            render: (schedule) => (
                <Tooltip title={schedule || '常に表示'}>
                    <span>{schedule ? '設定あり' : '常に表示'}</span>
                </Tooltip>
            ),
        },
        {
            title: '閉じるボタン',
            width: 120,
            dataIndex: 'closeButtonType',
            key: 'closeButtonType',
        },
        {
            title: 'タイミング',
            dataIndex: 'delayDisplaySeconds',
            key: 'delayDisplaySeconds',
            width: 100,
        },
        {
            title: 'セッション頻度',
            dataIndex: 'session',
            key: 'session',
            width: 120,
        },
        {
            title: '編集',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <>
                    <IconButton
                        className="primary"
                        onClick={() => navigate('/edit', { state: { data: record } })}
                    >
                        <span role="img" aria-label="edit"><EditOutlined /></span>
                    </IconButton>
                    <IconButton
                        className="default"
                        onClick={() => console.log('Delete:', record)}
                    >
                        <span role="img" aria-label="delete"><DeleteOutlined /></span>
                    </IconButton>
                </>
            ),
        },
        {
            title: '更新日',
            dataIndex: 'registerDate',
            key: 'registerDate',
            fixed: 'right',
            width: 120,
            sorter: (a, b) => new Date(a.registerDate) - new Date(b.registerDate),
            sortOrder: sortedInfo.columnKey === 'registerDate' && sortedInfo.order,
        },
    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    pageSize: 100,
                }}
                scroll={{
                    x: 1500,
                }}
                onChange={handleChange}
            />
            <Modal
                visible={isPreviewVisible}
                footer={null}
                onCancel={handlePreviewClose}
            >
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}

const data = [
    {
        key: 1,
        measureName: "施策名1",
        siteInfo: ["https://production.example.com", "https://test.example.com"],
        siteName: "",
        delayDisplaySeconds: "3秒後",
        schedule: "月：12:13~14:45\n火：12:00~14:35",
        closeButtonType: "直下黒色",
        session: "1セッション1回",
        registerDate: "2023-05-15",
        siteType: "typeB",
        downloadUrl: "/api/download/1"
    },
    {
        key: 2,
        measureName: "施策名2",
        siteInfo: ["https://production2.example.com", "https://test2.example.com"],
        siteName: "",
        delayDisplaySeconds: "即時",
        schedule: "",
        closeButtonType: "右上白色",
        session: "毎回",
        registerDate: "2023-05-16",
        siteType: "typeA",
        downloadUrl: ""
    },
    // ... 他のデータ
];

export default PopupSettingTable;