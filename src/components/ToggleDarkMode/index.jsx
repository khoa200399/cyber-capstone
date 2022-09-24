import useDarkMode from "hooks/useDarkMode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "store/common";
import s from "./style.module.scss";

const DarkModeBtn = (props) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useDarkMode();
  const toggleDarkMode = (e) => {
    const darkStatus = e.target.checked;
    setTheme(darkStatus);
    dispatch(toggleMode(darkStatus))
  };
  return (
    <div>
      <input
        defaultChecked={theme}
        id="toggle"
        className={s.toggle}
        type="checkbox"
        onClick={toggleDarkMode}
      />
    </div>
  );
};

export default DarkModeBtn;
