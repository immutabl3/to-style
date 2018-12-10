import React from 'react';
const readMeHtml = require('../../public/README.html');

export default function Main() {
	return (
		<main className="main">
			<div 
				className="markdown-html language-javascript"
				dangerouslySetInnerHTML={{ __html: readMeHtml }}
			/>
		</main>
	);
};