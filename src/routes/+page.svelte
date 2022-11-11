<script lang="ts">
	import type { PageData } from './$types'
	import { useLazyImage as lazyImage } from 'svelte-lazy-image'
	import { showBackButton, selectedRegion } from '$lib/utils/store'
	import CountryFilter from '../components/countryFilter.svelte'
	export let data: PageData
	export let countries = data.countries.sort((a: any, b: any) => {
		if (a.name.common > b.name.common) {
			return 1
		}
		if (a.name.common < b.name.common) {
			return -1
		}
		return 0
	})

	const baseCountries = countries

	let searchValue: string

	function searchedCountries(countrieName: string) {
		if (!countrieName) {
			return baseCountries
		}
		return data.countries.filter((countrie: any) =>
			countrie.name.common.toLowerCase().includes(countrieName.toLowerCase())
		)
	}

	function countriesByRegion(region: string) {
		if (!$selectedRegion) {
			return baseCountries
		}

		return data.countries.filter((countrie: any) => countrie.region === region)
	}

	$: countries = countriesByRegion($selectedRegion)

	showBackButton.set(false)
</script>

<svelte:head>
	<title>Where in the world?</title>
</svelte:head>

<div class="px-4 py-10">
	<div class="container mx-auto mb-10 flex justify-between gap-4">
		<div class="relative flex w-full items-center">
			<i class="ph-magnifying-glass absolute left-4" />
			<input
				type="text"
				name="search"
				placeholder="Search for a country"
				class="w-full max-w-sm rounded-md bg-slate-100 py-2 pr-4 pl-12 hover:bg-slate-50 focus:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
				bind:value={searchValue}
				on:change={() => (countries = searchedCountries(searchValue))}
			/>
		</div>
		<CountryFilter />
	</div>
	{#key countries}
		<section class="container mx-auto grid gap-10 grid-auto-fill">
			{#each countries as countrie}
				<a
					href={`/countries/${countrie.name.common.toLowerCase()}`}
					class="fadeIn grid cursor-pointer auto-rows-min overflow-hidden rounded-md hover:scale-105 hover:shadow-2xl"
				>
					<div
						class="flex aspect-[3/2] items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-100/60 dark:border-slate-700/50 dark:bg-slate-800/80"
					>
						<img
							src={countrie.name.common === 'Nepal' ? countrie.flags.svg : countrie.flags.png}
							alt={countrie.name.common}
							use:lazyImage={{ threshold: 0.5 }}
							class="max-h-full"
						/>
					</div>
					<div class="grid gap-1 bg-slate-100 px-4 py-6 dark:bg-slate-800">
						<p class="text-sm font-normal opacity-60">{countrie.cca2}</p>
						<h2 class="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold">
							{countrie.name.common}
						</h2>
						<p class="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
							Population: <span class="font-normal"
								>{new Intl.NumberFormat('en').format(countrie.population)}</span
							>
						</p>
						<p class="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
							Region: <span class="font-normal">{countrie.region}</span>
						</p>
					</div>
				</a>
			{/each}
		</section>
	{/key}
</div>
