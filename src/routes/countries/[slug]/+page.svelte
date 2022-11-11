<script lang="ts">
	import { showBackButton } from '$lib/utils/store'
	import type { PageData } from './$types'
	export let data: PageData
	export let countrie = data.countrie[0]
	export let currencies: string
	export let languages: string
	export let borderCountries: any

	$: countrie = data.countrie[0]

	$: if (countrie.currencies) {
		currencies = Object.entries(countrie.currencies)
			.map(([code, currencie]: [string, any]) => currencie.name)
			.join(', ')
	}

	$: if (countrie.languages) {
		languages = Object.entries(countrie.languages)
			.map(([code, language]: [string, any]) => language)
			.join(', ')
	}

	async function getBorderCountries(arr: any) {
		if (arr) {
			const res = await fetch(
				`https://restcountries.com/v3.1/alpha?codes=${countrie.borders.join()}`
			)
			return res.json()
		}

		return []
	}

	$: borderCountries = getBorderCountries(countrie.borders)

	const alphaSort = (arr: any) => {
		return arr.sort((a: any, b: any) => {
			if (a.name.common > b.name.common) {
				return 1
			}
			if (a.name.common < b.name.common) {
				return -1
			}
			return 0
		})
	}

	showBackButton.set(true)
</script>

<svelte:head>
	<title>Where in the world? | {countrie.name.common}</title>
</svelte:head>

<div class="px-4 py-10">
	<section class="container mx-auto grid gap-10 sm:grid-cols-2">
		<img
			src={countrie.name.common === 'Andorra' ? countrie.flags.png : countrie.flags.svg}
			alt={countrie.name.common}
			class="w-full rounded-md"
		/>
		<div class="grid auto-rows-min gap-6">
			<h2 class="overflow-hidden overflow-ellipsis whitespace-nowrap text-4xl font-bold">
				{countrie.name.common}
			</h2>
			<div class="grid auto-rows-min gap-2">
				<p class="font-bold">
					Official name: <span class="font-normal">{countrie.name.official}</span>
				</p>
				<p class="font-bold">
					Population: <span class="font-normal"
						>{new Intl.NumberFormat('en').format(countrie.population)}</span
					>
				</p>
				<p class="font-bold">
					Region: <span class="font-normal">{countrie.region}</span>
				</p>
				{#if countrie.subregion}
					<p class="font-bold">
						Sub region: <span class="font-normal">{countrie.subregion}</span>
					</p>
				{/if}
				{#if countrie.capital}
					<p class="font-bold">
						capital: <span class="font-normal">{countrie.capital}</span>
					</p>
				{/if}
				<p class="font-bold">
					Top level domain: <span class="font-normal">{countrie.tld}</span>
				</p>
				{#if currencies}
					<p class="font-bold">
						Currencies: <span class="font-normal">{currencies}</span>
					</p>
				{/if}
				{#if languages}
					<p class="font-bold">
						Languages: <span class="font-normal">{languages}</span>
					</p>
				{/if}
			</div>
		</div>
	</section>
	<hr class="my-10 border-t-slate-300 dark:border-t-slate-800" />
	{#if countrie.borders}
		<h2 class="container mx-auto mb-10 text-3xl font-bold">Border countries</h2>
	{:else}
		<h2 class="container mx-auto text-3xl font-bold">
			{countrie.name.common} does not border any country
		</h2>
	{/if}
	<section class="container mx-auto grid gap-10 grid-auto-fill-48">
		{#if countrie.borders}
			{#await borderCountries}<p>
					Loading...
				</p>{:then countries}{#each alphaSort(countries) as countrie}
					<a
						href={`/countries/${countrie.name.common.toLowerCase()}`}
						class="grid cursor-pointer auto-rows-min overflow-hidden rounded-md hover:scale-105 hover:shadow-2xl fadeIn"
					>
						<div
							class="flex aspect-[3/2] items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-100/60 dark:border-slate-700/50 dark:bg-slate-800/80"
						>
							<img
								src={countrie.name.common === 'Nepal' ? countrie.flags.svg : countrie.flags.png}
								alt={countrie.name.common}
								class="max-h-full"
							/>
						</div>
						<div class="flex items-center gap-1 bg-slate-100 px-4 py-2 dark:bg-slate-800">
							<h3 class="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold">
								{countrie.name.common}
							</h3>
							<p class="text-sm font-normal opacity-60">{countrie.cca2}</p>
						</div>
					</a>
				{/each}{/await}
		{/if}
	</section>
</div>
