<script lang="ts">
	let lightMode = true

	function handleSwitchDarkMode() {
		document.documentElement.classList.toggle('dark')
		lightMode = !lightMode
	}
</script>

<button
	class="flex gap-2 px-4 py-2 items-center bg-slate-900/5 hover:bg-slate-900/10 dark:bg-slate-200/5 dark:hover:bg-slate-200/10 rounded-md"
	on:click={() => handleSwitchDarkMode()}
	><i class="ph-moon text-xl" /> {lightMode ? 'Dark' : 'Light'} mode</button
>
