import React from "react";

// eslint-disable-next-line no-unused-vars,react/prop-types
export default function Step4InputGamesQtPage({surveyResultObject}) {
	return(
		<div>
			<label>Some question about games:</label>
			<input
				type="text"
				autoFocus
				required
			/>
		</div>
	);
}