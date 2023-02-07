import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addArticle } from '../store/reducers/article-reducer'
import { RootState } from '../store'
import { useLocation, useParams } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { setUserData } from '../store/reducers/auth-reducer'

import AddArticle from '../components/AddArticle'
import Article from '../components/Article'

export default function AllArticle(): JSX.Element {
	const dispatch = useDispatch()
	const location = useLocation()

	console.log(location, useParams())

	const getData = async () => {
		const data = await AuthService.getFakeUser()
		console.log('data', data)
		dispatch(setUserData(data))
	}

	const name = useSelector((state: RootState) => {
		return state.auth.user.firstName
	})

	React.useEffect(() => {
		getData()
	}, [])

	const articles = useSelector(
		(state: RootState) => state.article.articles
	)

	function saveArticle(article: IArticle | {}): void {
		dispatch(addArticle(article))
	}

	function removeArticle(article: IArticle | {}): void {
		console.log(article)
		alert('deleting article...')
	}

	return (
		<>
			<h1>My Articles, Hi, {name}</h1>
			<AddArticle saveArticle={saveArticle} />
			{articles.map((article: IArticle) => (
				<Article
					key={article.id}
					article={article}
					removeArticle={removeArticle}
				/>
			))}
		</>
	)
}
