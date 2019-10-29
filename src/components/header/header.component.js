import React from 'react';

import './header.styles.scss';

const Header = () => (
  <header className="grid bg-dark">
    <div className="grid-cell logo">Proxy Visitor</div>
    <div className="grid-cell company">Company Name</div>
  </header>
);

export default Header;