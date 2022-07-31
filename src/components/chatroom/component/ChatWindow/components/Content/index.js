import React from 'react'
import FormInput from './component/FormInput'
import MessageBoard from './component/MessageBoard'
import classNames from 'classnames/bind'
import styles from './Content.module.scss'
const cx = classNames.bind(styles)

export default function Content() {
  return (
    <div className={cx('wrapper')}>
        <MessageBoard />
        <FormInput />
    </div>
  )
}
