import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

declare type reducerType = {
	value: number
	incrementAmount?: number
} & ArticleState

declare type incementValue = {
	value: number
}

const initialState: reducerType = {
	value: 0,
	incrementAmount: 1,
	articles: [
		{
			id: '1',
			title: 'post 1',
			body: 'Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi',
		},
		{
			id: '2',
			title: 'post 2',
			body: 'Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint',
		},
	],
}

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += state.incrementAmount ?? 0
		},
		decrement: (state) => {
			state.value -= state.incrementAmount ?? 0
		},
		changeIncrementAmount: (
			state,
			action: PayloadAction<incementValue>
		) => {
			console.log(state, action)
			state.incrementAmount = action.payload.value
		},
		addArticle: (state, action: PayloadAction<IArticle>) => {
			const { payload } = action
			state.articles.push({ ...payload, id: uuidv4() })
		},
		removeArticle: (state, action: PayloadAction<IArticle>) => {
			const { payload } = action
			state.articles = state.articles.filter(
				(article) => article.id !== payload.id
			)
		},
	},
})

export const {
	increment,
	decrement,
	changeIncrementAmount,
	addArticle,
	removeArticle,
} = articleSlice.actions

export default articleSlice.reducer

/* const articleReducer = (
	state: ArticleState = initialState,
	action: ArticleAction
) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_ARTICLE:
			return {
				...state,
				payload,
			};

		case REMOVE_ARTICLE:
			const updatedArticles: IArticle[] = state.articles.filter(
				(article) => article.id !== payload.id
			);

			return { ...state, articles: updatedArticles };
	}
}; */
