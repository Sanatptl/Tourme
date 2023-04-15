import React from 'react';
import { useAuth } from '../contexts/userAuth';

import AccNavItem from './AccNavItem';

const AccSidebar = () => {
  const { user } = useAuth();

  return (
    <>
      <nav className="user-view__menu">
        <ul className="side-nav">
          <AccNavItem link="#" text="Settings" icon="settings" active={true} />
          <AccNavItem link="#" text="My bookings" icon="briefcase" />
          <AccNavItem link="#" text="My reviews" icon="star" />
          <AccNavItem link="#" text="Billing" icon="credit-card" />
        </ul>
        {user.role === 'admin' && (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <AccNavItem link="#" text="Manage tours" icon="map" />
              <AccNavItem link="#" text="Manage users" icon="users" />
              <AccNavItem link="#" text="Manage reviews" icon="star" />
              <AccNavItem link="#" text="Manage bookings" icon="briefcase" />
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default AccSidebar;
