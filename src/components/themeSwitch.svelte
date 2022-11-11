<script lang="ts">
	let lightMode = true

	function handleSwitchDarkMode() {
		document.documentElement.classList.toggle('dark')
		lightMode = !lightMode
	}
</script>

<button
	class="flex items-center gap-2 rounded-md bg-slate-900/5 px-3 py-2 hover:bg-slate-900/10 dark:bg-slate-200/5 dark:hover:bg-slate-200/10 sm:px-4"
	on:click={() => handleSwitchDarkMode()}
	>{#if lightMode}<i class="ph-moon h-5" />
		<p class="hidden sm:inline">Dark Mode</p>{:else}<i class="ph-sun h-5" />
		<p class="hidden sm:inline">Light Mode</p>{/if}</button
>
