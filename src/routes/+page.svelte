<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';

	//music
	let isMuted = $state(true);
	// let videoId = "Kh28YpalnPk";
	let videoId = 'NpzMhFwWcqQ';

	//to change video volume
	function toggleMute() {
		isMuted = !isMuted;

		const iframe = document.getElementById('bg-video') as HTMLIFrameElement;
		const command = isMuted ? 'mute' : 'unMute';

		iframe.contentWindow?.postMessage(
			JSON.stringify({
				event: 'command',
				func: command
			}),
			'*'
		);

		iframe.contentWindow?.postMessage(
			JSON.stringify({
				event: 'command',
				func: 'setVolume',
				args: [20] //0-100 - volume
			}),
			'*'
		);
	}

	let { data }: PageProps = $props();
	// const concerts = data.concerts;

	let videos = [
		{ id: 'video1', title: 'Concert 1', videoId: 'HgQPZRY2aic' },
		{ id: 'video2', title: 'Concert 2', videoId: '3OjadYgRVUg' },
		{ id: 'video3', title: 'Concert 3', videoId: 'uuC-SMsnMWw' },
		{ id: 'video4', title: 'Concert 4', videoId: 'JKCSseSa4CY' },
		{ id: 'video5', title: 'Concert 5', videoId: 'NynXtGhj-dU' },
		{ id: 'video6', title: 'Concert 6', videoId: 'cQ8ZzzPloXc' }
	];

	let activeVideo = $state<string | null>(null);

	// Масив з вашими фото, які ви поклали в static/images/bio/
	const images = ['/1109.jpg', '/1121.jpg', '/1111.jpg'];

	let currentIndex = $state(0);

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % images.length;
	};

	const prevSlide = () => {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	};
</script>

<div class="mx-auto w-full max-w-6xl px-4 md:px-8">
	<div class="relative h-[60vh] w-full overflow-hidden md:h-[90vh]">
		<div class="pointer-events-none absolute inset-0">
			<iframe
				id="bg-video"
				class="absolute top-1/2 left-1/2 h-[56.25vw] min-h-[100%] w-[100vw] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
				src="https://www.youtube.com/embed/{videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist={videoId}&rel=0&enablejsapi=1&start=30"
				title="Background Video"
				allow="autoplay"
				frameborder="0"
			></iframe>
		</div>

		<div
			class="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-24 justify-center gap-3 md:flex"
		>
			<div class="h-full w-[1.5px] bg-base-100"></div>
			<div class="h-full w-[1.5px] bg-base-100"></div>
			<div class="h-full w-[1.5px] bg-base-100"></div>
		</div>

		<div class="absolute inset-0 bg-black/50"></div>

		<div
			class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
		>
			<h1 class="mb-4 text-5xl tracking-wider uppercase md:text-7xl">Bogdan Nesterenko</h1>
			<p class="max-w-2xl text-xl md:text-2xl">
				{m.label_bayan()}
			</p>
		</div>
		<button
			onclick={toggleMute}
			class="absolute right-10 bottom-10 z-20 text-white"
			title={isMuted ? 'Ввімкнути звук' : 'Вимкнути звук'}
		>
			{#if isMuted}
				<Icon icon="material-symbols:volume-off" class="text-2xl" />
			{:else}
				<Icon icon="material-symbols:volume-up" class="text-2xl" />
			{/if}
		</button>
	</div>
</div>

<section id="concerts" class="mt-20 w-full md:mt-32">
	<div class="mx-auto max-w-6xl px-4 md:px-8">
		<div class="mb-16 flex justify-center">
			<h2 class="text-center text-4xl uppercase">concerts</h2>
		</div>

		<div class="flex justify-between border-b-[1.5px] border-base-content/20"></div>

		<div class="flex flex-col">
			{#each data.concerts as concert}
				<div
					class="group flex flex-col items-center justify-between gap-8 border-b-[1.5px] border-base-content/20 py-4 transition-colors hover:bg-base-200/30 md:flex-row"
				>
					<div class="flex items-center">
						{#if concert.image}
							<div class=" bg-base-300 md:h-20 md:w-20">
								<img src={concert.image} alt={concert.venue} class="h-full w-full object-cover" />
							</div>
						{:else}
							<div
								class="hidden h-20 w-20 shrink-0 rounded-xl border border-dashed border-base-content/10 bg-base-200/50 md:block"
							></div>
						{/if}
					</div>

					<div class="w-full md:w-32 md:text-left">
						<span class="text-xl font-bold tracking-tighter">{concert.date}</span>
						{#if concert.time}
							<div class="text-xs opacity-50">{concert.time}</div>
						{/if}
					</div>

					<div class="flex-1 px-4 text-center">
						<h3 class="mb-2 text-xl font-medium">{concert.venue}</h3>
						<p class="mx-auto max-w-md text-sm leading-relaxed font-light opacity-60">
							{concert.program}
						</p>
					</div>

					<div class="w-full text-center md:w-48 md:text-right">
						<div class="font-bold">{concert.city}</div>
						<div class="text-sm opacity-70">{concert.country}</div>
					</div>

					<div class="flex w-full items-center justify-center md:w-40 md:justify-end">
						<a
							href={concert.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex w-full items-center justify-center border-[1.5px] border-base-content/20 py-2 text-center font-sans text-xs tracking-wider uppercase transition-all duration-300 hover:border-primary hover:text-primary md:w-32"
						>
							Info
						</a>
					</div>
				</div>
			{:else}
				<div class="py-20 text-center opacity-30 italic">No upcoming concerts at the moment.</div>
			{/each}
		</div>
	</div>
</section>

<section
	id="videos"
	class="relative mx-auto mt-20 w-full max-w-6xl scroll-mt-24 px-4 md:mt-54 md:px-8"
>
	<!-- <div class="flex justify-center mb-16">
        <h2 class="text-4xl text-center uppercase">VIDEOS</h2>
    </div> -->
	<div
		class="pointer-events-none absolute top-0 right-0 left-0 hidden px-4 md:block md:-translate-y-5 md:px-8"
		aria-hidden="true"
	>
		<div class="grid grid-cols-3 gap-6">
			<div class="flex flex-col-reverse gap-3">
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
			</div>

			<div></div>

			<div class="flex flex-col-reverse gap-3">
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
				<div class="h-[1.5px] w-full bg-base-content/20"></div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-6 md:grid-cols-3">
		{#each videos as video, i}
			<div
				class="group relative isolate aspect-video overflow-hidden bg-base-300 shadow-lg transition-transform duration-500
                {i !== 1 && i !== 4 ? 'md:translate-y-12' : 'md:-translate-y-5'}"
			>
				{#if activeVideo === video.id}
					<iframe
						class="h-full w-full"
						src="https://www.youtube.com/embed/{video.videoId}?autoplay=1"
						title={video.title}
						frameborder="0"
						allow="autoplay; encrypted-media; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button
						class="absolute inset-0 z-20 h-full w-full cursor-pointer"
						onclick={() => (activeVideo = video.id)}
						aria-label="Play video"
					>
						<img
							src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg"
							alt={video.title}
							class="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
						/>

						<div
							class="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20"
						>
							<div
								class="transform text-white transition-transform duration-300 group-hover:scale-125"
							>
								<Icon icon="material-symbols:play-arrow" class="text-6xl" />
							</div>
						</div>

						<div
							class="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							{video.title}
						</div>
					</button>
				{/if}
			</div>
		{/each}
		<div class="col-span-2 flex md:col-span-1 md:col-start-2 md:-translate-y-5">
			<a
				href="https://www.youtube.com/@YOUR_CHANNEL_HANDLE"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex w-full items-center justify-center border-[1.5px] border-base-content/20 py-3 font-sans text-xs tracking-wider uppercase transition-all duration-300 hover:border-primary hover:text-primary"
			>
				Follow on YouTube
				<!-- <p>___</p>
                <Icon icon="fa6-brands:youtube" class="text-lg opacity-70 group-hover:opacity-100" /> -->
			</a>
		</div>
	</div>
</section>

<section id="bio" class="mx-auto mt-20 w-full max-w-6xl scroll-mt-24 px-4 md:mt-32 md:px-8">
	<div class="flex flex-col items-center gap-12 md:flex-row">
		<div class="w-full space-y-8 md:w-1/2">
			<h2 class="text-4xl tracking-widest uppercase">Biography</h2>

			<div class="space-y-6 font-sans text-sm leading-relaxed opacity-80">
				<p>
					Богдан Нестеренко — відомий акордеоніст, чия майстерність поєднує технічну досконалість та
					глибоку емоційність виконання. Його репертуар охоплює широку палітру: від класичних
					шедеврів до сучасних творів.
				</p>
				<p>
					Народився в Україні, наразі мешкає у Франції. Богдан активно співпрацює з міжнародними
					оркестрами та є постійним гостем престижних європейських фестивалів.
				</p>
			</div>

			<div class="h-[1.5px] w-24 bg-base-content/20"></div>
		</div>

		<div class="relative flex w-full items-center md:w-1/2">
			<button
				onclick={prevSlide}
				class="absolute left-0 z-30 p-2 text-base-content/40 transition-colors hover:text-primary focus:outline-none"
				aria-label="Previous image"
			>
				<Icon icon="material-symbols:arrow-back-ios-new" class="text-3xl" />
			</button>

			<div class="relative isolate aspect-[3/4] w-full px-12 py-8 md:px-16 md:py-12">
				<div class="relative h-full w-full overflow-hidden bg-base-300 shadow-2xl">
					<div
						class="flex h-full transition-transform duration-700 ease-in-out"
						style="transform: translateX(-{currentIndex * 100}%)"
					>
						{#each images as src}
							<img
								{src}
								alt="Bogdan Nesterenko"
								class="h-full w-full shrink-0 object-cover transition-all duration-1000"
							/>
						{/each}
					</div>

					<div
						class="pointer-events-none absolute top-0 right-0 flex flex-col items-end gap-2 p-6 opacity-30"
					>
						<div class="h-[1.5px] w-12 bg-base-content"></div>
						<div class="h-[1.5px] w-20 bg-base-content"></div>
					</div>
				</div>
			</div>

			<button
				onclick={nextSlide}
				class="absolute right-0 z-30 p-2 text-base-content/40 transition-colors hover:text-primary focus:outline-none"
				aria-label="Next image"
			>
				<Icon icon="material-symbols:arrow-forward-ios" class="text-3xl" />
			</button>
		</div>
	</div>
</section>

<section id="contacts"></section>

<!-- 
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1>
<h1>Welcome to SvelteKit</h1> -->
<!-- <section class="hero min-h-[70vh] bg-base-100 py-16">
  <div class="hero-content flex-col lg:flex-row-reverse gap-12">
    <div class="flex-1 grid grid-cols-2 gap-2">
        <img src="/photo1.jpg" class="col-span-2 rounded-sm shadow-2xl object-cover h-80 w-full" alt="Bogdan" />
        <img src="/photo2.jpg" class="rounded-sm shadow-xl object-cover h-40 w-full" alt="Detail" />
        <img src="/photo3.jpg" class="rounded-sm shadow-xl object-cover h-40 w-full" alt="Detail" />
    </div>
    <div class="flex-1">
      <h2 class="text-5xl font-serif italic mb-6 text-base-content">Biographie</h2>
      <p class="py-6 text-lg opacity-80 leading-relaxed">
        Bogdan Nesterenko — artiste d'exception... (ваш текст)
      </p>
      <button class="btn btn-outline btn-primary rounded-full px-8">En savoir plus</button>
    </div>
  </div>
</section>
<section class="py-20 bg-base-200">
    <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-serif tracking-widest text-center mb-12 uppercase">Projets</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each projects as project}
                <div class="card bg-base-100 shadow-xl image-full before:!opacity-60 hover:before:!opacity-40 transition-all duration-500 rounded-none border border-base-300">
                    <figure><img src="/project-{project.id}.jpg" alt={project.name} /></figure>
                    <div class="card-body flex items-center justify-center text-center">
                        <h3 class="card-title text-white uppercase tracking-tighter">{project.name}</h3>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
<section class="py-20 max-w-5xl mx-auto px-4">
    <h2 class="text-4xl font-serif italic text-center mb-16">Recordings</h2>
    
    <div class="flex flex-col gap-10">
        <div class="card lg:card-side bg-base-100 shadow-sm border border-base-200 overflow-hidden rounded-none">
            <figure class="lg:w-1/3"><img src="/cd1.jpg" alt="Album" class="w-full h-full object-cover" /></figure>
            <div class="card-body lg:w-2/3">
                <h3 class="card-title font-serif italic text-2xl">«Accordéon Baroque» (2006)</h3>
                <p class="text-sm opacity-70 italic">Editions HIRIN (Ukraine)</p>
                <p class="mt-4">Enregistré et sorti en Ukraine ce deuxième album...</p>
                <div class="card-actions justify-end mt-4">
                    <button class="btn btn-ghost btn-sm">Ecouter</button>
                </div>
            </div>
        </div>
        </div>
</section>
<section class="py-20 bg-base-300/30">
    <div class="max-w-xl mx-auto px-4">
        <h2 class="text-4xl font-serif text-center mb-12">Contact</h2>
        
        <div class="card bg-base-100 shadow-xl p-8 rounded-none border border-base-200">
            <div class="text-center mb-10">
                <p class="text-lg">bogdan.nesterenko@yahoo.fr</p>
                <p class="text-lg">+33 X XX XX XX XX</p>
            </div>
            <div class="form-control w-full">
                <label class="label"><span class="label-text">Votre Nom</span></label>
                <input type="text" class="input input-bordered w-full rounded-none focus:outline-primary" />
            </div>
            <div class="form-control w-full mt-4">
                <label class="label"><span class="label-text">Votre adresse mail</span></label>
                <input type="email" class="input input-bordered w-full rounded-none focus:outline-primary" />
            </div>
            <div class="form-control w-full mt-4">
                <label class="label"><span class="label-text">Objet de votre message</span></label>
                <input type="email" class="input input-bordered w-full rounded-none focus:outline-primary" />
            </div>
            <div class="form-control w-full mt-4">
                <label class="label"><span class="label-text">Message</span></label>
                <textarea class="textarea textarea-bordered w-full h-32 rounded-none focus:outline-primary"></textarea>
            </div>
            <div class="mt-8">
                <button class="btn btn-primary w-full rounded-full uppercase tracking-widest font-bold">
                    Envoyer
                </button>
            </div>
        </div>
    </div>
</section>

<section id="contact" class="py-24 bg-base-200/50 relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
         style="background: linear-gradient(90deg, #000 1px, transparent 1px); background-size: 40px 100%;">
    </div>

    <div class="max-w-2xl mx-auto px-6 relative z-10">
        <h2 class="text-5xl font-serif text-center mb-4 italic text-base-content">Contact</h2>
        <div class="w-24 h-[1px] bg-base-content/20 mx-auto mb-16"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 text-center md:text-left">
            <div>
                <span class="text-xs uppercase tracking-[0.2em] opacity-50 block mb-2">Email</span>
                <a href="mailto:bogdan.nesterenko@yahoo.fr" class="text-xl font-light hover:text-primary transition-colors">
                    bogdan.nesterenko@yahoo.fr
                </a>
            </div>
            <div>
                <span class="text-xs uppercase tracking-[0.2em] opacity-50 block mb-2">Téléphone</span>
                <p class="text-xl font-light">+33 X XX XX XX XX</p>
            </div>
        </div>

        <form class="space-y-10 bg-base-100 p-10 md:p-16 shadow-2xl rounded-none border border-base-300/50">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="form-control w-full">
                    <input type="text" placeholder="Votre Nom" 
                           class="bg-transparent border-b border-base-content/20 py-3 focus:border-primary outline-none transition-all placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-light" />
                </div>
                <div class="form-control w-full">
                    <input type="email" placeholder="Votre adresse mail" 
                           class="bg-transparent border-b border-base-content/20 py-3 focus:border-primary outline-none transition-all placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-light" />
                </div>
            </div>

            <div class="form-control w-full">
                <input type="text" placeholder="Objet de votre message" 
                       class="bg-transparent border-b border-base-content/20 py-3 focus:border-primary outline-none transition-all placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-light" />
            </div>

            <div class="form-control w-full">
                <textarea placeholder="Votre Message" rows="4" 
                          class="bg-transparent border-b border-base-content/20 py-3 focus:border-primary outline-none transition-all resize-none placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-light"></textarea>
            </div>

            <div class="flex justify-center pt-6">
                <button class="btn btn-primary btn-outline rounded-full px-12 py-3 uppercase tracking-[0.3em] text-xs font-bold hover:scale-105 transition-transform">
                    Envoyer
                </button>
            </div>
        </form>
    </div>
</section> -->

<!-- <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->
