import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { Table } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { getDream } from "../query/queryies";
import { useQuery } from "@apollo/react-hooks";
import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import Pagination from "../util/Pagination";
import { notification } from "antd";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: "center",
		color: theme.palette.text.secondary,
		position: "relative",
		height: 300,
		marginTop: 15,
	},
	trash: {
		"&:hover": {
			background: "#f0f0f3",
		},
		cursor: "pointer",
	},
}));

var currentPosts = [];

function AddDream() {
	const classes = useStyles();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(5);
	const [deleteDream, { dat }] = useMutation(DELETE_Dream);
	const { loading, data } = useQuery(getDream);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	currentPosts =
		!loading &&
		data.getDream.reverse().slice(indexOfFirstPost, indexOfLastPost);

	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const onDelete = id => {
		console.log(id);
		deleteDream({
			variables: {
				id: id,
			},
			onError(err) {
				//setLoading(false);
			},
			update(_, {}) {
				notification["success"]({
					message: "Dream Successfully Deleted",
				});
				console.log("deleted");
			},
			refetchQueries: [{ query: getDream }],
		});
	};
	console.log(data);
	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						{loading ? (
							<>
								<p>
									<LoadingOutlined /> Loading Dream...
								</p>
							</>
						) : currentPosts.length > 0 ? (
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Dream</Table.HeaderCell>
										<Table.HeaderCell style={{ width: 110 }}>
											Name
										</Table.HeaderCell>
										<Table.HeaderCell></Table.HeaderCell>
									</Table.Row>
								</Table.Header>

								<Table.Body>
									{currentPosts &&
										currentPosts.map((res, i) => (
											<Table.Row key={i}>
												<Table.Cell>{res.dream}</Table.Cell>
												<Table.Cell>{res.name}</Table.Cell>
												<Table.Cell
													onClick={() => onDelete(res.id)}
													className={classes.trash}
												>
													<DeleteTwoTone />
												</Table.Cell>
											</Table.Row>
										))}
								</Table.Body>

								{data.getDream.length > 5 && (
									<Table.Footer>
										<Pagination
											postsPerPage={postsPerPage}
											totalPosts={data.getDream && data.getDream.length}
											paginate={paginate}
											activePN={currentPage}
											col='4'
										/>
									</Table.Footer>
								)}
							</Table>
						) : (
							"No dreams found"
						)}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
const DELETE_Dream = gql`
	mutation deleteDream($id: ID!) {
		deleteDream(id: $id) {
			id
		}
	}
`;

export default AddDream;
