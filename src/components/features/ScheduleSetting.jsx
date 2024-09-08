import React, { useState, useEffect } from 'react';
import { Form, Radio, Checkbox, TimePicker, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import '../../css/TopLayout.css';

const ScheduleSetting = ({ form, initialData = {schedule
        :
        ""} }) => {
    const [displayOption, setDisplayOption] = useState('always');

    console.log(initialData)
    useEffect(() => {
        if (initialData.schedule) {
            console.log("スケジュールです")
            const convertedSchedules = convertScheduleStringToObjects(initialData.schedule);
            form.setFieldsValue({
                displayOption: 'schedule',
                scheduleSets: convertedSchedules
            });
            setDisplayOption('schedule');
        }
    }, [initialData, form]);

    const convertScheduleStringToObjects = (scheduleString) => {
        const lines = scheduleString.split('\n');
        return lines.map(line => {
            const [day, time] = line.split('：');
            const [startTime, endTime] = time.split('~');
            const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            const weekdayIndex = ['月', '火', '水', '木', '金', '土', '日'].indexOf(day);
            return {
                id: Math.random().toString(36).substr(2, 9),
                weekdays: [weekdays[weekdayIndex]],
                startTime: dayjs(startTime, 'HH:mm'),
                endTime: dayjs(endTime, 'HH:mm')
            };
        });
    };

    const handleDisplayOptionChange = (e) => {
        const newValue = e.target.value;
        setDisplayOption(newValue);
        form.setFieldsValue({ displayOption: newValue });

        if (newValue === 'always') {
            form.setFieldsValue({ scheduleSets: [] });
        } else if (newValue === 'schedule') {
            const currentSets = form.getFieldValue('scheduleSets') || [];
            if (currentSets.length === 0) {
                handleAddScheduleSet();
            }
        }
    };

    const handleAddScheduleSet = () => {
        const newSet = {
            id: Math.random().toString(36).substr(2, 9),
            weekdays: [],
            startTime: dayjs('00:00', 'HH:mm'),
            endTime: dayjs('00:00', 'HH:mm')
        };
        const currentSets = form.getFieldValue('scheduleSets') || [];
        form.setFieldsValue({ scheduleSets: [...currentSets, newSet] });
    };

    const handleDeleteScheduleSet = (fieldName) => {
        const currentSets = form.getFieldValue('scheduleSets');
        const newScheduleSets = currentSets.filter((_, index) => index !== fieldName);
        form.setFieldsValue({ scheduleSets: newScheduleSets });

        if (newScheduleSets.length === 0) {
            setDisplayOption('always');
            form.setFieldsValue({ displayOption: 'always' });
        }
    };

    const ScheduleSet = ({ field }) => {
        const handleWeekdayGroup = (group) => {
            const days = group === 'weekdays'
                ? ['mon', 'tue', 'wed', 'thu', 'fri']
                : ['sat', 'sun'];

            const currentWeekdays = form.getFieldValue(['scheduleSets', field.name, 'weekdays']) || [];
            const newWeekdays = days.reduce((acc, day) => {
                if (!currentWeekdays.includes(day)) {
                    acc.push(day);
                }
                return acc;
            }, [...currentWeekdays]);

            form.setFieldsValue({
                scheduleSets: {
                    [field.name]: {
                        weekdays: newWeekdays
                    }
                }
            });
        };

        return (
            <div className="schedule-set">
                <div className="schedule-set__controls">
                    <Button className="schedule-set__group-btn" onClick={() => handleWeekdayGroup('weekdays')}>平日</Button>
                    <Button className="schedule-set__group-btn" onClick={() => handleWeekdayGroup('weekend')}>土日</Button>
                    <Button
                        className="schedule-set__delete-btn"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteScheduleSet(field.name)}
                    />
                </div>
                <Form.Item name={[field.name, 'weekdays']} noStyle>
                    <Checkbox.Group className="schedule-set__weekdays">
                        {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
                            <Checkbox key={index} value={['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][index]}>
                                {day}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <div className="schedule-set__time-pickers">
                    <Form.Item
                        name={[field.name, 'startTime']}
                        label="開始時間"
                        getValueFromEvent={(time) => time ? time.format('HH:mm') : null}
                        getValueProps={(value) => ({ value: value ? dayjs(value, 'HH:mm') : null })}
                    >
                        <TimePicker format="HH:mm" className="schedule-set__time-picker" />
                    </Form.Item>
                    <Form.Item
                        name={[field.name, 'endTime']}
                        label="終了時間"
                        getValueFromEvent={(time) => time ? time.format('HH:mm') : null}
                        getValueProps={(value) => ({ value: value ? dayjs(value, 'HH:mm') : null })}
                    >
                        <TimePicker format="HH:mm" className="schedule-set__time-picker" />
                    </Form.Item>
                </div>
            </div>
        );
    };

    return (
        <div className="schedule-setting">
            <Form.Item name="displayOption" label="表示オプション" className="schedule-setting__display-option">
                <Radio.Group onChange={handleDisplayOptionChange} value={displayOption}>
                    <Radio value="always">常に表示</Radio>
                    <Radio value="schedule">スケジュールを設定</Radio>
                </Radio.Group>
            </Form.Item>

            {displayOption === 'schedule' && (
                <Form.List name="scheduleSets">
                    {(fields, { add }) => (
                        <div className="schedule-setting__sets">
                            {fields.map((field) => (
                                <ScheduleSet key={field.key} field={field} />
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={handleAddScheduleSet}
                                    block
                                    icon={<PlusOutlined />}
                                    className="schedule-setting__add-btn"
                                >
                                    スケジュールを追加
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                </Form.List>
            )}
        </div>
    );
};

export default ScheduleSetting;