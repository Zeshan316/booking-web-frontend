import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addArticle } from '../store/reducers/article-reducer'

export default function AddArticle({
	saveArticle,
}: {
	saveArticle: (article: IArticle) => void
}): JSX.Element {
	const [article, setArticle] = useState<IArticle>({})

	function addNewArticle(e: React.FormEvent): void {
		e.preventDefault()
		saveArticle(article)
	}

	function handleArticleData(
		e: React.FormEvent<HTMLInputElement>
	): void {
		setArticle({
			...article,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	return (
		<form onSubmit={addNewArticle} className='Add-article'>
			<input
				type='text'
				id='title'
				placeholder='Title'
				onChange={handleArticleData}
			/>
			<input
				type='text'
				id='body'
				placeholder='Description'
				onChange={handleArticleData}
			/>
			<button disabled={article === undefined ? true : false}>
				Add article
			</button>
		</form>
	)
}
