<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper/types';
	import emailjs from '@emailjs/browser';

	register();

	let { data }: PageProps = $props();

	let videoElement: HTMLVideoElement;

	let scrollY = $state(0);
	let innerHeight = $state(0);

	let isOpaqueOverlay = $derived(innerHeight === 0 ? false : scrollY > innerHeight * 0.2);

	let videos1 = [
		{ id: 'video4', title: 'Pablo de Sarasate "Navarra" - Trio SVITA', videoId: 'JKCSseSa4CY' },
		{ id: 'video5', title: 'Oy ya znayu/ Ой я знаю - Duo Spivograï', videoId: 'NynXtGhj-dU' },
		{
			id: 'video6',
			title:
				'J.S. Bach - Allegro, Marc Hervieux (flûte à bec) et Bogdan Nesterenko (accordéon de concert)',
			videoId: 'cQ8ZzzPloXc'
		},
		{
			id: 'video1',
			title: 'Moussorgski "La Grande Porte de Kiev" / Bogdan Nesterenko, accordéon bayan',
			videoId: 'HgQPZRY2aic'
		},
		{
			id: 'video2',
			title: 'Ukraine la musique et la guerre. Bogdan Nesterenko dans Mélodies Nocturnes.',
			videoId: '3OjadYgRVUg'
		},
		{
			id: 'video3',
			title: 'Aftermovie Récital Classique de Bogdan Nesterenko - 6 Mai 2018',
			videoId: 'uuC-SMsnMWw'
		}
	];

	let videos = [...videos1, ...videos1, ...videos1];

	let playingVideoId = $state<number | null>(null);

	const swiperParams: SwiperOptions & Record<string, unknown> = {
		slidesPerView: 1.2,
		centeredSlides: true,
		spaceBetween: 6,
		loop: true,
		loopAdditionalSlides: 6,
		watchSlidesProgress: true,
		preloadImages: true,

		navigation: {
			prevEl: '.nav-prev',
			nextEl: '.nav-next'
		},

		allowTouchMove: true,
		simulateTouch: true,

		keyboard: {
			enabled: true
		},

		mousewheel: false,

		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			1024: {
				slidesPerView: 2.2
			}
		},
		observer: true,
		observeParents: true
	};

	onMount(() => {
		const swiperEl = document.querySelector('swiper-container');
		if (swiperEl) {
			Object.assign(swiperEl, swiperParams);

			swiperEl.initialize();

			swiperEl.addEventListener('swiperslidechange', () => {
				setTimeout(() => {
					playingVideoId = null;
				}, 0);
			});

			setTimeout(() => {
				swiperEl.swiper.update();
			}, 100);
		}
	});

	function playVideo(index: number): void {
		playingVideoId = index;
	}

	const imageModules = import.meta.glob(
		'/static/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	) as Record<string, { default: string }>;

	let currentIndex1 = $state(0);
	let currentIndex2 = $state(0);

	const images1 = [
		imageModules['/static/1121.webp']?.default,
		imageModules['/static/1123.webp']?.default
	];
	const images2 = [
		imageModules['/static/1109.webp']?.default,
		imageModules['/static/1111.webp']?.default
	];

	function nextSlide1() {
		currentIndex1 = (currentIndex1 + 1) % images1.length;
	}
	function prevSlide1() {
		currentIndex1 = (currentIndex1 - 1 + images1.length) % images1.length;
	}
	function nextSlide2() {
		currentIndex2 = (currentIndex2 + 1) % images2.length;
	}
	function prevSlide2() {
		currentIndex2 = (currentIndex2 - 1 + images2.length) % images2.length;
	}

	const albums = [
		{
			title: 'Un Sacre du Printemps',
			year: '2021',
			label: 'Editions Musica Prima',
			artists: 'Bogdan Nesterenko (accordéon bayan)',
			description: m.album1_description(),
			image: imageModules['/static/pochette.webp']?.default
		},
		{
			title: 'Dialogues insolites',
			year: '2017',
			label: 'Editions Rainbow Classics',
			artists: 'Marc Hervieux (flûte à bec) et  Bogdan Nesterenko (accordéon)',
			description: m.album2_description(),
			image: imageModules['/static/Dialogue-insolite.webp']?.default
		},
		{
			title: 'Comme un air de passions...',
			year: '2013',
			label: 'Editions AR-RE-SE',
			artists: 'Juliette de Massy (soprano) et  Bogdan Nesterenko (accordéon)',
			description: m.album3_description(),
			image: imageModules['/static/Comme-un-air-de-passions   3.webp']?.default
		},
		{
			title: 'Accordéon Baroque',
			year: '2006',
			label: 'Editions HIRIN (Ukraine)',
			artists: 'Bogdan Nesterenko (accordion)',
			description: m.album4_description(),
			image: imageModules['/static/1 str.webp']?.default
		}
	];

	const projects = [
		{ id: 1, title: 'TRIO SViTA', img: imageModules['/static/projects/1201 SVITA.webp']?.default },
		{
			id: 2,
			title: 'PAN & BAYAN',
			img: imageModules['/static/projects/1301 Pan Bayan.webp']?.default
		},
		{
			id: 3,
			title: 'Avec Juliette DE MASSY',
			img: imageModules['/static/projects/1412 Ju.webp']?.default
		},
		{
			id: 4,
			title: 'Avec Olga VOJNOVIC',
			img: imageModules['/static/projects/1501 Olga.webp']?.default
		},
		{
			id: 5,
			title: 'DIALOGUE INSOLITE',
			img: imageModules['/static/projects/1601 Marc.webp']?.default
		},
		{
			id: 6,
			title: 'ORGUE et ACCORDÉON',
			img: imageModules['/static/projects/1701 Jan.webp']?.default
		},
		{
			id: 7,
			title: 'RAFRAÎCHIS AUSSI LE SOL NU',
			img: imageModules['/static/projects/RAFRAÎCHIS.webp']?.default
		},
		{
			id: 8,
			title: 'LE CHANT DU CYGNE',
			img: imageModules['/static/projects/Le chant du cygne_cropped.webp']?.default
		}
	];

	let isSending = $state(false);

	onMount(() => {
		emailjs.init('X0Bzm7EnoTZys7dV4');
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;

		if (isSending) return;
		isSending = true;

		try {
			await emailjs.sendForm('service_25elvmp', 'template_fp6ywt9', form, 'X0Bzm7EnoTZys7dV4');
			form.reset();
		} catch {
			// handled silently
		} finally {
			isSending = false;
		}
	}
</script>

<svelte:head>
	<title>Bogdan Nesterenko - {m.label_bayan()}</title>
	<meta name="description" content={m.bio_p1()} />
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight />

<video
	src="/Video Project 2.webm"
	poster="/poster1.webp"
	autoplay
	loop
	muted
	playsinline
	bind:this={videoElement}
	class="pointer-events-none fixed inset-0 z-0 h-screen w-full object-cover"
	aria-hidden="true"
>
	<track kind="captions" />
</video>

<!-- <div class="canvas-vignette pointer-events-none fixed inset-0 z-[1]"></div> -->
<!-- <div class="noise-overlay" aria-hidden="true"></div> -->

<!-- Blur/darken overlay that activates when scrolling past the hero -->
<!-- <div
	class="fixed inset-0 z-1 transition-all duration-500 ease-out"
	style="background: rgba(0,0,0,{overlayProgress() *
		0.4}); backdrop-filter: blur({overlayProgress() *
		14}px);  -webkit-backdrop-filter: blur({overlayProgress() * 14}px); backface-visibility: hidden;"
	aria-hidden="true"
></div> -->

<div
	class="pointer-events-none fixed left-0 top-0 z-10 h-screen w-full bg-black/60 backdrop-blur-md transition-opacity duration-1000"
	class:opacity-0={!isOpaqueOverlay}
	class:opacity-100={isOpaqueOverlay}
	style="
        transform: translateZ(0);
        will-change: transform, opacity;
    "
	aria-hidden="true"
></div>

<div class="relative z-20 h-screen w-full overflow-hidden">
	<a
		href="#concerts"
		class="absolute inset-x-0 bottom-5 z-20 flex animate-bounce justify-center text-base-content/60 transition-colors hover:text-primary"
		aria-label="Scroll to concerts"
	>
		<Icon icon="mdi:chevron-down" width="32" height="32" />
	</a>

	<div
		class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white"
	>
		<h1 class="text-5xl font-bold tracking-tight text-base-content/80 md:text-7xl">
			BOGDAN NESTERENKO
		</h1>
		<p class="mt-4 max-w-xl text-lg text-base-content/80 md:text-xl">
			{m.label_bayan()}
		</p>
	</div>
</div>
<main class="relative z-20 mx-auto w-full px-0 sm:px-4 md:px-8 md:py-24">
	<section id="concerts" class="mx-auto w-full max-w-4xl px-8 pt-24 pb-8 font-sans sm:px-4">
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">
				{m.title_concerts()}
			</h2>
		</div>

		<div class="space-y-4">
			{#each data.concerts as concert, index (concert.date + index)}
				<div
					class="flex min-h-[120px] w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 p-4 transition-all hover:bg-black/40 md:gap-6 md:p-6"
				>
					<div
						class=" flex min-w-[50px] flex-col items-center justify-center border-r border-base-content/10 pr-2 md:pr-8"
					>
						<span class="text-3xl leading-none font-medium tracking-tighter text-base-content/80">
							{concert.date.split('-')[2]}
						</span>
						<span
							class="mt-1 text-xs font-medium tracking-wider text-base-content/80 uppercase opacity-70"
						>
							{new Date(concert.date)
								.toLocaleString(getLocale(), { month: 'short' })
								.replace('.', '')}
						</span>
						{#if concert.time}
							<span class="mt-1 font-sans text-xs tracking-wide text-base-content/60 opacity-60">
								{concert.time}
							</span>
						{/if}
					</div>

					<div class="flex flex-1 grow flex-col justify-center">
						<h4
							class="text-base leading-tight font-normal tracking-wide text-base-content/80 opacity-90 md:text-lg"
						>
							{concert.city}{#if concert.country}, {concert.country}{/if}
						</h4>

						{#if concert.program}
							<p
								class="mt-2 text-[9px] tracking-widest text-base-content/40 uppercase transition-all duration-700 group-hover:text-base-content/60"
							>
								{concert.program}
							</p>
						{/if}
					</div>

					<div class="flex w-auto items-center justify-end">
						{#if concert.link}
							<a
								href={concert.link}
								target="_blank"
								rel="noopener noreferrer"
								class="btn rounded-2xl border-none bg-transparent px-2 text-xs font-normal tracking-widest text-white/80 shadow-none transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none md:px-6 md:btn-sm"
							>
								INFO
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section
		id="bio"
		class="md:space-y-24І mx-auto mt-24 w-full max-w-4xl space-y-24 px-8 py-24 pb-16 sm:px-4 md:pb-32"
	>
		<div class="group/bio1 mb-12 flex flex-col items-stretch gap-10 md:mb-24 md:flex-row lg:gap-16">
			<div class="flex w-full flex-1 flex-col justify-center">
				<div class="mb-8 flex items-center gap-4 opacity-70">
					<h2 class="text-lg font-normal tracking-[0.5em] uppercase">{m.title_biography()}</h2>
				</div>
				<div
					class="relative space-y-6 border-white/10 text-justify font-sans text-sm leading-relaxed font-light tracking-wide text-base-content/80 lg:border-l lg:pl-8"
				>
					<p>
						{m.bio_p1()}
					</p>
					<p>
						{m.bio_p2()}
					</p>
				</div>
			</div>

			<div class="relative min-h-[450px] w-full shrink-0 md:min-h-0 md:w-[320px]">
				<div class="absolute inset-0 flex items-center">
					<button
						onclick={prevSlide1}
						class="absolute left-2 z-30 p-1 text-white/20 opacity-0 transition-all
							duration-500 group-hover/bio1:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div
						class="relative isolate h-full w-full overflow-hidden rounded-lg border border-white/10"
					>
						<div
							class="flex h-full w-full transition-transform duration-700 ease-in-out"
							style="transform: translateX(-{currentIndex1 * 100}%);"
						>
							{#each images1 as src, index (index)}
								<div class="h-full w-full shrink-0 overflow-hidden">
									<enhanced:img
										{src}
										alt="Bogdan"
										class="h-full w-full object-cover brightness-60 transition-all duration-700 group-hover/bio1:scale-105 group-hover/bio1:brightness-90"
									/>
								</div>
							{/each}
						</div>
					</div>

					<button
						onclick={nextSlide1}
						class="absolute right-2 z-30 p-1 text-white/20 opacity-0 transition-all
							duration-500 group-hover/bio1:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
				</div>
			</div>
		</div>

		<div class="group/bio2 flex flex-col items-stretch gap-10 md:flex-row-reverse lg:gap-16">
			<div class="flex w-full flex-1 flex-col justify-center">
				<div
					class="relative space-y-6 border-white/10 text-justify font-sans text-sm leading-relaxed font-light tracking-wide text-base-content/80 lg:border-r lg:pr-8"
				>
					<p>
						{m.bio_p3()}
					</p>
					<p>
						{m.bio_p4()}
					</p>
					<p>
						{m.bio_p5()}
					</p>
					<p>
						{m.bio_p6()}
					</p>
				</div>
			</div>

			<div class="relative min-h-[350px] w-full shrink-0 md:min-h-0 md:w-[320px]">
				<div class="absolute inset-0 flex items-center transition-transform">
					<button
						onclick={prevSlide2}
						class="absolute left-2 z-30 p-1 text-white/20 opacity-0 transition-all
							duration-500 group-hover/bio2:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div
						class="relative isolate h-full w-full overflow-hidden rounded-lg border border-white/10"
					>
						<div
							class="flex h-full w-full transition-transform duration-700 ease-in-out"
							style="transform: translateX(-{currentIndex2 * 100}%);"
						>
							{#each images2 as src, index (index)}
								<div class="h-full w-full shrink-0 overflow-hidden">
									<enhanced:img
										{src}
										alt="Bogdan"
										class="h-full w-full object-cover brightness-60 transition-all duration-700
											group-hover/bio2:scale-105 group-hover/bio2:brightness-90"
									/>
								</div>
							{/each}
						</div>
					</div>

					<button
						onclick={nextSlide2}
						class="absolute right-2 z-30 p-1 text-white/20 opacity-0 transition-all
							duration-500 group-hover/bio2:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
				</div>
			</div>
		</div>
	</section>

	<section
		id="videos"
		class="group/section relative mx-auto w-full max-w-4xl overflow-hidden px-0 py-24 sm:px-4"
	>
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">
				<span class="block">{m.title_video_short()}</span>

				<!-- <span class="hidden sm:block">{m.title_video_long()}</span> -->
			</h2>
		</div>

		<swiper-container init="false" class="">
			{#each videos as video, index (index)}
				<swiper-slide>
					<div
						class="video-wrapper relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 transition-all duration-700"
					>
						{#if playingVideoId === index}
							<iframe
								class="h-full w-full"
								src="https://www.youtube.com/embed/{video.videoId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0"
								title={video.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; media-playback-quality"
								allowfullscreen
							></iframe>
						{:else}
							<img
								src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg"
								alt={video.title}
								class="h-full w-full object-cover brightness-60 transition-all duration-300"
								width="480"
								height="360"
								loading="lazy"
							/>

							<button
								onclick={() => playVideo(index)}
								class="group absolute inset-0 z-30 flex items-center justify-center border-none bg-transparent transition-all outline-none"
								type="button"
								aria-label="Play {video.title}"
							>
								<div
									class="rounded-full bg-white/5 p-1 backdrop-blur-md transition-all duration-300 ease-out
										group-hover:scale-110 group-hover:bg-white/20"
								>
									<svg
										class="mr-3 ml-3 h-6 w-6 fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300
											ease-in-out"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</button>
						{/if}
					</div>

					<p
						class="slide-title mt-4 text-center text-[9px] tracking-widest text-base-content/40 uppercase transition-opacity duration-700"
					>
						{video.title}
					</p>
				</swiper-slide>
			{/each}
		</swiper-container>

		<button
			class="nav-prev absolute top-[44.5%] left-0 z-50 hidden -translate-y-1/2 text-white/20 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 hover:text-white md:left-4 md:flex"
			aria-label="Previous slide"
		>
			<Icon icon="mdi:chevron-left" width="32" height="32" />
		</button>

		<button
			class="nav-next absolute top-[44.5%] right-0 z-50 hidden -translate-y-1/2 text-white/20 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 hover:text-white md:right-4 md:flex"
			aria-label="Next slide"
		>
			<Icon icon="mdi:chevron-right" width="32" height="32" />
		</button>

		<div class="mt-4 flex justify-center pt-8">
			<a
				href="https://youtube.com/@bogdannesterenko7139"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-2 rounded-2xl border-none bg-transparent px-4 py-2 text-xs font-normal tracking-widest text-white/40 uppercase transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none"
			>
				<span class="text-base-content/40 transition-colors group-hover:text-primary">
					{m.btn_more_youtube()}
				</span>
			</a>
		</div>
	</section>
	<style>
		swiper-container {
			width: 100%;
			max-width: 100vw;
			overflow: visible;
		}

		#videos {
			width: 100%;
			overflow: hidden;
			background: transparent;
		}

		:global(.swiper-wrapper) {
			display: flex;
			width: 100%;
		}

		swiper-slide .video-wrapper button {
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.5s ease-in-out;
		}

		swiper-slide.swiper-slide-active .video-wrapper button {
			opacity: 1;
			pointer-events: auto;
		}

		swiper-slide.swiper-slide-active .video-wrapper button:hover {
			transform: scale(1.05);
		}
	</style>

	<section id="projects" class="mx-auto w-full max-w-4xl px-8 py-32 sm:px-4">
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">
				{m.title_projects()}
			</h2>
		</div>

		<div class="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
			{#each projects as project (project.id)}
				<div
					class="group/proj relative aspect-10/13 overflow-hidden rounded-xl border border-white/10 bg-base-200/30 transition-all"
				>
					<enhanced:img
						src={project.img}
						alt={project.title}
						class="h-full w-full object-cover brightness-50 transition-all duration-700 ease-in-out group-hover/proj:scale-105 group-hover/proj:brightness-80"
					/>

					<div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
						<div class="translate-y-4 opacity-100 transition-all duration-700 ease-out">
							<p class="text-md mt-2 tracking-wider text-base-content/80 uppercase md:text-sm">
								{project.title}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="recordings" class="relative mx-auto max-w-4xl px-8 py-24 sm:px-4">
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">
				{m.title_discography()}
			</h2>
		</div>

		<div class="absolute top-40 bottom-24 left-1/2 hidden w-[0.5px] bg-white/10 md:block"></div>

		<div class="space-y-8 md:space-y-0">
			{#each albums as album, i (album.title)}
				<div
					class="group relative flex flex-col items-center justify-between py-4 md:flex-row md:py-6"
				>
					<div
						class="absolute top-1/2 left-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full
						bg-base-content/50 transition-all duration-500
						group-hover:bg-base-content/80 md:block"
					></div>

					<div
						class="flex w-full justify-center md:w-[45%] {i % 2 === 0
							? 'md:justify-end'
							: 'order-1 md:order-2 md:justify-start'}"
					>
						<div class="relative h-32 w-32 sm:h-40 sm:w-40">
							<div
								class="absolute inset-0 overflow-hidden rounded-lg border border-white/10 text-center shadow-2xl brightness-60 transition-all duration-600 group-hover:brightness-80"
							>
								<enhanced:img
									src={album.image}
									alt={album.title}
									class="h-full w-full object-cover text-base-content/60 transition-transform duration-600 group-hover:scale-105 group-hover:text-base-content/80"
								/>
							</div>
							<div
								class="pointer-events-none absolute inset-0 rounded-lg border border-white/10 transition-colors"
							></div>
						</div>
					</div>

					<div
						class="mt-4 w-full text-center md:mt-0 md:w-[45%] {i % 2 === 0
							? 'order-2 md:order-2 md:text-left'
							: 'order-2 md:order-1 md:text-right'}"
					>
						<p
							class="mb-1 text-xs tracking-[0.25em] text-base-content/60 uppercase group-hover:text-base-content/80"
						>
							{album.year} • {album.label}
						</p>

						<h3
							class="mb-2 text-lg font-light tracking-tight text-base-content/80 group-hover:text-base-content/80 md:text-xl lg:text-base-content/60"
						>
							{album.title}
						</h3>

						<p
							class="md:text-md text-sm leading-relaxed font-light text-base-content/80 transition-colors group-hover:text-base-content/80 lg:text-base-content/60"
						>
							{album.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section
		id="contact"
		class="relative flex min-h-screen items-center justify-center overflow-hidden py-24"
	>
		<div class="relative z-10 mx-auto w-full max-w-2xl px-8 sm:px-4 md:px-8">
			<div class="mx-auto max-w-2xl">
				<div class="mb-4 text-center">
					<div class="mb-6 flex items-center justify-center gap-4 opacity-70">
						<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Contact</h2>
					</div>

					<div class="flex flex-col items-center justify-center text-sm">
						<p
							class="font-light tracking-widest text-base-content/80 selection:bg-primary selection:text-white"
						>
							bogdan.nesterenko@yahoo.fr
						</p>
						<p
							class="font-light tracking-widest text-base-content/80 selection:bg-primary selection:text-white"
						>
							+33 6 66 45 59 32
						</p>
					</div>
				</div>

				<form
					onsubmit={handleSubmit}
					class="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 md:p-10"
				>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="form-control">
							<label class="label pt-0" for="name">
								<span
									class="label-text pb-1 pl-1 text-xs tracking-[0.15em] text-base-content/80 uppercase"
									>{m.contact_name_label()}</span
								>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder={m.contact_name_placeholder()}
								required
								class="input w-full rounded-none border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
							/>
						</div>

						<div class="form-control">
							<label class="label pt-0" for="email">
								<span
									class="label-text pb-1 pl-1 text-xs tracking-[0.15em] text-base-content/80 uppercase"
									>{m.contact_email_label()}</span
								>
							</label>
							<input
								type="email"
								placeholder="email@example.com"
								id="email"
								name="email"
								required
								class="input w-full rounded-none border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
							/>
						</div>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="subject">
							<span
								class="label-text pb-1 pl-1 text-xs tracking-[0.15em] text-base-content/80 uppercase"
								>{m.contact_subject_label()}</span
							>
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							placeholder={m.contact_subject_placeholder()}
							required
							class="input w-full rounded-none border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
						/>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="message">
							<span
								class="label-text pb-1 pl-1 text-xs tracking-[0.15em] text-base-content/80 uppercase"
								>{m.contact_message_label()}</span
							>
						</label>
						<textarea
							name="message"
							id="message"
							placeholder={m.contact_message_placeholder()}
							required
							class="textarea min-h-[120px] w-full resize-none rounded-none border-none textarea-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
						></textarea>
					</div>

					<input type="hidden" name="time" value={new Date().toLocaleString()} />

					<div class="flex justify-center pt-4">
						<button
							type="submit"
							disabled={isSending}
							class="btn rounded-2xl border-none bg-transparent px-6 py-2 text-xs font-normal tracking-widest text-white/80 uppercase shadow-none transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:btn-sm"
						>
							<span class="transition-colors">
								{isSending ? m.contact_sending_status() : m.contact_send_button()}
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</section>
</main>

<!-- <style>
	.canvas-vignette {
		/* Темные края, прозрачный центр */
		background:
			radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.6) 100%),
			/* Текстура холста (мелкая сетка) */ linear-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 2px),
			linear-gradient(90deg, rgba(0, 0, 0, 0.1) 2px, transparent 2px);
		background-size:
			100% 100%,
			3px 3px,
			3px 3px;
	}
</style> -->
