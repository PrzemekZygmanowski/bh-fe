import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { Loader } from './Loader';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/GET_USERS';
import { DELETE_USER } from '../graphql/DELETE_USER';

export const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: users.filter((user) => user.id !== deleteUser.id),
        },
      });
    },
  });

  if (loading) return <Loader></Loader>;
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
        return <Button onClick={handleDelete}>DELETE</Button>;
      },
      width: 250,
    },
  ];

  return (
    <>
      {!loading && !error && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data.users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      )}
    </>
  );
};
