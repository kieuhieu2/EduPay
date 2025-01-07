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
import { useEffect, useState } from 'react';
import { getCustomerFeedbacks } from '~/services/salaryReportService';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Giáo viên',
        children: {
            title: 'Quản lý giáo viên',
            data: [
                {
                    type: 'getTeacher',
                    title: 'Xem thông tin giáo viên',
                    to: '/getTeacher',
                },
                {
                    type: 'createTeacher',
                    title: 'Thêm mới giáo viên',
                    to: '/createTeacher',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Quản lý',
        children: {
            title: 'Thông tin người phụ trách',
            data: [
                {
                    type: 'manager',
                    title: 'Xem thông tin Quản lý',
                    to: '/getManager',
                },
                {
                    type: 'manager',
                    title: 'Thêm mới Quản lý',
                    to: '/createManager',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Bảng lương',
        children: {
            title: 'Quản lý bảng lương',
            data: [
                {
                    title: 'Xem thông tin bảng lương',
                    to: '/getSalaryReport',
                },
                {
                    title: 'Thêm mới bảng lương',
                    to: '/createSalaryReport',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Điểm danh',
        children: {
            title: 'Thông tin điểm danh',
            data: [
                {
                    type: 'attendance',
                    title: 'Xem thông tin điểm danh của giáo viên',
                    to: '/getAttendance'
                },
                {
                    type: 'attendance',
                    title: 'Thêm mới điểm danh của giáo viên',
                    to: '/createAttendance',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Các loại khẩu trừ',
        children: {
            title: 'Thông tin khẩu trừ',
            data: [
                {
                    type: 'deduction',
                    title: 'Xem thông tin khẩu trừ của giáo viên',
                    to: '/getDeduction',
                },
                {
                    type: 'deduction',
                    title: 'Thêm mới khẩu trừ của giáo viên',
                    to: '/createDeduction',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Lương cơ bản',
        children: {
            title: 'Thông tin lương cơ bản',
            data: [
                {
                    type: 'basicSalary',
                    title: 'Xem thông tin lương cơ bản của giáo viên',
                    to: '/getBasicSalary',
                },
                {
                    type: 'basicSalary',
                    title: 'Thêm mới lương cơ bản của giáo viên',
                    to: '/createBasicSalary',
                },
                {
                    type: 'basicSalary',
                    title: 'Thay đổi lương cơ bản của giáo viên',
                    to: '/updateBasicSalary',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Hợp đồng lao động',
        children: {
            title: 'Thông tin hợp đồng lao động',
            data: [
                {
                    type: 'contract',
                    title: 'Xem thông tin hợp đồng lao động của giáo viên',
                    to: '/getContract',
                },
                {
                    type: 'contract',
                    title: 'Thêm mới hợp đồng lao động của giáo viên',
                    to: '/createContract',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Mức phạt các lỗi (khấu trừ)',
        children: {
            title: 'Mức khấu trừ',
            data: [
                {
                    type: 'deductionCost',
                    title: 'Xem thông tin mức khấu trừ',
                    to: '/getDeductionCost',
                },
                {
                    type: 'deductionCost',
                    title: 'Thêm mới mức khấu trừ',
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
            title: 'Đăng xuất',
            separate: true,
            to: '/',
            onClick: handleLogout,
        },
    ];

    const [feedbacks, setFeedbacks] = useState([]); 
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    // Hàm gọi API và lấy thông tin phản hồi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCustomerFeedbacks(); 
                setFeedbacks(data);
                const unread = data.filter(item => item.note !== 'wasRead');
                setUnreadCount(unread.length);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
            // console.log('feedbacks:', feedbacks);
        };
        fetchData();
    }, []);

    const handleShowNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Kindergarten" />
                </Link>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                interactive 
                                visible={showNotifications} 
                                placement="bottom"
                                content={
                                    <div className={cx('notification-container')}>
                                        {feedbacks.length > 0 ? (
                                            feedbacks.map((item, index) => (
                                                <div key={index} className={cx('notification-item')}>
                                                    <p>{item.message}</p>
                                                    <span>{item.note === 'wasRead' ? 'Đã đọc' : 'Chưa đọc'}</span>
                                                    <p><strong>Feedback:</strong> {item.customerFeedback}</p> 
                                                    {/* <p><strong>Salary Report ID:</strong> {item.salaryReportId}</p> */}
                                                    <button 
                                                        onClick={() => navigate(`/getSalaryReport`)} 
                                                        className={cx('salary-report-btn')}
                                                    >
                                                        <strong>Salary Report ID:</strong> {item.salaryReportId}
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Không có thông báo nào</p>
                                        )}
                                    </div>
                                }
                            >
                                <button className={cx('action-btn')} onClick={handleShowNotifications}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>{unreadCount}</span>
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
