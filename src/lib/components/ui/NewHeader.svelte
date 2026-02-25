<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import { setLocale } from '$lib/paraglide/runtime';

	const links = [
		{ href: '/#concerts', label: m.nav_concerts },
		{ href: '/#bio', label: m.nav_bio },
		{ href: '/#videos', label: m.nav_videos },
		{ href: '/#projects', label: m.nav_projects },
		{ href: '/#recordings', label: m.nav_recordings },
		{ href: '/#contact', label: m.nav_contact }
	];

	function getNextLocaleHref() {
		const currentLocale = locales.find((l) => page.url.pathname.startsWith('/' + l)) || 'en';
		const currentIndex = locales.indexOf(currentLocale);
		const nextIndex = (currentIndex + 1) % locales.length;
		const nextLocale = locales[nextIndex];
		setLocale(currentLocale);
		return localizeHref(page.url.pathname, { locale: nextLocale });
	}

	const currentLocale = $derived(getLocale());

	let scrollY = $state(0);

	function closeDrawer() {
		const el = document.getElementById('mobile-drawer') as HTMLInputElement;
		if (el) el.checked = false;
	}
</script>

<svelte:window bind:scrollY />

<header
	class="fixed top-0 z-50 h-12 w-full border-b bg-black/0 whitespace-nowrap transition-all duration-300 sm:px-4 xl:px-0 {scrollY >
	50
		? 'border-white/10 bg-black/30 shadow-lg backdrop-blur-2xl'
		: 'border-transparent bg-linear-to-b from-black/80 to-0% shadow-none'}"
>
	<div class="navbar min-h-12 py-0">
		<div class="mx-auto flex w-full max-w-6xl">
			<!-- Logo / Brand -->
			<div class="flex flex-1 items-center">
				<a
					href="/test"
					class="text-base font-medium tracking-widest text-base-content/80 transition-colors hover:text-primary"
				>
					BOGDAN NESTERENKO
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden items-center lg:flex">
				<ul class="menu menu-horizontal gap-1 px-0 py-0 text-sm">
					{#each links as link}
						<li>
							<a
								href={link.href}
								class="tracking-wide text-base-content/80 transition-colors hover:text-primary"
							>
								{link.label()}
							</a>
						</li>
					{/each}
					<!-- Language switcher -->
					<li class="ml-4">
						<a
							href={getNextLocaleHref()}
							class="text-sm tracking-wider text-base-content/80 uppercase transition-colors hover:text-primary"
						>
							{currentLocale}
						</a>
					</li>
				</ul>
			</nav>

			<!-- Mobile: language + hamburger -->
			<div class="flex items-center gap-2 lg:hidden">
				<a
					href={getNextLocaleHref()}
					class="btn text-xs text-base-content/80 uppercase btn-ghost btn-sm"
				>
					{currentLocale}
				</a>
				<label
					for="mobile-drawer"
					class="btn btn-square text-base-content/80 btn-ghost btn-sm"
					aria-label="Open menu"
				>
					<Icon icon="material-symbols:menu" width="24" />
				</label>
			</div>
		</div>
	</div>
</header>

<!-- Mobile Drawer (daisyUI) -->
<div class="drawer z-100 drawer-end lg:hidden">
	<input id="mobile-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-side">
		<label for="mobile-drawer" aria-label="Close menu" class="drawer-overlay"></label>

		<aside
			class="flex min-h-full w-72 flex-col border-l border-white/10 bg-black/50 text-base-content/80 shadow-2xl backdrop-blur-xl"
		>
			<div class="flex justify-end p-4">
				<label for="mobile-drawer" class="btn btn-square btn-ghost btn-sm" aria-label="Close menu">
					<Icon icon="material-symbols:close" width="24" />
				</label>
			</div>

			<nav class="flex flex-1 flex-col gap-1 px-4">
				<ul class="menu gap-1 text-lg">
					{#each links as link}
						<li>
							<a href={link.href} onclick={closeDrawer} class="tracking-wide uppercase">
								{link.label()}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	</div>
</div>
