import React from 'react';
import Style from './css/style';

function NavBar(props) {
    return (
        <div style={{...Style.w100, ...Style.bgDarkGray, ...Style.pTB3}}>
            <a style={{...Style.textWhite, ...Style.fontBig, ...Style.noDecoration}} href="/">
                Welcome to Social Life
            </a>
        </div>
    );
}

export default NavBar;