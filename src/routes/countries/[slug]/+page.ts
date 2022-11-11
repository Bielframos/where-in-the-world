import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
	let url = 'https://restcountries.com/v3.1/name/' + params.slug
	let res = await fetch(url)
	let countrie = await res.json()

	return {
		countrie
	}
}
