import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Loader } from './Loader';

export const Users = ({ users, loading, error, deleteUser }) => {
  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 250 },
    { field: 'lastName', headerName: 'Last name', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date', headerName: 'date', width: 250 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (cellValues) => {
        const handleDelete = () => {
          deleteUser({ variables: { id: cellValues.id } });
        };
        return (
          <Button variant="contained" onClick={handleDelete}>
            DELETE
          </Button>
        );
      },
      width: 250,
    },
  ];

  return (
    <>
      {!loading && !error && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      )}
    </>
  );
};
