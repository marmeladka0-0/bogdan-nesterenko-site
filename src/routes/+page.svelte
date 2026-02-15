<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';
    import Icon from '@iconify/svelte';
    import type { PageProps } from './$types';

    //music
    let isMuted = $state(true);
    // let videoId = "Kh28YpalnPk";
    let videoId = "NpzMhFwWcqQ";

    //to change video volume
    function toggleMute() {
        isMuted = !isMuted;
        
        const iframe = document.getElementById('bg-video') as HTMLIFrameElement;
        const command = isMuted ? 'mute' : 'unMute';

        iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: command
        }), '*');

        iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [20] //0-100 - volume
        }), '*');
    }

    let { data }: PageProps = $props();
    // const concerts = data.concerts;

    let videos = [
        { id: 'video1', title: 'Concert 1', videoId: 'HgQPZRY2aic' },
        { id: 'video2', title: 'Concert 2', videoId: '3OjadYgRVUg' },
        { id: 'video3', title: 'Concert 3', videoId: 'uuC-SMsnMWw' },
        { id: 'video4', title: 'Concert 4', videoId: 'JKCSseSa4CY' },
        { id: 'video5', title: 'Concert 5', videoId: 'NynXtGhj-dU' },
        { id: 'video6', title: 'Concert 6', videoId: 'cQ8ZzzPloXc' },
    ];

    let activeVideo = $state<string | null>(null);

</script>

<div class="bg-base-100 w-full max-w-6xl px-4 md:px-8 mx-auto">
    <div class="relative h-[60vh] md:h-[90vh] w-full overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
            <iframe 
                id="bg-video"
                class="absolute min-w-[177.77vh] min-h-[100%] w-[100vw] h-[56.25vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="https://www.youtube.com/embed/{videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist={videoId}&rel=0&enablejsapi=1&start=30" 
                title="Background Video"
                allow="autoplay"
                frameborder="0" 
            ></iframe>
        </div>

        <div class="absolute inset-y-0 left-0 w-24 hidden md:flex justify-center gap-3 pointer-events-none z-20">
            <div class="w-[1.5px] h-full bg-base-100"></div>
            <div class="w-[1.5px] h-full bg-base-100"></div>
            <div class="w-[1.5px] h-full bg-base-100"></div>
        </div>

        <div class="absolute inset-0 bg-black/50"></div>

        <div class="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 class="text-5xl md:text-7xl mb-4 uppercase tracking-wider">
                Bogdan Nesterenko
            </h1>
            <p class="text-xl md:text-2xl max-w-2xl">
                {m.label_bayan()}
            </p>
        </div>
        <button 
            onclick={toggleMute}
            class="absolute bottom-10 right-10 z-20 text-white"
            title={isMuted ? "Ввімкнути звук" : "Вимкнути звук"}
        >
            {#if isMuted}
                <Icon icon="material-symbols:volume-off" class="text-2xl" />
            {:else}
                <Icon icon="material-symbols:volume-up" class="text-2xl" />
            {/if}
        </button>
    </div>
</div>

<section id="concerts" class="w-full mt-20 md:mt-32">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex justify-center mb-16">
            <h2 class="text-4xl text-center uppercase">concerts</h2>
        </div>

        <div class="flex justify-between border-b-[1.5px] border-base-content/20 "></div>

        <div class="flex flex-col">
            {#each data.concerts as concert}
                <div class="group flex flex-col md:flex-row justify-between items-center py-4 border-b-[1.5px] border-base-content/20 gap-8 transition-colors hover:bg-base-200/30">
                    
                    <div class="flex items-center">
                        {#if concert.image}
                            <div class=" md:w-20 md:h-20 bg-base-300">
                                <img 
                                    src={concert.image} 
                                    alt={concert.venue} 
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        {:else}
                            <div class="hidden md:block w-20 h-20 shrink-0 rounded-xl bg-base-200/50 border border-dashed border-base-content/10"></div>
                        {/if}
                    </div>

                    <div class="w-full md:w-32 md:text-left">
                        <span class="text-xl font-bold tracking-tighter">{concert.date}</span>
                        {#if concert.time}
                            <div class="text-xs opacity-50">{concert.time}</div>
                        {/if}
                    </div>

                    <div class="flex-1 text-center px-4">
                        <h3 class="text-xl font-medium mb-2">{concert.venue}</h3>
                        <p class="text-sm opacity-60 font-light max-w-md mx-auto leading-relaxed">
                            {concert.program}
                        </p>
                    </div>

                    <div class="w-full md:w-48 text-center md:text-right">
                        <div class="font-bold">{concert.city}</div>
                        <div class="text-sm opacity-70">{concert.country}</div>
                    </div>

                    <div class="w-full md:w-40 flex justify-center md:justify-end items-center">
                        <a 
                            href={concert.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-outline rounded-full px-10 uppercase text-xs hover:text-primary hover:bg-transparent hover:border-primary transition-all duration-300"
                        >
                            Info
                        </a>
                    </div>
                </div>
            {:else}
                <div class="py-20 text-center opacity-30 italic">
                    No upcoming concerts at the moment.
                </div>
            {/each}
        </div>
    </div>
</section>

<section id="videos" class="w-full mt-20 md:mt-32 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-24">
    <div class="flex justify-center mb-16">
        <h2 class="text-4xl text-center uppercase">VIDEOS</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each videos as video}
            <div class="relative aspect-video bg-base-300 overflow-hidden group shadow-lg isolate">
                
                {#if activeVideo === video.id}
                    <iframe 
                        class="w-full h-full"
                        src="https://www.youtube.com/embed/{video.videoId}?autoplay=1" 
                        title={video.title}
                        frameborder="0"
                        allow="autoplay; encrypted-media; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                {:else}
                    <button 
                        class="absolute inset-0 w-full h-full cursor-pointer z-20"
                        onclick={() => activeVideo = video.id}
                        aria-label="Play video"
                    >
                        <img 
                            src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg" 
                            alt={video.title}
                            class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        />
                        
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div class="text-white transform group-hover:scale-125 transition-transform duration-300">
                                <Icon icon="material-symbols:play-arrow" class="text-6xl" />
                            </div>
                        </div>

                        <div class="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {video.title}
                        </div>
                    </button>
                {/if}
            </div>
        {/each}
    </div>
</section>










































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
