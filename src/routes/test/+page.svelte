<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from '../$types';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper/types';

	// Реєструємо Swiper елементи
	register();

	let { data }: PageProps = $props();

	let videoElement: HTMLVideoElement;
	let muted = $state(true);

	function toggleMuted() {
		if (videoElement) {
			videoElement.muted = !videoElement.muted;
			muted = videoElement.muted;
		}
	}

	let scrollY = $state(0);
	let innerHeight = $state(0);

	// Compute overlay progress: 0 in hero, 1 when fully past hero
	let overlayProgress = $derived(() => {
		if (innerHeight === 0) return 0;
		const progress = Math.max(0, Math.min(1, (scrollY - innerHeight * 0.5) / (innerHeight * 0.5)));
		return progress;
	});

	let videos1 = [
		{ id: 'video4', title: 'Pablo de Sarasate "Navarra" - Trio SVITA', videoId: 'JKCSseSa4CY' },
		{ id: 'video5', title: 'Oy ya znayu/ Ой я знаю - Duo Spivograï', videoId: 'NynXtGhj-dU' },
		{ id: 'video6', title: 'J.S. Bach - Allegro, Marc Hervieux (flûte à bec) et Bogdan Nesterenko (accordéon de concert)', videoId: 'cQ8ZzzPloXc' },
		{ id: 'video1', title: 'Moussorgski "La Grande Porte de Kiev" / Bogdan Nesterenko, accordéon bayan', videoId: 'HgQPZRY2aic' },
		{ id: 'video2', title: 'Ukraine la musique et la guerre. Bogdan Nesterenko dans Mélodies Nocturnes.', videoId: '3OjadYgRVUg' },
		{ id: 'video3', title: 'Aftermovie Récital Classique de Bogdan Nesterenko - 6 Mai 2018', videoId: 'uuC-SMsnMWw' }
	];

	let videos = [...videos1, ...videos1, ...videos1];

	// Налаштування слайдера
	let playingVideoId = $state<string | null>(null); // Зберігаємо ID відео, яке зараз відтворюється

	const swiperParams: SwiperOptions & { [key: string]: any } = {
		slidesPerView: 1.8,
		centeredSlides: true,
		spaceBetween: 20,
		loop: true,
		loopAdditionalSlides: 6,
		watchSlidesProgress: true,
		preloadImages: true,

		navigation: {
			prevEl: '.nav-prev',
			nextEl: '.nav-next'
		},

		// По умолчанию ВКЛЮЧАЕМ свайп (для мобильных)
		allowTouchMove: true, 
		simulateTouch: true, 

		keyboard: {
			enabled: true
		},

		mousewheel: false,
		
		breakpoints: {
			// Начиная с 768px (планшеты и десктопы) ВЫКЛЮЧАЕМ свайп
			768: { 
				slidesPerView: 2
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
			// Очищуємо попередні налаштування, якщо вони були
			Object.assign(swiperEl, swiperParams);

			// Важливо: спочатку реєструємо, потім ініціалізуємо
			swiperEl.initialize();

			// Додатковий "пінок" для перерахунку циклу
			setTimeout(() => {
				swiperEl.swiper.update();
			}, 100);
		}
	});

	function playVideo(id: string): void {
		playingVideoId = id;
	}

	// Оставляем ваши переменные
    let currentIndex1 = $state(0);
    let currentIndex2 = $state(0);

    const images1 = ['/1121.jpg', '/1123.jpg'];
    const images2 = ['/1109.jpg', '/1111.jpg'];

    // Функции переключения остаются такими же
    function nextSlide1() { currentIndex1 = (currentIndex1 + 1) % images1.length; }
    function prevSlide1() { currentIndex1 = (currentIndex1 - 1 + images1.length) % images1.length; }
    function nextSlide2() { currentIndex2 = (currentIndex2 + 1) % images2.length; }
    function prevSlide2() { currentIndex2 = (currentIndex2 - 1 + images2.length) % images2.length; }

	const albums = [
		{
			title: 'Un Sacre du Printemps',
			year: '2021',
			label: 'Editions Musica Prima',
			artists: 'Bogdan Nesterenko (accordéon bayan)',
			description:
				"Le dernier album de Bogdan Nesterenko est enregistré dans sa ville natale Kharkiv en Ukraine. Cet album contient un extrait du \"Sacre du Printemps\" et d'autres transcriptions des grandes œuvres des compositeurs russes du 19-ème siècle pour orchestre et piano (\"Les Tableaux d'une exposition\", \"Les saisons\", \"Casse-Noisette\") ainsi que des ouvres originales écrites pour l'accordéon par les compositeurs ukrainiens d'aujourd'hui (Runchak, Koukouzenko).",
			image: '/pochette.jpg'
		},
		{
			title: 'Dialogues insolites',
			year: '2017',
			label: 'Editions Rainbow Classics',
			artists: 'Marc Hervieux (flûte à bec) et  Bogdan Nesterenko (accordéon)',
			description:
				'Un programme de sonates allemandes du 18ème siècle dans une formation nouvelle et inédite. Flûte à bec et accordéon ne se sont jamais rencontrés, ni a travers leur histoire, ni a travers leurs répertoires. Pourtant, ils se croisent aujourd’hui dans un programme réunissant des oeuvres connues et moins connues du répertoire baroque. L’enregistrement de ce disque s’est fait en octobre 2016 dans l’église du Bouclier à Strasbourg.',
			image: '/Dialogue-insolite.jpg'
		},
		{
			title: 'Comme un air de passions...',
			year: '2013',
			label: 'Editions AR-RE-SE',
			artists: 'Juliette de Massy (soprano) et  Bogdan Nesterenko (accordéon)',
			description:
				'Transcriptions de J.S.Bach  pour soprano et accordéon de concert : des extraits de Passion et de cantates en duo (soprano et accordéon) ainsi que Toccata et fugue en ré-mineur (BWV 565) et Prélude et fugue en la-minuer (BWV 543) pour accordéon solo.',
			image: '/Comme-un-air-de-passions   3.jpg'
		},
		{
			title: 'Accordéon Baroque',
			year: '2006',
			label: 'Editions HIRIN (Ukraine)',
			artists: 'Bogdan Nesterenko (accordion)',
			description:
				'Enregistré et sorti en Ukraine ce deuxième album en solo de Bogdan Nesterenko contient quelques transcriptions de musique baroque (J.S. Bach, A. Vivaldi, T. Albinoni, D. Buhtehude) et quelques œuvres originales écrites pour bayan (accordéon de concert) par des compositeurs ukrainiens de la fin du XXème siècle (A. Gaïdenko, A. Belochitsky, V. Zoubitsky).',
			image: '/1 str.jpg'
		}
	];

	const projects = [
		{ id: 1, title: 'TRIO SViTA', img: '/projects/1201 SVITA.jpg' },
		{ id: 2, title: 'PAN & BAYAN', img: '/projects/1301 Pan Bayan.jpg' },
		{ id: 3, title: 'Avec Juliette DE MASSY', img: '/projects/1413 Ju.jpg' },
		{ id: 4, title: 'Avec Olga VOJNOVIC', img: '/projects/1501 Olga.jpg' },
		{ id: 5, title: 'DIALOGUE INSOLITE', img: '/projects/1601 Marc.JPG' },
		{ id: 6, title: 'ORGUE et ACCORDÉON', img: '/projects/1701 Jan.JPG' },
		{ id: 7, title: 'RAFRAÎCHIS', img: '/projects/1201 SVITA.jpg' },
		{ id: 8, title: 'LE CHANT DU CYGNE', img: '/projects/1201 SVITA.jpg' }
	];
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!-- Fixed fullscreen video background -->
<video
	src="/video.webm"
	poster="/poster.webp"
	autoplay
	loop
	muted
	playsinline
	bind:this={videoElement}
	class="fixed inset-0 z-0 h-full w-full object-cover brightness-60"
	aria-hidden="true"
>
	<track kind="captions" />
</video>

<div class="noise-overlay" aria-hidden="true"></div>

<!-- Blur/darken overlay that activates when scrolling past the hero -->
<div
	class="fixed inset-0 z-1 transition-all duration-500 ease-out"
	style="background: rgba(0,0,0,{overlayProgress() *
		0.2}); backdrop-filter: blur({overlayProgress() *
		14}px);  -webkit-backdrop-filter: blur({overlayProgress() * 14}px);"
	aria-hidden="true"
></div>

<div class="relative z-2 h-screen w-full overflow-hidden">
	<!-- <div href="#concerts" class="absolute inset-x-0 bottom-5 z-20 flex animate-bounce justify-center text-white/50">
		<Icon icon="mdi:chevron-down" width="36" height="36" />
	</div> -->
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
		<h1 class="text-5xl font-bold tracking-tight md:text-7xl text-base-content/80">BOGDAN NESTERENKO</h1>
		<p class="mt-4 max-w-xl text-lg md:text-xl text-base-content/80">
			{m.label_bayan()}
		</p>
	</div>

	<!-- Unmute Toggle Button -->
	<div class="absolute right-6 bottom-6 z-20 hidden">
		<button
			class="btn btn-circle bg-black/50 text-white btn-ghost backdrop-blur-sm hover:bg-black/70"
			onclick={toggleMuted}
			aria-label={muted ? 'Unmute video' : 'Mute video'}
		>
			{#if muted}
				<!-- Muted Icon -->
				<Icon icon="mdi:volume-off" width="24" height="24" />
			{:else}
				<!-- Unmuted Icon -->
				<Icon icon="mdi:volume-high" width="24" height="24" />
			{/if}
		</button>
	</div>
</div>
<main class="relative z-2 mx-auto w-full px-4 md:px-8 md:py-24">
	<section id="concerts" class="mx-auto w-full max-w-4xl px-4 pt-24 font-sans">
		<!-- <div class="mb-4 flex items-center justify-center gap-8 opacity-40">
			<h2 class="text-[11px] font-normal tracking-[0.2em] uppercase">
				Upcoming Concerts
			</h2>
		</div> -->
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Upcoming concerts</h2>
		</div>

		<div class="space-y-4">
			{#each data.concerts as concert}
				<div
					class="flex min-h-[120px] w-full items-center justify-between gap-3 rounded-lg bg-base-200/5 p-4 transition-all hover:bg-base-200/40 md:gap-6 md:p-6 border border-white/10"
				>
					<div
						class=" flex min-w-[50px] flex-col items-center justify-center border-r border-base-content/10 pr-2 md:pr-8"
					>
						<span class="text-3xl leading-none font-medium tracking-tighter text-base-content/80">
							{concert.date.split('-')[2]}
						</span>
						<span class="mt-1 text-xs font-medium tracking-wider uppercase opacity-70 text-base-content/80">
							{new Date(concert.date)
								.toLocaleString(getLocale(), { month: 'short' })
								.replace('.', '')}
						</span>
						{#if concert.time}
							<span class="mt-1 font-sans text-xs tracking-wide opacity-60 text-base-content/60">
								{concert.time}
							</span>
						{/if}
					</div>

					<div class="flex flex-1 grow flex-col justify-center">
						<h4 class="text-base leading-tight font-normal tracking-wide opacity-90 md:text-lg text-base-content/80">
							{concert.city}{#if concert.country}, {concert.country}{/if}
						</h4>

						{#if concert.program}
							<p
								class="mt-2 text-xs leading-relaxed font-normal tracking-[0.25em] uppercase opacity-60 group-hover:text-base-content/60"
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
								class="btn rounded-2xl border-none px-2 text-xs font-normal tracking-widest text-white/80 bg-transparent shadow-none transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none md:px-6 md:btn-sm"
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
		class="mx-auto mt-24 w-full max-w-4xl space-y-24 px-4 py-24 pb-16 md:space-y-24 md:pb-32"
	>
		<div class="group/bio1 flex flex-col items-stretch gap-10 md:flex-row lg:gap-16 mb-24">
			<div class="flex w-full flex-1 flex-col justify-center">
				<div class="mb-8 flex items-center gap-4 opacity-70">
					<h2 class="text-lg font-normal tracking-[0.5em] uppercase">Biography</h2>
				</div>
				<div
					class="relative space-y-6 lg:border-l border-white/10 lg:pl-8 text-justify font-sans text-sm leading-relaxed font-light tracking-wide text-base-content/80"
				>
					<p>
						Né en Ukraine, Bogdan Nesterenko est diplômé du Conservatoire Supérieur de Musique de
						Kharkov (Ukraine) en accordéon, direction d’orchestre, musique de chambre et lauréat de
						plusieurs Concours Internationaux d’Accordéon.
					</p>
					<p>
						Installé en France depuis 2006, Bogdan Nesterenko donne un grand nombre de récitals en
						Europe, en solo et musique de chambre. Il est invité à se produire dans des lieux (Opéra
						de Vichy, Villa Strauli en Suisse, Théâtre national de Beauvaisis, Abbatiale
						d’Ebersmunster, Opéra de Lille, Philharmonie de Luxembourg…) et festivals prestigieux
						(Lille Piano Festival, Festivals de musique baroque de Strasbourg et de Madiran,
						Festival International d’Orgue en Flandres, Septembre Musical de l&#39;Orne, Nuit
						blanche à Paris...) en Europe, en Ukraine et en Asie. On peut l&#39;entendre sur les
						ondes de France Musique, BBC Radio ou sur CultureBox.
					</p>
				</div>
			</div>

			<div class="relative min-h-[350px] w-full shrink-0 md:min-h-0 md:w-[320px]">
				<div class="absolute inset-0 flex items-center">
					<button
						onclick={prevSlide1}
						class="absolute left-2 z-30 p-1 text-white/20 transition-all duration-500 
							opacity-0 group-hover/bio1:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div class="relative isolate h-full w-full overflow-hidden rounded-lg border border-white/10">
						<div 
							class="flex h-full w-full transition-transform duration-700 ease-in-out" 
							style="transform: translateX(-{currentIndex1 * 100}%);"
						>
							{#each images1 as src}
								<div class="h-full w-full shrink-0 overflow-hidden">
									<img
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
						class="absolute right-2 z-30 p-1 text-white/20 transition-all duration-500 
							opacity-0 group-hover/bio1:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
									
				</div>
			</div>
		</div>

		<div class="group/bio2 flex flex-col items-stretch gap-10 md:flex-row-reverse lg:gap-16">
			<div class="flex w-full flex-1 flex-col justify-center">
				<div
					class="relative space-y-6 lg:border-r border-white/10 lg:pr-8 text-justify font-sans text-sm leading-relaxed font-light tracking-wide text-base-content/80"
				>
					<p>
						Bogdan Nesterenko se produit avec le violoniste Stefan Stalanowski (Super Soliste de
						l’Orchestre National de Lille), avec Quatuor GoYa et Quatuor Elysée, avec le pianiste
						Alain Raës et le violoniste Pablo Schatzman, avec la Camerata de Flandre et
						l&#39;Ensemble vocal Métamorphoses. Il forme le Trio SVITA avec Benjamin et Khrystyna
						Boursier (violons) et joue avec Jan Vermeire (orgue), avec Dorian Gheorghilas (flûte de
						pan) et la soprano Olga Vojnovic.
					</p>
					<p>
						En musique contemporaine il participe aux créations de M. Bourbon, de Ch. Hache, de N.
						Debard, J. Dassié, S. Fache et crée le &quot;Concerto de deux mondes&quot; pour
						accordéon et orchestre symphonique de Omar Yagoubi.
					</p>
					<p>
						Il joue également régulièrement avec la soprano Juliette de Massy. Leur
						enregistrementdes airs de Bach « Comme un air de passions...» (ed. AR-RE- SE) a reçu des
						critiques élogieuses. En duo avec Marc Hervieux (flûtes à bec) il enregistre l’album
						« Dialogue insolite » aux éditions RAINBOW CLASSIC. Le dernier album en solo du musicien
						« Un Sacre du printemps » est consacré à la musique ukrainienne et russe.
					</p>
					<p>
						Bogdan Nesterenko joue sur un accordéon « bayan » de marque «Jupiter», un instrument
						offrant, grâce à sa richesse de timbre et à ses multiples registres, des possibilités
						musicales très étendues.
					</p>
				</div>
			</div>

			<div class="relative min-h-[350px] w-full shrink-0 md:min-h-0 md:w-[320px]">
				<div class="absolute inset-0 flex items-center transition-transform ">
					<button
						onclick={prevSlide2}
						class="absolute left-2 z-30 p-1 text-white/20 transition-all duration-500 
							opacity-0 group-hover/bio2:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div class="relative isolate h-full w-full overflow-hidden rounded-lg border border-white/10">
						<div 
							class="flex h-full w-full transition-transform duration-700 ease-in-out" 
							style="transform: translateX(-{currentIndex2 * 100}%);"
						>
							{#each images2 as src}
								<div class="h-full w-full shrink-0 overflow-hidden">
									<img
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
						class="absolute right-2 z-30 p-1 text-white/20 transition-all duration-500 
							opacity-0 group-hover/bio2:opacity-100 hover:scale-110 hover:text-white focus:outline-none"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
				</div>
			</div>
		</div>
	</section>

	<section
		id="videos"
		class="group/section relative mx-auto w-full max-w-4xl overflow-hidden px-4 py-24"
	>

		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Performance Archive</h2>
		</div>

		<!-- <div class="mb-16 text-center">
			<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase text-white/30 italic font-serif">
				Video Archive
			</h2>
		</div> -->

		<!-- <div
			class="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-black via-black to-transparent md:w-56"
		></div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-black via-black to-transparent md:w-56"
		></div> -->

		<swiper-container init="false" class="pb-12">
			{#each videos as video}
				<swiper-slide>
					<div class="video-wrapper relative aspect-video w-full transition-all rounded-lg overflow-hidden duration-700 border border-white/10">
						{#if playingVideoId === video.videoId}
							<iframe
								class="h-full w-full"
								src="https://www.youtube.com/embed/{video.videoId}?autoplay=1"
								title={video.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
								allowfullscreen
							></iframe>
						{:else}
							<img
								src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg"
								alt={video.title}
								class="h-full w-full object-cover transition-all duration-300 brightness-60"
							/>

							<!-- <button
								onclick={() => playVideo(video.videoId)}
								class="group absolute inset-0 z-30 flex items-center justify-center border-none transition-all outline-none"
								type="button"
								aria-label="Play {video.title}"
							>
								<div
									class="rounded-full border border-white/0 bg-white/0 p-1 backdrop-blur-[2px] transition-all duration-700 group-hover:scale-105 group-hover:border-white/10 group-hover:bg-white/5 group-hover:backdrop-blur-md"
								>
									<svg
										class="mr-3 ml-3 h-6 w-6 fill-current text-white/20 transition-all duration-500 group-hover:text-white/80"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z"/>
									</svg>
								</div>
							</button> -->
							<button
								onclick={() => playVideo(video.videoId)}
								class="group absolute inset-0 z-30 flex items-center justify-center border-none bg-transparent transition-all outline-none"
								type="button"
								aria-label="Play {video.title}"
							>
								<div
									class="rounded-full bg-white/5 p-1 backdrop-blur-md transition-all duration-300 ease-out
										group-hover:scale-110 group-hover:bg-white/20"
								>
									<svg
										class="mr-3 ml-3 h-6 w-6 fill-current text-white transition-all duration-300 ease-in-out
											drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</button>
						{/if}
					</div>

					<p class="slide-title mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-base-content/40 transition-opacity duration-700">
						{video.title}
					</p>
				</swiper-slide>
			{/each}
		</swiper-container>

		<button
			class="nav-prev absolute top-[47.5%] left-0 z-50 hidden -translate-y-1/2 text-white/20 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 hover:text-white md:left-4 md:flex"
			aria-label="Previous slide"
		>
			<Icon icon="mdi:chevron-left" width="32" height="32" />
		</button>

		<button
			class="nav-next absolute top-[47.5%] right-0 z-50 hidden -translate-y-1/2 text-white/20 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 hover:text-white md:right-4 md:flex"
			aria-label="Next slide"
		>
			<Icon icon="mdi:chevron-right" width="32" height="32" />
		</button>
	</section>

	<style>
		swiper-container {
			width: 100%;
			max-width: 100vw;
			overflow: visible;
			/* Маска: прозрачный -> непрозрачный -> прозрачный */
			/* -webkit-mask-image: linear-gradient(
				to right,
				transparent 0%,
				black 15%,
				black 85%,
				transparent 100%
			);
			mask-image: linear-gradient(
				to right,
				transparent 0%,
				black 45%,
				black 55%,
				transparent 100%
			); */
		}

		#videos {
			width: 100%;
			overflow: hidden;
			/* Убедимся, что секция не имеет своего фона, который перекрывает общий */
			background: transparent; 
		}

		:global(.swiper-wrapper) {
			display: flex;
			width: 100%;
		}

		/*===============================*/
		.noise-overlay {
			position: fixed;
			inset: -200%; /* Увеличиваем размер, чтобы при анимации не было пустых краев */
			z-index: 1; /* Между видео (z-0) и оверлеем (z-1) */
			background-image: url('https://grainy-gradients.vercel.app/noise.svg');
			opacity: 0.5; /* Едва заметно, чтобы не раздражать */
			pointer-events: none;
			animation: noise-shift 0.2s infinite steps(2);
		}

		@keyframes noise-shift {
			0% { transform: translate(0, 0); }
			10% { transform: translate(-1%, -2%); }
			20% { transform: translate(-3%, 1%); }
			30% { transform: translate(2%, -3%); }
			40% { transform: translate(-2%, 4%); }
			50% { transform: translate(-4%, 2%); }
			60% { transform: translate(3%, 0); }
			70% { transform: translate(0, 3%); }
			80% { transform: translate(-2%, 0); }
			90% { transform: translate(2%, 1%); }
			100% { transform: translate(1%, 0); }
		}
		/*===============================*/

		/* Скрываем кнопку на всех слайдах по умолчанию */
		swiper-slide .video-wrapper button {
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.5s ease-in-out;
		}

		/* Показываем кнопку только на активном (центральном) слайде */
		swiper-slide.swiper-slide-active .video-wrapper button {
			opacity: 1;
			pointer-events: auto;
		}

		/* Сохраняем ваши hover-эффекты внутри активного слайда */
		swiper-slide.swiper-slide-active .video-wrapper button:hover {
			transform: scale(1.05);
		}
	</style>

	<section id="projects" class="mx-auto w-full max-w-4xl px-4 py-24">
		<div class="mb-12 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Projets</h2>
		</div>

		<div class="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
			{#each projects as project}
				<div class="group/proj relative aspect-[5/6] overflow-hidden rounded-xl border border-white/10 bg-base-200/30 transition-all">
					
					<img 
						src={project.img} 
						alt={project.title} 
						class="h-full w-full object-cover brightness-50 transition-all duration-700 ease-in-out group-hover/proj:scale-105 group-hover/proj:brightness-80"
					/>

					<div class="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
						<div class="translate-y-2 transition-transform duration-500 group-hover/proj:translate-y-0">
							<h3 class="text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 md:text-xs">
								{project.title}
							</h3>
							<div class="mt-2 h-[1px] w-0 bg-white/40 transition-all duration-500 group-hover/proj:w-full"></div>
						</div>
					</div>

					<a href="#contact" class="absolute inset-0 z-10" aria-label="Details about {project.title}"></a>
				</div>
			{/each}
		</div>
	</section>

	<section id="recordings" class="relative mx-auto max-w-4xl px-4 py-24">
		<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
			<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Discography</h2>
		</div>

		<div class="absolute top-40 bottom-24 left-1/2 hidden w-[0.5px] bg-white/10 md:block"></div>

		<div class="space-y-8 md:space-y-0">
			{#each albums as album, i}
				<div
					class="group relative flex flex-col items-center justify-between py-4 md:flex-row md:py-6"
				>
					<div
						class="absolute top-1/2 left-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full 
						bg-zinc-600 transition-all duration-500 
						group-hover:bg-zinc-400 md:block"
					></div>

					<div
						class="flex w-full justify-center md:w-[45%] {i % 2 === 0
							? 'md:justify-end'
							: 'order-1 md:order-2 md:justify-start'}"
					>
						<div class="relative h-32 w-32 sm:h-40 sm:w-40">
							<div
								class="absolute inset-0 overflow-hidden rounded-lg border border-white/10 text-center shadow-2xl transition-all duration-600 brightness-60 group-hover:brightness-80"
							>
								<img
									src={album.image}
									alt={album.title}
									class="h-full w-full object-cover transition-transform duration-600 group-hover:scale-105 text-base-content/60 group-hover:text-base-content/80 "
								/>
							</div>
							<div class="absolute inset-0 rounded-lg border border-white/10 pointer-events-none transition-colors"></div>
						</div>
					</div>

					<div
						class="mt-4 w-full text-center md:mt-0 md:w-[45%] {i % 2 === 0
							? 'order-2 md:order-2 md:text-left'
							: 'order-2 md:order-1 md:text-right'}"
					>
						<p class="mb-1 text-xs tracking-[0.25em] text-base-content/40 uppercase group-hover:text-base-content/60">
							{album.year} • {album.label}
						</p>

						<h3 class="mb-2 text-lg font-light tracking-tight text-base-content/60 md:text-xl group-hover:text-base-content/80">
							{album.title}
						</h3>

						<p
							class="text-xs leading-relaxed font-light text-base-content/40 transition-colors group-hover:text-base-content/60 md:text-sm"
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
		<!-- <div class="absolute inset-0 z-0 mx-auto w-full max-w-4xl">
			<img src="/poster.webp" alt="Background" class="h-full w-full object-cover opacity-40" />
			<div class="absolute inset-0 bg-linear-to-b from-black via-black/40 to-black"></div>
		</div> -->

		<div class="relative z-10 mx-auto w-full max-w-2xl px-4 md:px-8">
			<div class="mx-auto max-w-2xl">
				<div class="mb-12 text-center">
					<div class="mb-8 flex items-center justify-center gap-4 opacity-70">
						<h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">Contact</h2>
					</div>

					<div
						class="flex flex-col items-center justify-center gap-6 text-sm sm:flex-row sm:gap-12"
					>
						<a
							href="mailto:mail@example.com"
							class="pb-1 font-light tracking-widest text-base-content/80 transition-all duration-500 hover:text-primary"
						>
							bogdan.nesterenko@yahoo.fr
						</a>
						<a
							href="tel:+33000000000"
							class="pb-1 font-light tracking-widest text-base-content/80 transition-all duration-500 hover:text-primary"
						>
							+33 (6) 66 45 59 32
						</a>
					</div>
				</div>

				<form
					class="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 md:p-10"
				>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="form-control">
							<label class="label pt-0" for="name">
								<span class="label-text text-xs tracking-[0.15em] text-base-content/80 uppercase"
									>Votre Nom</span
								>
							</label>
							<input
								type="text"
								name="name"
								placeholder="Nom"
								required
								class="input w-full rounded-xl border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
							/>
						</div>

						<div class="form-control">
							<label class="label pt-0" for="email">
								<span class="label-text text-xs tracking-[0.15em] text-base-content/80 uppercase"
									>Votre adresse mail</span
								>
							</label>
							<input
								type="email"
								placeholder="email@example.com"
								name="email"
								required
								class="input w-full rounded-xl border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
							/>
						</div>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="subject">
							<span class="label-text text-xs tracking-[0.15em] text-base-content/80 uppercase">Objet</span
							>
						</label>
						<input
							type="text"
							name="subject"
							placeholder="Sujet"
							required
							class="input w-full rounded-xl border-none input-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
						/>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="message">
							<span class="label-text text-xs tracking-[0.15em] text-base-content/80 uppercase"
								>Message</span
							>
						</label>
						<textarea
							name="message"
							placeholder="Message..."
							required
							class="textarea min-h-[120px] w-full resize-none rounded-xl border-none textarea-ghost bg-white/5 text-xs text-base-content/80 transition-all duration-300 placeholder:text-base-content/20 focus:bg-white/10 focus:outline-none"
						></textarea>
					</div>

					<div class="flex justify-center pt-4">
						<button
							type="submit"
							class="rounded-3xl bg-white/10 px-6 py-3 text-sm tracking-wider text-base-content/80 uppercase transition-all duration-300 hover:bg-white/20 hover:text-primary focus:outline-none"
						>
							{m.nav_contact()}
						</button>
					</div>
				</form>
			</div>
		</div>
	</section>
</main>
