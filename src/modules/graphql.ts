import { gql } from '@apollo/client';

export const FETCH_REACTOR = gql`
    query Query($id: Int!) {
        reactor(id: $id) {
            id
            name
            fuel
            description
            status
            image
        }
    }
`;

export const CREATE_REACTOR = gql`
    mutation CreateReactor($name: String!) {
        createReactor(name: $name) {
            reactor {
                id
                name
                fuel
                description
                status
                image
            }
        }
    }
`;