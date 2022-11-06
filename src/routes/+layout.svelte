<script lang="ts">
	import ThemeSwitch from '../components/themeSwitch.svelte'
	import '../app.css'
</script>

<header
	class="w-full bg-slate-100 border-b border-slate-300 dark:bg-slate-800 p-4 dark:border-slate-700"
>
	<div class="container mx-auto flex justify-between items-center">
		<h1 class="text-xl font-bold">Where in the world?</h1>
		<ThemeSwitch />
	</div>
</header>

<main>
	<slot />
</main>
