<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import Icon from '@iconify/svelte';
	import type { PageProps } from '../$types';
	import { getConcerts } from '$lib/utils';
	import { m } from '$lib/paraglide/messages.js';
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import type { SwiperContainer } from 'swiper/element';
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
    let playingVideoId = $state<string | null>(null);// Зберігаємо ID відео, яке зараз відтворюється

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
			nextEl: '.nav-next',
		},
		// mousewheel: {
		// 	forceToAxis: true,
		// },
		// БЛОКУЄМО РУХ МИШКОЮ ТА ПАЛЬЦЕМ
		allowTouchMove: false,    // Вимикає перетягування на мобільних та десктопі
		simulateTouch: false,     // Вимикає емуляцію натискання мишкою

		keyboard: {
			enabled: true,
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
		src="/video.mp4"
		poster="/poster.png"
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
<main class="mx-auto w-full bg-black px-4 md:px-8  md:py-24">
	<section id="concerts" class="mx-auto w-full max-w-5xl py-24 px-4 font-sans">

		<!-- <div class="mb-4 flex items-center justify-center gap-8 opacity-40">
			<h2 class="text-[11px] font-normal tracking-[0.2em] uppercase">
				Upcoming Concerts
			</h2>
		</div> -->


		<div class="space-y-4">
			{#each data.concerts as concert}
				<div class="w-full flex items-center justify-between gap-3 md:gap-6 rounded-[1.5rem] bg-base-200/30 p-4 md:p-6 transition-all hover:bg-base-200/50 items-stretch min-h-[120px]">
					  
					<div class=" flex flex-col items-center justify-center border-r border-base-content/10 pr-2 md:pr-8 min-w-[50px]">
						<span class="text-3xl font-medium tracking-tighter leading-none text-base-content/80">
							{concert.date.split('-')[2]}
						</span>
						<span class="text-[11px] uppercase opacity-40 font-medium tracking-wider mt-1">
							{new Date(concert.date).toLocaleString('default', { month: 'short' })}
						</span> 
						{#if concert.time}
							<span class="text-[10px] opacity-25 mt-1 font-sans tracking-wide">
								{concert.time}   
							</span>
						{/if}
					</div>

					<div class="flex-1 flex flex-col flex-grow justify-center">
						<h4 class="text-lg font-normal opacity-80 leading-tight tracking-wide">
							{concert.city}{#if concert.country}, {concert.country}{/if}
						</h4>
						
						{#if concert.program}
							<p class="text-[10px] uppercase tracking-[0.2em] opacity-30 mt-2 font-normal leading-relaxed">
								{concert.program}
							</p> 
						{/if}
					</div> 
					  
					<div class="w-auto flex justify-end items-center">
						<a 
							href={concert.link} 
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-ghost btn-xs md:btn-sm rounded-2xl tracking-widest text-[11px] text-base-content/60 transition-colors hover:text-primary hover:opacity-100 font-normal px-2 md:px-6 focus:outline-none border-none shadow-none"
						>
							INFO
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>
	<section id="videos" class="relative py-24 bg-black overflow-hidden group/section">
		<!-- <div class="mb-16 text-center">
			<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase text-white/30 italic font-serif">
				Video Archive
			</h2>
		</div> -->

		<div class="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none"></div>
		<div class="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none"></div>

		<swiper-container init="false" class="pb-12">
			{#each videos as video}
				<swiper-slide>
					<div class="video-wrapper relative aspect-video w-full bg-zinc-900 transition-all duration-700">
						
						{#if playingVideoId === video.videoId}
							<iframe
								class="w-full h-full"
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
								class="w-full h-full object-cover grayscale transition-all duration-700"
							/>
							
							<button 
								onclick={() => playVideo(video.videoId)}
								class="absolute inset-0 flex items-center justify-center transition-all group z-30 border-none outline-none"
								type="button"
								aria-label="Play {video.title}"
							>
								<div class="p-1 rounded-full backdrop-blur-[2px] bg-white/0 border border-white/0 transition-all duration-700 group-hover:bg-white/5 group-hover:backdrop-blur-md group-hover:border-white/10 group-hover:scale-105">
									
									<svg 
										class="w-6 h-6 text-white/20 fill-current ml-3 mr-3 transition-all duration-500 group-hover:text-white/80" 
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z"/>
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
			class="nav-prev absolute left-4 md:left-10 top-[35%] z-30 opacity-0 group-hover/section:opacity-100 transition-all duration-300 hidden md:flex text-white/50 hover:text-white" 
			aria-label="Previous slide"
		>
			<Icon icon="mdi:chevron-left" width="36" height="36" />
		</button>

		<button 
			class="nav-next absolute right-4 md:right-10 top-[35%] z-30 opacity-0 group-hover/section:opacity-100 transition-all duration-300 hidden md:flex text-white/50 hover:text-white" 
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

	<section id="bio" class="mx-auto mt-24 w-full max-w-5xl px-4 md:px-8 pb-16 md:pb-32 group/bio">
		<div class="flex flex-col items-center gap-10 md:flex-row md:items-stretch">
			
			<div class="w-full flex-1 flex flex-col justify-center py-4">
				
				<div class="mb-10 flex items-center gap-4 opacity-30">
					<h2 class="text-[10px] font-normal tracking-[0.5em] uppercase">
						Biography
					</h2>
				</div>

				<div class="space-y-6 font-sans text-[13px] leading-relaxed text-white/60 font-light tracking-wide text-justify">
					<p class="pl-6">
						Bogdan Nesterenko est un accordéoniste de renom international, dont la maîtrise exceptionnelle allie une perfection technique absolue à une profonde expressivité émotionnelle. Son talent unique lui permet de transcender les frontières musicales, offrant à son public une expérience sonore immersive qui captive les sens et l'âme. Son répertoire vaste et éclectique embrasse une large palette de styles, allant des chefs-d'œuvre de la musique classique et baroque aux créations contemporaines les plus audacieuses.
					</p>
					<p class=" pl-6">
						Né en Ukraine et résidant actuellement en France, Bogdan s'est imposé comme une figure incontournable de la scène musicale européenne. Il collabore activement avec des orchestres de chambre et symphoniques renommés, tout en étant l'invité régulier de prestigieux festivals. Sa quête constante d'innovation artistique et son dévouement à l'instrument font de chaque concert un moment d'exception, célébrant la richesse culturelle et la modernité de l'accordéon de concert.
					</p>
				</div>

			</div>

			<div class="relative flex w-full items-center justify-center md:w-[280px] shrink-0">
				
				<button
					onclick={prevSlide}
					class="absolute -left-1 md:-left-3 z-30 p-1 text-white/20 transition-all hover:text-white hover:scale-110 focus:outline-none"
					aria-label="Previous image"
				>
					<Icon icon="mdi:chevron-left" width="32" height="32" />
				</button>

				<div class="relative isolate aspect-[3/4] w-full max-w-[220px] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-700 group-hover/bio:border-white/10">
					<div
						class="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
						style="transform: translateX(-{currentIndex * 100}%)"
					>
						{#each images as src}
							<img
								{src}
								alt="Bogdan Nesterenko"
								class="h-full w-full shrink-0 object-cover grayscale opacity-70 transition-all duration-1000 group-hover/bio:opacity-100"
							/>
						{/each}
					</div>
				</div>

				<button
					onclick={nextSlide}
					class="absolute -right-1 md:-right-3 z-30 p-1 text-white/20 transition-all hover:text-white hover:scale-110 focus:outline-none"
					aria-label="Next image"
				>
					<Icon icon="mdi:chevron-right" width="32" height="32" />
				</button>
			</div>

		</div>
	</section>
</main>
