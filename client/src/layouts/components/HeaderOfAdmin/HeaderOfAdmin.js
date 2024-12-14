import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import config from '~/config';
import Button from '~/components/Button';
import styles from './HeaderOfAdmin.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon  } from '~/components/Icons';
import Image from '~/components/Image';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Giao vien',
        children: {
            title: 'Quan ly giao vien',
            data: [
                {
                    type: 'getTeacher',
                    title: 'Xem thong tin giao vien',
                    to: '/getTeacher',
                },
                {
                    type: 'createTeacher',
                    title: 'Them moi giao vien',
                    to: '/createTeacher',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Quan ly',
        children: {
            title: 'Thonbg tin nguoi phu trach',
            data: [
                {
                    type: 'manager',
                    title: 'Xem thong tin Quan ly',
                    to: '/getManager',
                },
                {
                    type: 'manager',
                    title: 'Them moi Quan ly',
                    to: '/createManager',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Bang luong',
        to: '/getSalaryReport',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Diem danh',
        children: {
            title: 'Thong tin diem danh',
            data: [
                {
                    type: 'attendance',
                    title: 'Xem thong tin diem danh cua giao vien',
                    to: '/getAttendance',
                },
                {
                    type: 'attendance',
                    title: 'Them moi diem danh cua giao vien',
                    to: '/createAttendance',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Cac loai khau tru',
        children: {
            title: 'Thong tin khau tru',
            data: [
                {
                    type: 'deduction',
                    title: 'Xem thong tin khau tru cua giao vien',
                    to: '/getDeduction',
                },
                {
                    type: 'deduction',
                    title: 'Them moi khau tru cua giao vien',
                    to: '/createDeduction',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Luong co ban',
        children: {
            title: 'Thong tin luong co ban',
            data: [
                {
                    type: 'basicSalary',
                    title: 'Xem thong tin luong co ban cua giao vien',
                    to: '/getBasicSalary',
                },
                {
                    type: 'basicSalary',
                    title: 'Them moi luong co ban cua giao vien',
                    to: '/createBasicSalary',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'hop dong lao dong',
        children: {
            title: 'Thong tin hop dong lao dong',
            data: [
                {
                    type: 'contract',
                    title: 'Xem thong tin hop dong lao dong cua giao vien',
                    to: '/getContract',
                },
                {
                    type: 'contract',
                    title: 'Them moi hop dong lao dong cua giao vien',
                    to: '/createContract',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Muc phat cac loi (khau tru)',
        children: {
            title: 'Muc khau tru',
            data: [
                {
                    type: 'deductionCost',
                    title: 'Xem thong tin muc khau tru',
                    to: '/getDeductionCost',
                },
                {
                    type: 'deductionCost',
                    title: 'Them moi muc khau tru',
                    to: '/createDeductionCost',
                },
            ],
        },
    },

];

function HeaderOfAdmin() {
    const navigate = useNavigate();

    const currentUser = true;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        alert('Bạn đã đăng xuất thành công.');
    };
    
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'getTeacher':
                navigate('/getTeacher');
                break;
            
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thong tin cua admin',
            to: '/getMyInfoAdmin',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
            to: '/',
            onClick: handleLogout,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Kindergarten" />
                </Link>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            
                            
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGMvEQPKYQhv8HGhKYOzgvYTRcnWeHw_H0gg&s"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default HeaderOfAdmin;
