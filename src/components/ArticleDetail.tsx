import React from 'react'
import { useParams } from 'react-router-dom'

export default function ArticleDetail(): JSX.Element {
	console.log(useParams())
	return <h1>My Article Detail</h1>
}
