import React from "react";
import authBG from 'asset/img/authBG.jpg'

const AuthTemplate = (props) => {
  return (
    <div style={{
        backgroundImage: `url(${authBG})`,
        width: "100vw",
        height: "100vh"
    }}>
      {props.children}
    </div>
  );
};

export default AuthTemplate;
