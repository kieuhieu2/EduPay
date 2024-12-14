import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/HeaderOfTeacher';
import styles from './TeacherLayout.module.scss';

const cx = classNames.bind(styles);

function TeacherLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

TeacherLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TeacherLayout;
