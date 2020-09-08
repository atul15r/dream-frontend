import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container } from "@material-ui/core";
import { Form, Input, Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { getDream } from "../query/queryies";
import { notification } from "antd";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: "center",
		color: theme.palette.text.secondary,
		position: "relative",
		height: 250,
		marginTop: 15,
		boxShadow: "none",
	},
}));

function AddDream() {
	const [form] = Form.useForm();

	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
	const [addDream, { data }] = useMutation(ADD_Dream);

	const layout = {
		labelCol: {
			span: 8,
		},
		wrapperCol: {
			span: 16,
		},
	};
	const validateMessages = {
		required: "${label} is required!",
		types: {
			email: "${label} is not validate email!",
			number: "${label} is not a validate number!",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};
	const onFinish = values => {
		console.log(values.user);
		setLoading(true);
		addDream({
			variables: {
				name: values.user.name,
				dream: values.user.dream,
			},
			onError(err) {
				setLoading(false);
			},
			update(_, {}) {
				setLoading(false);
				console.log("completed");
				notification["success"]({
					message: "Dream Successfully Added",
					description: values.user.dream,
				});
				form.resetFields();
			},
			refetchQueries: [{ query: getDream }],
		});
	};

	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Form
								{...layout}
								form={form}
								name='control-hooks'
								onFinish={onFinish}
								validateMessages={validateMessages}
								style={{
									transform: "translate(-50%,-50%)",
									position: "absolute",
									left: "50%",
									top: "50%",
								}}
							>
								<Form.Item
									name={["user", "name"]}
									label='Name'
									rules={[
										{
											required: true,
										},
									]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									name={["user", "dream"]}
									label='Dream'
									rules={[
										{
											required: true,
										},
									]}
								>
									<Input.TextArea />
								</Form.Item>
								<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
									<Button type='primary' htmlType='submit' loading={loading}>
										Add Dream
									</Button>
								</Form.Item>
							</Form>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
const ADD_Dream = gql`
	mutation addDream($name: String!, $dream: String!) {
		addDream(name: $name, dream: $dream) {
			id
			name
			dream
		}
	}
`;

export default AddDream;
