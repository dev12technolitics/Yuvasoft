import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../components/hook-form";
import FormProvider from "../components/hook-form/FormProvider";
// import { putUsers, postUsers } from "../../redux/slices/user";

AddEditUserPage.propTypes = {
  isEdit: PropTypes.bool,
  oneUser: PropTypes.func,
};

export default function AddEditUserPage({ isEdit = false, oneUser }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const ProductUsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const defaultValues = useMemo(
    () => ({
      _id: oneUser?._id || "",
      name: oneUser?.name || "",
      email: oneUser?.email || "",
      phone: oneUser?.phone || "",
    }),
    [oneUser]
  );

  const methods = useForm({
    resolver: yupResolver(ProductUsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && oneUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, oneUser]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("data", data);
    const payload = {
      // id:id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
    };
    // isEdit
    //   ? dispatch(putUsers(id, payload, toast, setIsLoading))
    //   : dispatch(postUsers(payload, toast, setIsLoading));
  };

  return (
    <>
      <div className="my-4">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{ p: 4, mb: 6 }}
            className="rounded-xl shadow-lg bg-[#ffff]"
          >
            <h2 className="font-bold text-[18px] mb-4">Basic Info</h2>
            <Stack
              spacing={{
                xs: 2,
                sm: 2,
                md: 4,
                lg: 4,
              }}
            >
              <RHFTextField
                sx={{ background: "white" }}
                name="name"
                label="User Name"
              />
              <RHFTextField
                sx={{ background: "white" }}
                name="phone"
                label="Contact no"
              />

              <RHFTextField
                sx={{ background: "white" }}
                name="email"
                label="Email"
              />
            </Stack>
          </Stack>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isEdit ? "Update Now" : "Post Now"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </div>
    </>
  );
}
