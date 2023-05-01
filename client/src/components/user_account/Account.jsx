import React from "react";
import AccSidebar from "./AccSidebar";
import AccSettings from "./AccSettings";
import AccPassChange from "./AccPassChange";
import AlertWindow from "../alert_error/AlertWindow";

const Account = () => {
  return (
    <>
      <main className="main">
        <AlertWindow />
        <div className="user-view">
          <AccSidebar />
          <div className="user-view__content">
            <AccSettings />
            <div className="line"> </div>
            <AccPassChange />
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
