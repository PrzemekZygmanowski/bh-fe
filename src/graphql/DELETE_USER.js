import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      email
      date
    }
  }
`;
