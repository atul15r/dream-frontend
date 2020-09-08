import React from "react";
import { PageHeader } from "antd";

export default function Container() {
	return (
		<PageHeader
			style={{
				boxShadow:
					"0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
			}}
			className='site-page-header'
			title='DreamBOOK'
			subTitle={
				<b
					style={{
						fontSize: 10,
						color: "#999",
						fontWeight: 400,
						fontFamily: "sans-serif",
					}}
				>
					add your dream
				</b>
			}
		/>
	);
}
