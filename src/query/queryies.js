import gql from "graphql-tag";
const getDream = gql`
	{
		getDream {
			id
			name
			dream
		}
	}
`;

export { getDream };
