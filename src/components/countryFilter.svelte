<script lang="ts">
	import { selectedRegion } from '$lib/utils/store'

	let showMenu = false
	const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

	function selectRegion(target: EventTarget | null) {
		const button = target as HTMLButtonElement
		selectedRegion.set(button.innerText)
		showMenu = false
	}

	function openMenu() {
		if ($selectedRegion) {
			selectedRegion.set('')
			return
		}
		showMenu = !showMenu
	}
</script>

<button
	on:click={openMenu}
	class="relative flex items-center gap-2 rounded-md bg-slate-100 py-2 px-3 hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700"
>
	{#if $selectedRegion}
		<p class="whitespace-nowrap">{$selectedRegion}</p>
		<i class="ph-x" />
	{:else}
		<p class="whitespace-nowrap">Filter by region</p>
		<i class="ph-caret-down" />
	{/if}

	{#if showMenu}
		<div
			class="absolute right-0 top-14 grid w-32 divide-y divide-slate-300 rounded-md bg-slate-50 py-1 shadow-2xl dark:divide-slate-700 dark:bg-slate-800"
		>
			{#each regions as region}
				<button
					on:click|stopPropagation={(event) => selectRegion(event.target)}
					class="px-4 py-2 text-start hover:bg-slate-100 dark:hover:bg-slate-700">{region}</button
				>
			{/each}
		</div>
	{/if}
</button>
