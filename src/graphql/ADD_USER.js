import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $date: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      date: $date
    ) {
      id
      firstName
      lastName
      email
      date
    }
  }
`;
