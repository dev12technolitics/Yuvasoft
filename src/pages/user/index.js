import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import alluser from "../../data/user";
import { deleteUser, getAlluser } from "../../redux/slices/user";
import Tablerowuser from "./Tablerowuser";
import UserTableToolbar from "./UserTableToolbar";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = React.useState(alluser);
  const { users } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getAlluser());
  }, [dispatch]);

  React.useEffect(() => {
    if (users?.length) {
      setTableData(users);
    }
  }, [users]);

  const handleEditRow = (id) => {
    navigate("/user/1");
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteUser(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  return (
    <>
      <div className="flex h-10 items-center">
        <h1 className="text-[22px] font-bold">User List</h1>
        <h5 className="text-[15px] font-normal ml-5">
          {" "}
          <span className="text-[#00000082]">User</span> / User List{" "}
        </h5>
      </div>
      <div className="shadow-lg bg-white rounded-lg mt-8">
        <UserTableToolbar />
        <div className="flex flex-col">
          <div className="overflow-x-auto ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      INDEX
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NAME
                    </th>
                    <th scope="col" className="px-6 py-4">
                      PHONE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      EMAIL
                    </th>
                    <th scope="col" className="px-6 py-4">
                      DELETE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      EDIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <Tablerowuser
                      key={row.id}
                      row={row}
                      index={index}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                      onEditRow={() => handleEditRow(row._id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
