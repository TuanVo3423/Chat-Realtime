import React from 'react'
import {Row , Col} from 'antd'
import UserInfo from './component/UserInfo'
import RoomList from './component/RoomList'
import classNames from 'classnames/bind'
import styles from '../Sidebar/SideBar.module.scss'

const cx = classNames.bind(styles)

export default function Sidebar() {
  return (
    <div className={cx('wrapper')}>
        <Row>
        <Col span={24}>
            <UserInfo />
        </Col>
        <Col span={24}>
            <RoomList />
        </Col>
    </Row>
    </div>
  )
}
