import React, { useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Sections/NavBar.css';

import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

function NavBar() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true)
    };
    const onClose = () => {
        setVisible(false)
    };

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%'}}>
            <div className="menu__logo">
                <a href="/">Logo</a>
            </div>
            <div className="menu__container">
                {/* NavBar의 왼쪽 */}
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                {/* NavBar의 오른쪽 */}
                <div className="menu_right">
                    <RightMenu mode="horizontal" />
                </div>
                <Button
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                >
                    <AlignRightOutlined />
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    );
};

// export default NavBar
export default withRouter(NavBar);