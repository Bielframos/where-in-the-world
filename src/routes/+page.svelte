<script lang="ts">
	import type { PageData } from './$types'
	import { useLazyImage as lazyImage } from 'svelte-lazy-image'

	export let data: PageData
	let countries = data.countries.sort((a: any, b: any) => {
		if (a.name.common > b.name.common) {
			return 1
		}
		if (a.name.common < b.name.common) {
			return -1
		}
		return 0
	})
</script>

<div class="px-4 py-10">
	<section class="grid grid-auto-fill gap-10 container mx-auto">
		{#each countries as countrie}
			<div class="grid auto-rows-min overflow-hidden rounded-md">
				<div
					class="aspect-[3/2] flex items-center justify-center overflow-hidden bg-slate-100/60 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/50"
				>
					<img
						src={countrie.name.common === 'Nepal' ? countrie.flags.svg : countrie.flags.png}
						alt={countrie.name.common}
						use:lazyImage={{ threshold: 0.5 }}
						class="max-h-full"
					/>
				</div>
				<div class="grid gap-1 px-4 py-6 bg-slate-100 dark:bg-slate-800">
					<p class="text-sm font-normal opacity-60">{countrie.cca2}</p>
					<p class="overflow-ellipsis overflow-hidden whitespace-nowrap text-xl font-bold">
						{countrie.name.common}
					</p>
					<p class="overflow-ellipsis overflow-hidden whitespace-nowrap font-bold">
						Population: <span class="font-normal"
							>{new Intl.NumberFormat('en').format(countrie.population)}</span
						>
					</p>
					<p class="overflow-ellipsis overflow-hidden whitespace-nowrap font-bold">
						Region: <span class="font-normal">{countrie.region}</span>
					</p>
				</div>
			</div>
		{/each}
	</section>
</div>
