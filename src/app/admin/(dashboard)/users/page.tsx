"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../(components)/Header";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {

  const isLoading = false;
  const isError=false;
 
  const users:UserType={
    name: "",
    email: "",
    surname: "",
    isAdmin: false,
    password: "",
    isVerified: false,
    createdAt: "",
    updatedAt: "",
    forgotPasswordToken: "",
    forgotPasswordTokenExpiry: new Date(),
    verifyToken: "",
    verifyTokenExpiry: new Date(),
  };
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
       
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
