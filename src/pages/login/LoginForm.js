import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { postLoginUser } from "../../redux/slices/loginRegister";
import { RHFTextField } from "../components/hook-form";
import FormProvider from "../components/hook-form/FormProvider";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { loginUser, isLoading } = useLoginUser();

  const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required("UserName is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = useMemo(() => ({
    username: "",
    password: "",
  }));

  const methods = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("data", data);
    try {
      let formData = new FormData();
      formData.set("username", data.username);
      formData.set("password", data.password);
      // loginUser(formData, {
      //   onSuccess: (data) => {
      //     console.log("data", data?.data?.message);
      //     reset();
      //   },
      // });
      dispatch(postLoginUser(formData, toast, reset));
    } catch (error) {}
  };

  function handleClick() {
    navigate("/signup");
  }

  return (
    <>
      <div className="bg-[#F8F8F9] flex justify-center item-center">
        <div className="w-[30%] mt-[40px] mb-[40px] p-12 shadow rounded-lg bg-[#ffff]">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField name="username" label="Username" fullwidth />
              <RHFTextField
                name="password"
                type="password"
                label="Password"
                fullwidth
              />
            </Stack>

            <button
              type="submit"
              className="btn_about bg-[#0000FF] text-[#ffff] p-2 shadow rounded-xl  mt-6"
            >
              <span className="all">Login</span>
            </button>
          </FormProvider>
          <div className="text-center lg:text-left">
            <p className="mt-2 mb-0 pt-2 text-sm font-semibold">
              Dont have an account?
              <span
                className="cursor-pointer text-theme-primary-main text-[#0000FF] transition duration-200 ease-in-out"
                onClick={handleClick}
              >
                &nbsp; Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
