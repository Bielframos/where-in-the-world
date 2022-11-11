import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, route }) => {
	const res = await fetch('https://restcountries.com/v3.1/all')
	const countries = res.json()

	return {
		countries,
		route
	}
}
