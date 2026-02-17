<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	const theme1 = 'light';
	const theme2 = 'dark';

	let currentTheme = $state(theme1);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			currentTheme = savedTheme;
			document.documentElement.setAttribute('data-theme', savedTheme);
		} else {
			// Check system preference if no theme is saved
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			currentTheme = prefersDark ? theme2 : theme1;
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	});

	function toggleTheme() {
		currentTheme = currentTheme === theme1 ? theme2 : theme1;
		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('theme', currentTheme);
	}
</script>

<button
	onclick={toggleTheme}
	class="flex items-center justify-center p-6 transition-all duration-300 hover:text-primary"
>
	{#if currentTheme === theme1}
		<Icon icon="lucide:moon" width="16" height="16" class="stroke-[1.5px]" />
	{:else}
		<Icon icon="lucide:sun" width="16" height="16" class="stroke-[1.5px]" />
	{/if}
</button>
