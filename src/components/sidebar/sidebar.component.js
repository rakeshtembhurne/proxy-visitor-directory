import React from 'react';

import './sidebar.styles.scss';

const Sidebar = () => (
  <div className="sidebar bg-light">
    <h5 className="heading">Analyse</h5>
    <ul>
      <li className="current">Visitor Log</li>
      <li>Reports</li>
    </ul>

    <h5 className="heading">Manage</h5>
    <ul>
      <li className="current">Visitor Experience</li>
      <li>Invites</li>
      <li>Devices</li>
    </ul>
  </div>
);

export default Sidebar;