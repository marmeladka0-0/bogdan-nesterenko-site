<script lang="ts">
	import Icon from '@iconify/svelte';

	const links = [
		{ href: '/about', label: 'About', icon: 'material-symbols:person' },
		{ href: '/contact', label: 'Contact', icon: 'material-symbols:phone-enabled' },
		{ href: '/concerts', label: 'Concerts', icon: 'material-symbols:album' }
	];
</script>

<header class="sticky top-0 z-50 flex w-full justify-between bg-base-200 text-center">
	<div class="mx-auto flex w-full max-w-5xl justify-between py-4">
		<div>
			<a href="/">Bogdan Nesterenko</a>
		</div>
		<nav class="flex list-none gap-4 text-base-content">
			{#each links as link}
				<li>
					<a href={link.href} class="group flex items-center gap-2">
						<Icon icon={link.icon} />
						{link.label}
					</a>
				</li>
			{/each}
		</nav>
	</div>
</header>
