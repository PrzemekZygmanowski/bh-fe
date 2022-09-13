import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/ADD_USER';
import { GET_USERS } from '../graphql/GET_USERS';
import { AddUserForm } from '../components/AddUserForm';

export const UserForm = () => {
  const [addUser] = useMutation(ADD_USER, {
    update(cache, { data: { addUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: users.concat([addUser]),
        },
      });
    },
  });
  return <AddUserForm addUser={addUser}></AddUserForm>;
};
