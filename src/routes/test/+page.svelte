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
		{ id: 'video1', title: 'Concert 1', videoId: 'HgQPZRY2aic' },
		{ id: 'video2', title: 'Concert 2', videoId: '3OjadYgRVUg' },
		{ id: 'video3', title: 'Concert 3', videoId: 'uuC-SMsnMWw' },
		{ id: 'video4', title: 'Concert 4', videoId: 'JKCSseSa4CY' },
		{ id: 'video5', title: 'Concert 5', videoId: 'NynXtGhj-dU' },
		{ id: 'video6', title: 'Concert 6', videoId: 'cQ8ZzzPloXc' }
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
			768: { slidesPerView: 3.2 },
			1024: { slidesPerView: 4.5 }
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

	const images = ['/1109.jpg', '/1121.jpg', '/1111.jpg'];

	let currentIndex = $state(0);

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % images.length;
	};

	const prevSlide = () => {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	};
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
	<section id="concerts" class="mx-auto w-full max-w-5xl px-4 py-24 font-sans">
		<!-- <div class="mb-4 flex items-center justify-center gap-8 opacity-40">
			<h2 class="text-[11px] font-normal tracking-[0.2em] uppercase">
				Upcoming Concerts
			</h2>
		</div> -->

		<div class="space-y-4">
			{#each data.concerts as concert}
				<div
					class="flex min-h-[120px] w-full items-stretch justify-between gap-3 rounded-3xl bg-base-200/30 p-4 transition-all hover:bg-base-200/50 md:gap-6 md:p-6"
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
						<a
							href={concert.link}
							target="_blank"
							rel="noopener noreferrer"
							class="btn rounded-2xl border-none px-2 text-[11px] font-normal tracking-widest text-base-content/60 shadow-none btn-ghost transition-colors btn-xs hover:text-primary hover:opacity-100 focus:outline-none md:px-6 md:btn-sm"
						>
							INFO
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>
	<section id="videos" class="group/section relative overflow-hidden bg-black py-24">
		<!-- <div class="mb-16 text-center">
			<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase text-white/30 italic font-serif">
				Video Archive
			</h2>
		</div> -->

		<div
			class="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-black via-black/90 to-transparent md:w-80"
		></div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-black via-black/90 to-transparent md:w-80"
		></div>

		<swiper-container init="false" class="pb-12">
			{#each videos as video}
				<swiper-slide>
					<div
						class="video-wrapper relative aspect-video w-full bg-zinc-900 transition-all duration-700"
					>
						{#if playingVideoId === video.videoId}
							<iframe
								class="h-full w-full"
								src="https://www.youtube.com/embed/{video.videoId}?autoplay=1"
								title={video.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						{:else}
							<img
								src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg"
								alt={video.title}
								class="h-full w-full object-cover grayscale transition-all duration-700"
							/>

							<button
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
			class="nav-prev absolute top-[35%] left-4 z-30 hidden text-white/50 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:text-white md:left-10 md:flex"
			aria-label="Previous slide"
		>
			<Icon icon="mdi:chevron-left" width="36" height="36" />
		</button>

		<button
			class="nav-next absolute top-[35%] right-4 z-30 hidden text-white/50 opacity-0 transition-all duration-300 group-hover/section:opacity-100 hover:text-white md:right-10 md:flex"
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

	<section id="bio" class="group/bio mx-auto mt-24 w-full max-w-5xl px-4 pb-16 md:px-8 md:pb-32">
		<div class="flex flex-col items-center gap-10 md:flex-row md:items-stretch">
			<div class="flex w-full flex-1 flex-col justify-center py-4">
				<div class="mb-10 flex items-center gap-4 opacity-30">
					<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase">Biography</h2>
				</div>

				<div
					class="space-y-6 text-justify font-sans text-[13px] leading-relaxed font-light tracking-wide text-white/60"
				>
					<p class="pl-6">
						Bogdan Nesterenko est un accordéoniste de renom international, dont la maîtrise
						exceptionnelle allie une perfection technique absolue à une profonde expressivité
						émotionnelle. Son talent unique lui permet de transcender les frontières musicales,
						offrant à son public une expérience sonore immersive qui captive les sens et l'âme. Son
						répertoire vaste et éclectique embrasse une large palette de styles, allant des
						chefs-d'œuvre de la musique classique et baroque aux créations contemporaines les plus
						audacieuses.
					</p>
					<p class=" pl-6">
						Né en Ukraine et résidant actuellement en France, Bogdan s'est imposé comme une figure
						incontournable de la scène musicale européenne. Il collabore activement avec des
						orchestres de chambre et symphoniques renommés, tout en étant l'invité régulier de
						prestigieux festivals. Sa quête constante d'innovation artistique et son dévouement à
						l'instrument font de chaque concert un moment d'exception, célébrant la richesse
						culturelle et la modernité de l'accordéon de concert.
					</p>
				</div>
			</div>

			<div class="relative flex w-full shrink-0 items-center justify-center md:w-[280px]">
				<button
					onclick={prevSlide}
					class="absolute -left-1 z-30 p-1 text-white/20 transition-all hover:scale-110 hover:text-white focus:outline-none md:-left-3"
					aria-label="Previous image"
				>
					<Icon icon="mdi:chevron-left" width="32" height="32" />
				</button>

				<div
					class="relative isolate aspect-3/4 w-full max-w-[220px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-700 group-hover/bio:border-white/10"
				>
					<div
						class="cubic-bezier(0.4, 0, 0.2, 1) flex h-full transition-transform duration-1000"
						style="transform: translateX(-{currentIndex * 100}%)"
					>
						{#each images as src}
							<img
								{src}
								alt="Bogdan Nesterenko"
								class="h-full w-full shrink-0 object-cover opacity-70 grayscale transition-all duration-1000 group-hover/bio:opacity-100"
							/>
						{/each}
					</div>
				</div>

				<button
					onclick={nextSlide}
					class="absolute -right-1 z-30 p-1 text-white/20 transition-all hover:scale-110 hover:text-white focus:outline-none md:-right-3"
					aria-label="Next image"
				>
					<Icon icon="mdi:chevron-right" width="32" height="32" />
				</button>
			</div>
		</div>
	</section>
</main>
