import AddEditUserPage from "./AddEditUserPage";

const oneUser = {
  id: "1",
  name: "rishabh",
  email: "rishabh@gmail.com",
  phone: 7974842788,
};

export default function EditUser() {
  return (
    <>
      <div className="flex h-10 items-center justify-between">
        <h1 className="text-[22px] font-bold">Edit User</h1>
      </div>

      <AddEditUserPage isEdit oneUser={oneUser} />
    </>
  );
}
