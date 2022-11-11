<script lang="ts">
	import ThemeSwitch from '../components/themeSwitch.svelte'
	import '../app.css'
	import { showBackButton } from '$lib/utils/store'
</script>

<header
	class="w-full border-b border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800"
>
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="flex cursor-pointer items-center gap-2">
			{#if $showBackButton}
				<i class="ph-arrow-left" />
			{/if}
			<h1 class="text-xl font-bold">Where in the world?</h1>
		</a>
		<ThemeSwitch />
	</div>
</header>

<main>
	<slot />
</main>
