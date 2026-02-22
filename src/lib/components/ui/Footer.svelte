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

<footer class="flex w-full justify-center border-t border-white/5 bg-transparent py-10">
	<div class="flex max-w-5xl flex-col gap-6 px-4">
		<div class="flex flex-wrap justify-center">
			<nav class="flex flex-wrap justify-center gap-1">
				{#each links as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/10"
					>
						<Icon icon={link.icon} class="text-lg text-white/60 group-hover:text-white" />

						<span
							class="hidden text-sm tracking-wide text-white/80 uppercase transition-colors group-hover:text-white sm:inline"
						>
							{link.label}
						</span>
					</a>
				{/each}
			</nav>
		</div>

		<div
			class="flex w-full justify-center text-[10px] font-light tracking-[0.4em] text-white/20 uppercase"
		>
			© {new Date().getFullYear()} Bogdan Nesterenko
		</div>
	</div>
</footer>
