<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state'; // Для відстеження поточної сторінки
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime'; // Функції Paraglide
	import ThemeChanger from './ThemeChanger.svelte';

	import { m } from '$lib/paraglide/messages.js';
	import { setLocale } from '$lib/paraglide/runtime';

	const links = [
		{href: '#concerts', label: m.nav_concerts},
		{href: '#videos', label: m.nav_videos},
		{href: '/bio', label: m.nav_bio},
		{href: '/projects', label: m.nav_projects},
		{href: '/recordings', label: m.nav_recordings},
		{href: '/contact', label: m.nav_contact}
	];
	const arrowLink = { href: '/arrow', label: 'Arrow', icon: 'material-symbols:arrow-drop-down-rounded' }

	// Логіка перемикання: знаходимо індекс поточної мови і беремо наступну
    function getNextLocaleHref() {
        // Визначаємо поточну мову з URL або беремо першу (en)
        const currentLocale = locales.find(l => page.url.pathname.startsWith('/' + l)) || 'en';
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];
		setLocale(currentLocale);
        
        return localizeHref(page.url.pathname, { locale: nextLocale });
    }

	const currentLocale = $derived(getLocale());

	let isMenuOpen = $state(false); // Для Svelte 5
    // або let isMenuOpen = false; для Svelte 4

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<header class="sticky top-0 z-50 flex w-full justify-between bg-base-200 text-center">
	<div class="mx-auto flex w-full max-w-6xl justify-between px-4 md:px-8">
		<div class = "flex flex items-center h-full hover:text-primary">
			<a href="/">BOGDAN NESTERENKO</a>
		</div>
		<nav class="hidden md:flex list-none text-base-content items-center">
			<div class = "relative flex gap-6">
				{#each links as link}
					<li  class="static group flex items-center">
						<a href={link.href} class=" hover:text-primary">
							{link.label()}
						</a>
					</li>
				{/each}
			</div>
			<ThemeChanger />
			<a 
				href={getNextLocaleHref()} 
				class="group flex gap-2 transition-all duration-300 items-center hover:text-primary"
			>
				<span class="uppercase">{currentLocale}</span>
			</a>
			
		</nav>

		<div class="drawer drawer-end md:hidden w-auto">
			<input id="mobile-menu" type="checkbox" class="drawer-toggle" />
			
			<div class="drawer-content flex items-center gap-4">
				<ThemeChanger />
				<a href={getNextLocaleHref()} class="uppercase text-base-content">{currentLocale}</a>
				
				<label for="mobile-menu" class="cursor-pointer">
				<Icon icon="material-symbols:menu" width="28" />
				</label>
			</div> 

			<div class="drawer-side z-[100]">
				<label for="mobile-menu" aria-label="close sidebar" class="drawer-overlay"></label>
				
				<div class="menu w-64 min-h-full bg-base-200 text-base-content flex flex-col pt-0 px-4 md:px-8">
					
					<div class="flex justify-end items-center py-4">
						<label for="mobile-menu" class="cursor-pointer flex items-center justify-center">
							<Icon icon="material-symbols:close" width="28" />
						</label>
					</div>

					<nav class="flex flex-col gap-6 mt-10 items-start">
						{#each links as link}
							<a 
								href={link.href} 
								onclick={closeMenu} 
								class="text-2xl uppercase link-underline"
							>
								{link.label()}
							</a>
						{/each}
					</nav>
				</div>
			</div>
		</div>
	</div>
</header>
