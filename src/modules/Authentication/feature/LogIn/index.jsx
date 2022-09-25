import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import s from "./styles.module.scss";
import { useFormik } from "formik";
import { useLoginMutation } from "modules/Authentication/api";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import Spinner from "components/Spinner";
import * as yup from "yup";

const validateSchema = yup.object().shape({
  taiKhoan_dn: yup.string().required("*Required!"),
  matKhau_dn: yup
    .string()
    .required("*Required!")
    .min(3, "*At least 3 charaters!")
    .max(30, "*At maximum 30 charaters!"),
});

const Login = (props) => {
  const showSignUp = props.showSignUp;
  const [login, { error, isError, isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: {
      taiKhoan_dn: "",
      matKhau_dn: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      login({ taiKhoan: values.taiKhoan_dn, matKhau: values.matKhau_dn });
    },
  });
  return (
    <div className="w-[30%] flex">
      {!showSignUp ? null : (
        <Card className={`${s.cardSignin} !bg-[#41c2cb]`}>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-bold text-center text-[30px] text-white">Sign in</h1>
            <p className="text-white">You had an account? Sign in now!</p>
            <Button
              onClick={() => props.setShowSignUp(false)}
              variant="contained"
              className="!bg-[white] !text-[#41c2cb] !my-4"
            >
              SIGN IN
            </Button>
          </div>
        </Card>
      )}
      {showSignUp ? null : (
        <Card className={`${s.cardSignin}`}>
          <div>
            <h1 className="font-bold text-center mt-8 pb-8 text-[30px] text-black">
              Sign in
            </h1>
          </div>
          <div>
            {error ? (
              <h1 className="text-center py-4 text-[red] text-[12px]">
                <i>{error.data.content}</i>
              </h1>
            ) : null}
            <form
              onSubmit={formik.handleSubmit}
              className="flex justify-center flex-col items-center"
            >
              <TextField
                error={
                  formik.errors.taiKhoan_dn && formik.touched.taiKhoan_dn ? true : false
                }
                helperText={
                  formik.errors.taiKhoan_dn && formik.touched.taiKhoan_dn
                    ? formik.errors.taiKhoan_dn
                    : null
                }
                sx={{
                  display: "block",
                  margin: "8px 0",
                }}
                id="taiKhoan_dn"
                name="taiKhoan_dn"
                label="User name"
                onChange={formik.handleChange}
                value={formik.values.taiKhoan_dn}
              />
              <TextField
                error={
                  formik.errors.matKhau_dn && formik.touched.matKhau_dn ? true : false
                }
                helperText={
                  formik.errors.matKhau_dn && formik.touched.matKhau_dn
                    ? formik.errors.matKhau_dn
                    : null
                }
                sx={{
                  display: "block",
                  margin: "8px 0",
                }}
                type="password"
                id="matKhau_dn"
                name="matKhau_dn"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.matKhau}
              />
              <a href="#forgot" className="my-3 hover:text-[#41c2cb] tran">
                Forgot your password?
              </a>
              <Button type="submit" variant="contained" className="!bg-[#41c2cb]">
                SIGN IN
                {isLoading ? <Spinner sx={{ marginLeft: "10px" }} size={20} /> : null}
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Login;
