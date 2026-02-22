<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from '../$types';
	import { m } from '$lib/paraglide/messages.js';
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

	let videos1 = [
		{ id: 'video4', title: 'Concert 4', videoId: 'JKCSseSa4CY' },
		{ id: 'video5', title: 'Concert 5', videoId: 'NynXtGhj-dU' },
		{ id: 'video6', title: 'Concert 6', videoId: 'cQ8ZzzPloXc' },
		{ id: 'video1', title: 'Concert 1', videoId: 'HgQPZRY2aic' },
		{ id: 'video2', title: 'Concert 2', videoId: '3OjadYgRVUg' },
		{ id: 'video3', title: 'Concert 3', videoId: 'uuC-SMsnMWw' }
	];

	let videos = [...videos1, ...videos1, ...videos1];

	// Налаштування слайдера
	let playingVideoId = $state<string | null>(null); // Зберігаємо ID відео, яке зараз відтворюється

	const swiperParams: SwiperOptions & { [key: string]: any } = {
		slidesPerView: 1.8,
		centeredSlides: true,
		spaceBetween: 20,
		loop: true,
		// Додаємо ці параметри для плавності:
		loopAdditionalSlides: 6,
		watchSlidesProgress: true,
		preloadImages: true,

		navigation: {
			prevEl: '.nav-prev',
			nextEl: '.nav-next'
		},
		// mousewheel: {
		// 	forceToAxis: true,
		// },
		// БЛОКУЄМО РУХ МИШКОЮ ТА ПАЛЬЦЕМ
		allowTouchMove: false, // Вимикає перетягування на мобільних та десктопі
		simulateTouch: false, // Вимикає емуляцію натискання мишкою

		keyboard: {
			enabled: true
		},

		// Коліщатко миші краще теж вимкнути, щоб працювали тільки стрілки
		mousewheel: false,
		breakpoints: {
			768: { slidesPerView: 2.5 },
			1024: { slidesPerView: 2.5 }
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

	let currentIndex1 = $state(0);
	let currentIndex2 = $state(0);

	const images1 = ['/1121.jpg', '/1123.jpg']; // Фото для первого блока
	const images2 = ['/1109.jpg', '/1111.jpg']; // Фото для второго блока

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
			label: 'Musica Prima',
			artists: 'Bogdan Nesterenko (accordéon bayan)',
			description:
				"Recorded in his hometown of Kharkiv, Ukraine. This album features an excerpt from 'The Rite of Spring' alongside transcriptions of major 19th-century Russian works by Mussorgsky, Tchaikovsky, and contemporary original pieces for accordion by Ukrainian composers like Runchak and Kukuzenko.",
			image: '/pochette.jpg' // вкажіть ваш шлях до фото
		},
		{
			title: 'Dialogues insolites',
			year: '2017',
			label: 'Rainbow Classics',
			artists: 'Marc Hervieux (recorder) & Bogdan Nesterenko (accordion)',
			description:
				'A unique program of 18th-century German sonatas. A recorder and an accordion meet for the first time in history to explore both famous and rare baroque repertoires. Recorded in October 2016 at the Église du Bouclier in Strasbourg.',
			image: '/Dialogue-insolite.jpg'
		},
		{
			title: 'Comme un air de passions...',
			year: '2013',
			label: 'AR-RE-SE',
			artists: 'Juliette de Massy (soprano) & Bogdan Nesterenko (accordion)',
			description:
				'Transcriptions of J.S. Bach for soprano and concert accordion. Features duets from Passions and Cantatas, as well as solo performances of Toccata and Fugue in D minor (BWV 565) and Prelude and Fugue in A minor (BWV 543).',
			image: '/Comme-un-air-de-passions   3.jpg'
		},
		{
			title: 'Accordéon Baroque',
			year: '2006',
			label: 'Editions HIRIN',
			artists: 'Bogdan Nesterenko (accordion)',
			description:
				'Recorded and released in Ukraine, this second solo album contains baroque transcriptions (Bach, Vivaldi, Albinoni, Buxtehude) and original late 20th-century works for bayan by Ukrainian composers Gaidenko, Belochitsky, and Zubitsky.',
			image: '/1 str.jpg'
		}
	];
</script>

<svelte:window bind:scrollY />

<div class="relative h-screen w-full overflow-hidden bg-black">
	<video
		src="/video.webm"
		poster="/poster.webp"
		autoplay
		loop
		muted
		playsinline
		bind:this={videoElement}
		class="absolute inset-0 h-full w-full object-cover brightness-50"
		style="transform: translateY({scrollY * 0.4}px); opacity: {1 - scrollY * 0.001};"
		aria-hidden="true"
	>
		<track kind="captions" />
	</video>

	<div class="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black to-transparent"></div>

	<!-- <div href="#concerts" class="absolute inset-x-0 bottom-5 z-20 flex animate-bounce justify-center text-white/50">
		<Icon icon="mdi:chevron-down" width="36" height="36" />
	</div> -->
	<a
		href="#concerts"
		class="absolute inset-x-0 bottom-5 z-20 flex animate-bounce justify-center text-white/50 transition-colors hover:text-white"
		aria-label="Scroll to concerts"
	>
		<Icon icon="mdi:chevron-down" width="36" height="36" />
	</a>

	<div
		class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white"
	>
		<h1 class="text-5xl font-bold tracking-tight md:text-7xl">BOGDAN NESTERENKO</h1>
		<p class="mt-4 max-w-xl text-lg md:text-xl">
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
<main class="mx-auto w-full bg-black px-4 md:px-8 md:py-24">
	<section id="concerts" class="mx-auto w-full max-w-4xl px-4 py-24 font-sans">
		<!-- <div class="mb-4 flex items-center justify-center gap-8 opacity-40">
			<h2 class="text-[11px] font-normal tracking-[0.2em] uppercase">
				Upcoming Concerts
			</h2>
		</div> -->
		<div class="mb-24 flex items-center justify-center gap-4 opacity-30">
			<h2 class="text-center text-[10px] font-normal tracking-[0.5em] uppercase">Concerts</h2>
		</div>

		<div class="space-y-4">
			{#each data.concerts as concert}
				<div
					class="flex min-h-[120px] w-full items-center justify-between gap-3 rounded-lg bg-base-200 p-4 transition-all hover:bg-base-200/50 md:gap-6 md:p-6"
				>
					<div
						class=" flex min-w-[50px] flex-col items-center justify-center border-r border-base-content/10 pr-2 md:pr-8"
					>
						<span class="text-3xl leading-none font-medium tracking-tighter text-base-content/80">
							{concert.date.split('-')[2]}
						</span>
						<span class="mt-1 text-[11px] font-medium tracking-wider uppercase opacity-40">
							{new Date(concert.date).toLocaleString('default', { month: 'short' })}
						</span>
						{#if concert.time}
							<span class="mt-1 font-sans text-[10px] tracking-wide opacity-25">
								{concert.time}
							</span>
						{/if}
					</div>

					<div class="flex flex-1 grow flex-col justify-center">
						<h4 class="text-lg leading-tight font-normal tracking-wide opacity-80">
							{concert.city}{#if concert.country}, {concert.country}{/if}
						</h4>

						{#if concert.program}
							<p
								class="mt-2 text-[10px] leading-relaxed font-normal tracking-[0.2em] uppercase opacity-30"
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
								class="btn rounded-2xl border-none px-2 text-[11px] font-normal tracking-widest text-base-content/60 shadow-none btn-ghost transition-colors btn-xs hover:text-primary hover:opacity-100 focus:outline-none md:px-6 md:btn-sm"
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
		id="videos"
		class="group/section relative mx-auto w-full max-w-4xl overflow-hidden bg-black py-24"
	>
		<!-- <div class="mb-16 text-center">
			<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase text-white/30 italic font-serif">
				Video Archive
			</h2>
		</div> -->

		<div
			class="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-black via-black to-transparent md:w-56"
		></div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-black via-black to-transparent md:w-56"
		></div>

		<swiper-container init="false" class="pb-12">
			{#each videos as video}
				<swiper-slide>
					<div class="video-wrapper relative aspect-video w-full transition-all duration-700">
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
								class="h-full w-full rounded-lg object-cover transition-all duration-300"
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
									class="rounded-full bg-transparent p-1 transition-all duration-300 ease-out
											group-hover:scale-110 group-hover:bg-white/10 group-hover:backdrop-blur-md"
								>
									<svg
										class="mr-3 ml-3 h-6 w-6 fill-current text-white opacity-10 transition-all duration-300 ease-in-out
											group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</button>
						{/if}
					</div>

					<!-- <p class="slide-title mt-4 text-center text-[9px] uppercase tracking-[0.3em] text-white/20 font-light italic transition-opacity duration-700">
						{video.title}
					</p> -->
				</swiper-slide>
			{/each}
		</swiper-container>

		<button
			class="nav-prev absolute top-[40%] left-4 z-30 hidden text-white/50 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:text-white md:left-10 md:flex"
			aria-label="Previous slide"
		>
			<Icon icon="mdi:chevron-left" width="36" height="36" />
		</button>

		<button
			class="nav-next absolute top-[40%] right-4 z-30 hidden text-white/50 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:text-white md:right-10 md:flex"
			aria-label="Next slide"
		>
			<Icon icon="mdi:chevron-right" width="36" height="36" />
		</button>
	</section>

	<style>
		/* Гарантуємо, що контейнер не обрізає вміст раніше часу */
		swiper-container {
			width: 100%;
			max-width: 100vw;
			overflow: visible; /* Дозволяє слайдам бути видимими під час руху */
		}

		/* Але сама секція має тримати все в межах екрана */
		#videos {
			width: 100%;
			overflow: hidden;
		}

		/* Виправлення для Flexbox, щоб слайди не стискалися */
		:global(.swiper-wrapper) {
			display: flex;
			width: 100%;
		}
	</style>

	<section
		id="bio"
		class="mx-auto mt-24 w-full max-w-4xl space-y-24 px-4 py-24 pb-16 md:space-y-40 md:pb-32"
	>
		<div class="group/bio1 flex flex-col items-stretch gap-10 md:flex-row md:gap-16">
			<div class="flex w-full flex-1 flex-col justify-center py-4">
				<div class="mb-10 flex items-center gap-4 opacity-30">
					<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase">Biography</h2>
				</div>
				<div
					class="relative space-y-6 border-l border-white/10 pl-8 text-justify font-sans text-[13px] leading-relaxed font-light tracking-wide text-white/60"
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
				<div class="md:absolute md:inset-0">
					<button
						onclick={prevSlide1}
						class="absolute top-1/2 -left-3 z-30 -translate-y-1/2 p-1 text-white/20 transition-all hover:scale-110 hover:text-white"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div class="relative isolate h-full w-full overflow-hidden rounded-lg">
						<div
							class="flex h-full transition-transform duration-700 ease-in-out"
							style="transform: translateX(-{currentIndex1 * 100}%)"
						>
							{#each images1 as src}
								<img
									{src}
									alt="Bogdan"
									class="h-full w-full shrink-0 object-cover opacity-70 transition-opacity duration-700 group-hover/bio1:opacity-100"
								/>
							{/each}
						</div>
					</div>

					<button
						onclick={nextSlide1}
						class="absolute top-1/2 -right-3 z-30 -translate-y-1/2 p-1 text-white/20 transition-all hover:scale-110 hover:text-white"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
				</div>
			</div>
		</div>

		<div class="group/bio2 flex flex-col items-stretch gap-10 md:flex-row-reverse md:gap-16">
			<div class="flex w-full flex-1 flex-col justify-center py-4">
				<div
					class="relative space-y-6 border-r border-white/10 pr-8 text-justify font-sans text-[13px] leading-relaxed font-light tracking-wide text-white/60 md:text-right"
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
				<div class="md:absolute md:inset-0">
					<button
						onclick={prevSlide2}
						class="absolute top-1/2 -left-3 z-30 -translate-y-1/2 p-1 text-white/20 transition-all hover:scale-110 hover:text-white"
					>
						<Icon icon="mdi:chevron-left" width="32" height="32" />
					</button>

					<div class="relative isolate h-full w-full overflow-hidden rounded-lg">
						<div
							class="flex h-full transition-transform duration-700 ease-in-out"
							style="transform: translateX(-{currentIndex2 * 100}%)"
						>
							{#each images2 as src}
								<img
									{src}
									alt="Bogdan"
									class="h-full w-full shrink-0 object-cover opacity-70 transition-opacity duration-700 group-hover/bio2:opacity-100"
								/>
							{/each}
						</div>
					</div>

					<button
						onclick={nextSlide2}
						class="absolute top-1/2 -right-3 z-30 -translate-y-1/2 p-1 text-white/20 transition-all hover:scale-110 hover:text-white"
					>
						<Icon icon="mdi:chevron-right" width="32" height="32" />
					</button>
				</div>
			</div>
		</div>
	</section>

	<section id="recordings" class="relative mx-auto max-w-4xl px-4 py-16">
		<div class="mb-4 flex items-center justify-center gap-4 opacity-30">
			<h2 class="text-center text-[10px] font-normal tracking-[0.5em] uppercase">Discography</h2>
		</div>

		<div class="absolute top-0 bottom-0 left-1/2 hidden w-[0.5px] bg-white/5 md:block"></div>

		<div class="space-y-8 md:space-y-0">
			{#each albums as album, i}
				<div
					class="group relative flex flex-col items-center justify-between py-4 md:flex-row md:py-6"
				>
					<div
						class="absolute top-1/2 left-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black bg-white/10 transition-colors duration-500 group-hover:bg-white/40 md:block"
					></div>

					<div
						class="flex w-full md:w-[45%] {i % 2 === 0
							? 'md:justify-end'
							: 'order-1 md:order-2 md:justify-start'}"
					>
						<div class="relative h-32 w-32 sm:h-40 sm:w-40">
							<div
								class="absolute inset-0 overflow-hidden rounded-lg border border-white/5 text-center shadow-2xl transition-all duration-700"
							>
								<img
									src={album.image}
									alt={album.title}
									class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
								/>
							</div>
						</div>
					</div>

					<div
						class="mt-4 w-full text-center md:mt-0 md:w-[45%] {i % 2 === 0
							? 'order-2 md:order-2 md:text-left'
							: 'order-2 md:order-1 md:text-right'}"
					>
						<p class="mb-1 text-[9px] tracking-[0.3em] text-white/20 uppercase">
							{album.year} • {album.label}
						</p>

						<h3 class="mb-2 text-lg font-light tracking-tight text-white/90 md:text-xl">
							{album.title}
						</h3>

						<p
							class="text-[11px] leading-relaxed font-light text-white/30 transition-colors group-hover:text-white/50 md:text-xs"
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
		<div class="absolute inset-0 z-0 mx-auto w-full max-w-4xl">
			<img src="/poster.webp" alt="Background" class="h-full w-full object-cover opacity-40" />
			<div class="absolute inset-0 bg-linear-to-b from-black via-black/40 to-black"></div>
		</div>

		<div class="relative z-10 mx-auto w-full max-w-2xl px-4 md:px-8">
			<div class="mx-auto max-w-2xl">
				<div class="mb-12 text-center">
					<h2 class="mb-8 text-[10px] font-normal tracking-[0.5em] text-white/30 uppercase">
						{m.nav_contact()}
					</h2>

					<div
						class="flex flex-col items-center justify-center gap-6 text-sm sm:flex-row sm:gap-12"
					>
						<a
							href="mailto:mail@example.com"
							class="border-b border-white/5 pb-1 font-light tracking-widest text-white/60 transition-all duration-500 hover:border-white/40 hover:text-white"
						>
							mail@example.com
						</a>
						<a
							href="tel:+33000000000"
							class="border-b border-white/5 pb-1 font-light tracking-widest text-white/60 transition-all duration-500 hover:border-white/40 hover:text-white"
						>
							+33 (0) 0 00 00 00 00
						</a>
					</div>
				</div>

				<form
					class="space-y-6 rounded-3xl border border-white/5 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 md:p-10"
				>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="form-control">
							<label class="label pt-0" for="name">
								<span class="label-text text-[9px] tracking-[0.2em] text-white/20 uppercase"
									>Votre Nom</span
								>
							</label>
							<input
								type="text"
								name="name"
								placeholder="Nom"
								required
								class="input w-full rounded-xl border-none input-ghost bg-white/3 text-xs text-white transition-all duration-300 placeholder:text-white/5 focus:bg-white/[0.07] focus:outline-none"
							/>
						</div>

						<div class="form-control">
							<label class="label pt-0" for="email">
								<span class="label-text text-[9px] tracking-[0.2em] text-white/20 uppercase"
									>Votre adresse mail</span
								>
							</label>
							<input
								type="email"
								placeholder="email@example.com"
								name="email"
								required
								class="input w-full rounded-xl border-none input-ghost bg-white/3 text-xs text-white transition-all duration-300 placeholder:text-white/5 focus:bg-white/[0.07] focus:outline-none"
							/>
						</div>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="subject">
							<span class="label-text text-[9px] tracking-[0.2em] text-white/20 uppercase"
								>Objet</span
							>
						</label>
						<input
							type="text"
							name="subject"
							placeholder="Sujet"
							required
							class="input w-full rounded-xl border-none input-ghost bg-white/3 text-xs text-white transition-all duration-300 placeholder:text-white/5 focus:bg-white/[0.07] focus:outline-none"
						/>
					</div>

					<div class="form-control">
						<label class="label pt-0" for="message">
							<span class="label-text text-[9px] tracking-[0.2em] text-white/20 uppercase"
								>Message</span
							>
						</label>
						<textarea
							name="message"
							placeholder="Message..."
							required
							class="textarea min-h-[120px] w-full resize-none rounded-xl border-none textarea-ghost bg-white/3 text-xs text-white transition-all duration-300 placeholder:text-white/5 focus:bg-white/[0.07] focus:outline-none"
						></textarea>
					</div>

					<div class="flex justify-center pt-4">
						<button
							type="submit"
							class="rounded-3xl px-4 py-2 text-sm tracking-wider text-base-content/80 uppercase transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none"
						>
							{m.nav_contact()}
						</button>
					</div>
				</form>
			</div>
		</div>
	</section>
</main>
