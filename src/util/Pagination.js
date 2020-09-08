import React from "react";
import { Menu, Table, Pagination as Pag } from "semantic-ui-react";

const Pagination = ({ postsPerPage, totalPosts, paginate, activePN, col }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const hc = (e, { activePage }) => {
		console.log(activePage);

		paginate(activePage);
	};

	return (
		<Table.Row>
			<Table.HeaderCell colSpan={col}>
				<Menu floated='right' pagination>
					<Pag
						activePage={activePN}
						onPageChange={hc}
						size='mini'
						totalPages={pageNumbers.length}
					/>
				</Menu>
			</Table.HeaderCell>
		</Table.Row>
	);
};

export default Pagination;
