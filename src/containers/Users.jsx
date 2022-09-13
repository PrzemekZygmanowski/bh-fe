import React from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/GET_USERS';
import { DELETE_USER } from '../graphql/DELETE_USER';
import { Users as UsersComponent } from '../components/Users';

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

  return (
    <UsersComponent
      users={data?.users}
      error={error}
      loading={loading}
      deleteUser={deleteUser}
    ></UsersComponent>
  );
};
