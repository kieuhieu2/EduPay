import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/HeaderOfAdmin';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
