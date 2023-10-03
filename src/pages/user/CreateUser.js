import AddEditUserPage from "./AddEditUserPage";

export default function CreateUser() {
  return (
    <>
      <div className="flex h-10 items-center justify-between">
        <h1 className="text-[22px] font-bold">Add User</h1>
      </div>

      <AddEditUserPage />
    </>
  );
}
