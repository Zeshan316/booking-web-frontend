import React from 'react'

export default function Article({
	article,
	removeArticle,
}: {
	article: IArticle
	removeArticle: (article: IArticle) => void
}): JSX.Element {
	return (
		<div className='Article'>
			<div>
				<h1>{article.title}</h1>
				<p>{article.body}</p>
			</div>
			<button onClick={() => alert('del')}>Delete</button>
		</div>
	)
}
