import { useState, useEffect } from "react";

const AlertWindow = ({ show, msg, type, setShow }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (setShow) setShow(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={`alert alert--${type}`}>{msg}</div>
    </>
  );
};

export default AlertWindow;
