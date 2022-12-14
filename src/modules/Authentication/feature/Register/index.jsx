import { Button, Card, TextField } from "@mui/material";
import React, { useEffect } from "react";
import s from "./styles.module.scss";
import { useFormik } from "formik";
import { useRegisterMutation } from "modules/Authentication/api";
import Spinner from "components/Spinner";
import * as yup from "yup";

const validateSchema = yup.object().shape({
  taiKhoan_dk: yup.string().required("*Required!"),
  matKhau_dk: yup
    .string()
    .required("*Required!")
    .min(6, "*At least 6 charaters!")
    .max(30, "*At maximum 30 charaters!"),
  email_dk: yup.string().required("*Required!").email("*Invalid Email!"),
  soDt_dk: yup
    .string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "*Invalid Phone number!"),
  maNhom_dk: yup.string(),
  hoTen_dk: yup
    .string()
    .required("*Required!")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "*Invalid Name!"
    ),
});

const Register = (props) => {
  const showSignUp = props.showSignUp;
  const [register, { error, isLoading, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      alert("Register Successfully!");
      window.location.reload();
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: {
      taiKhoan_dk: "",
      matKhau_dk: "",
      email_dk: "",
      soDt_dk: "",
      maNhom_dk: "",
      hoTen_dk: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      register({
        taiKhoan: values.taiKhoan_dk,
        matKhau: values.matKhau_dk,
        email: values.email_dk,
        soDt: values.soDt_dk,
        maNhom: values.maNhom_dk,
        hoTen: values.hoTen,
      });
    },
  });
  return (
    <div className="w-[30%] flex">
      {showSignUp ? null : (
        <Card className={`${s.cardSignup}`}>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-bold text-center text-[40px] text-white">Sign UP</h1>
            <p className="text-white">Sign up here if you don't have account.</p>
            <Button
              onClick={() => props.setShowSignUp(true)}
              variant="contained"
              className="!bg-[white] !text-[#41c2cb] !my-4"
            >
              SIGN UP
            </Button>
          </div>
        </Card>
      )}
      {!showSignUp ? null : (
        <Card className={`${s.cardSignin} !overflow-auto`}>
          <div>
            <h1 className="font-bold text-center mt-8 pb-4 text-[30px] text-black">
              Sign up
            </h1>
          </div>
          {error ? (
            <h1 className="text-center py-4 text-[red] text-[12px]">
              <i>{error.data.content}</i>
            </h1>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-center flex-wrap items-center">
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={
                  formik.errors.taiKhoan_dk && formik.touched.taiKhoan_dk ? true : false
                }
                helperText={
                  formik.errors.taiKhoan_dk && formik.touched.taiKhoan_dk
                    ? formik.errors.taiKhoan_dk
                    : null
                }
                id="taiKhoan_dk"
                name="taiKhoan_dk"
                label="User name"
                onChange={formik.handleChange}
                value={formik.values.taiKhoan_dk}
              />
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={
                  formik.errors.matKhau_dk && formik.touched.matKhau_dk ? true : false
                }
                helperText={
                  formik.errors.matKhau_dk && formik.touched.matKhau_dk
                    ? formik.errors.matKhau_dk
                    : null
                }
                id="matKhau_dk"
                name="matKhau_dk"
                label="Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.matKhau_dk}
              />
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={formik.errors.email_dk && formik.touched.email_dk ? true : false}
                helperText={
                  formik.errors.email_dk && formik.touched.email_dk
                    ? formik.errors.email_dk
                    : null
                }
                id="email_dk"
                name="email_dk"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email_dk}
              />
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={formik.errors.soDt_dk && formik.touched.soDt_dk ? true : false}
                helperText={
                  formik.errors.soDt_dk && formik.touched.soDt_dk
                    ? formik.errors.soDt_dk
                    : null
                }
                id="soDt_dk"
                name="soDt_dk"
                label="Phone number"
                onChange={formik.handleChange}
                value={formik.values.soDt_dk}
              />
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={formik.errors.maNhom_dk && formik.touched.maNhom_dk ? true : false}
                helperText={
                  formik.errors.maNhom_dk && formik.touched.maNhom_dk
                    ? formik.errors.maNhom_dk
                    : null
                }
                id="maNhom_dk"
                name="maNhom_dk"
                label="Group Code"
                onChange={formik.handleChange}
                value={formik.values.maNhom_dk}
              />
              <TextField
                sx={{
                  display: "block",
                  margin: "8px 0",
                  width: "50%",
                  textAlign: "center",
                }}
                error={formik.errors.hoTen_dk && formik.touched.hoTen_dk ? true : false}
                helperText={
                  formik.errors.hoTen_dk && formik.touched.hoTen_dk
                    ? formik.errors.hoTen_dk
                    : null
                }
                id="hoTen_dk"
                name="hoTen_dk"
                label="Fullname"
                onChange={formik.handleChange}
                value={formik.values.hoTen_dk}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button
                variant="contained"
                className="!bg-[#41c2cb] !my-4 !mb-5 text-center"
                type="submit"
              >
                SIGN UP
                {isLoading ? <Spinner sx={{ marginLeft: "10px" }} size={20} /> : null}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Register;
