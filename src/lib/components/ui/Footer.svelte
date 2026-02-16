<script>
	import Icon from '@iconify/svelte';
	const links = [
		{ href: 'https://youtube.com/@bogdannesterenko7139', icon: 'mdi:youtube', label: 'YouTube' },
		{
			href: 'https://www.instagram.com/bogdannesterenko74',
			icon: 'mdi:instagram',
			label: 'Instagram'
		},
		{
			href: 'https://www.linkedin.com/in/bogdan-nesterenko-29774975/',
			icon: 'mdi:linkedin',
			label: 'LinkedIn'
		},
		{ href: 'https://facebook.com/yourprofile', icon: 'mdi:facebook', label: 'Facebook' },
		// { href: 'https://t.me/yourprofile', icon: 'mdi:telegram', label: 'Telegram'},
		// { href: 'bogdan.nesterenko@yahoo.fr', icon: 'material-symbols:mail', label: 'Email'}
		{
			href: 'https://open.spotify.com/artist/4rbrZcsGjag5jTFXqqNAvG?si=F5a48sF7QgCF-dWPdnqmDg',
			icon: 'mdi:spotify',
			label: 'Spotify'
		}
	];
</script>

<footer class="flex w-full justify-center bg-base-200 py-4">
	<div class="flex max-w-5xl flex-col gap-4">
		<div class="flex flex-wrap justify-center gap-4">
			<nav class="flex gap-6 text-base-content">
				{#each links as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.label}
						class="group flex items-center gap-2 transition-all duration-300 hover:text-primary"
					>
						<!-- class="group flex items-center gap-2 transition-all duration-300 transform hover:text-red-500"   hover:decoration-1 -->
						<Icon icon={link.icon} />
						<span class="hidden sm:inline">
							{link.label}
						</span>
					</a>
				{/each}
			</nav>
		</div>
		<div class="flex w-full max-w-5xl justify-center text-base-content">
			© {new Date().getFullYear()} Bogdan Nesterenko
		</div>
	</div>
</footer>
