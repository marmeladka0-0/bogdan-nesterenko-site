<script lang="ts">
    import Icon from '@iconify/svelte';
    import { m } from '$lib/paraglide/messages.js';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    const imageModules = import.meta.glob(
        '/src/lib/assets/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}',
        { eager: true, query: { enhanced: true } }
    ) as Record<string, { default: string }>;

    let allProjects = $derived([
        {
            slug: 'trio-svita',
            title: 'TRIO SViTA',
            images: [
                imageModules['/src/lib/assets/projects/1201 SVITA.webp']?.default,
                imageModules['/src/lib/assets/projects/details/1203-SVITA.webp']?.default                
            ],
            
            members: [
                m.project_svita_member_1(),
                m.project_svita_member_2(),
                m.project_svita_member_3()
            ],
            
            description: [
                m.project_svita_desc_1(),
                m.project_svita_desc_2()
            ],
            
            videos: [
                { title: 'Pablo de Sarasate "Navarra"', videoId: 'JKCSseSa4CY' },
                { title: 'Antonín Dvořák - Danse slave "Dumka"', videoId: 'x7djILexImw' } 
            ]
        },
        {
            slug: 'pan-bayan',
            title: 'PAN & BAYAN',
            subtitle: m.project_panbayan_subtitle(),
            images: [
                imageModules['/src/lib/assets/projects/1301 Pan Bayan.webp']?.default,
                imageModules['/src/lib/assets/projects/details/1302-Pan-Bayan.webp']?.default
            ],
            members: [
                m.project_panbayan_member_1(),
                m.project_panbayan_member_2()
            ],
            description: [
                m.project_panbayan_desc_1(),
                m.project_panbayan_desc_2(),
                m.project_panbayan_desc_3()
            ],
            videos: [
                { title: 'Mozart - La Flûte enchantée', videoId: 'FPNNe3GHpx0' },
                { title: 'Duo Gheorgilas - Nesterenko en concert', videoId: 'TiKYBKpouM8' },
                { title: 'Duo Gheorgilas - Nesterenko en concert: musiques roumaine', videoId: 'UX3aKvAtb7U' }
            ],
            concerts: [
                { date: '25/07/2026', location: 'Locmariaquer (56)' },
                { date: '26/07/2026', location: 'Rigny-Ussé (37)' },
                { date: '28/07/2026', location: 'Le Croisic (44)' },
                { date: '29/07/2026', location: 'Beauvoir-sur-Mer (85)' },
                { date: '17/08/2026', location: "Abbaye de Valcroissant à Die (26)" }
            ]
        },
        {
            slug: 'juliette-de-massy',
            title: 'Avec Juliette DE MASSY',
            images: [imageModules['/src/lib/assets/projects/1412 Ju.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        },
        {
            slug: 'olga-vojnovic',
            title: 'Avec Olga VOJNOVIC',
            images: [imageModules['/src/lib/assets/projects/1501 Olga.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        },
        {
            slug: 'dialogue-insolite',
            title: 'DIALOGUE INSOLITE',
            images: [imageModules['/src/lib/assets/projects/1601 Marc.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        },
        {
            slug: 'orgue-accordion',
            title: 'ORGUE et ACCORDÉON',
            images: [imageModules['/src/lib/assets/projects/1701 Jan.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        },
        {
            slug: 'rafraichis',
            title: 'RAFRAÎCHIS AUSSI LE SOL NU',
            images: [imageModules['/src/lib/assets/projects/RAFRAÎCHIS.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        },
        {
            slug: 'chant-du-cygne',
            title: 'LE CHANT DU CYGNE',
            images: [imageModules['/src/lib/assets/projects/Le chant du cygne_cropped.webp']?.default],
            subtitle: '',
            description: [],
            members: [],
            concerts: []
        }
    ]);

    let currentProject = $derived(allProjects.find(p => p.slug === data.slug));

    let currentImageIndex = $state(0);

    function nextImage() {
        if (currentProject?.images) {
            currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        }
    }
    function prevImage() {
        if (currentProject?.images) {
            currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        }
    }

    let playingVideoId = $state<string | null>(null);

    $effect(() => {
        void data.slug; // тригер
        currentImageIndex = 0;
        playingVideoId = null;
    });
</script>

<svelte:head>
    <title>{currentProject ? currentProject.title : 'Project'} - Bogdan Nesterenko</title>
</svelte:head>

<!-- ФОН -->
<video src="/video.webm" poster="/poster.webp" autoplay loop muted playsinline class="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full object-cover brightness-50 contrast-[0.85] hue-rotate-[-5deg]" aria-hidden="true"></video>
<div class="pointer-events-none fixed top-0 left-0 z-10 h-screen w-full bg-black/60 backdrop-blur-md" aria-hidden="true"></div>

<main class="relative z-20 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-8 pt-36 pb-24 font-sans sm:px-4">
    
    {#if currentProject}
        <article class="flex flex-col w-full">
        <div class="flex w-full flex-col items-center justify-center border-b border-white/10 pb-12 text-center mb-16">
            <h1 class="mb-10 text-center font-sans text-xl font-normal tracking-[0.2em] text-white/90 uppercase md:text-3xl">
                {currentProject.title}
            </h1>

            {#if currentProject.members && currentProject.members.length > 0}
                <div class="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    {#each currentProject.members as member, index (member)}
                        {@const parts = member.split(' (')}
                        {@const name = parts[0]}
                        {@const instrument = parts[1] ? parts[1].replace(')', '') : ''}
                        
                        <div class="flex flex-col items-center gap-1.5">
                            <span class="text-base font-light tracking-widest text-white/80">{name}</span>
                            {#if instrument}
                                <span class="text-[10px] tracking-[0.2em] text-white/40 uppercase">{instrument}</span>
                            {/if}
                        </div>

                        {#if index < currentProject.members.length - 1}
                            <div class="hidden h-8 w-[1px] bg-white/10 md:block"></div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>

        <div class="flex flex-col items-start gap-12 md:flex-row md:gap-16 w-full">
            
            <div class="group/slider relative w-full shrink-0 md:w-5/12 lg:w-[380px]">
                <div class="relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl">
                    
                    {#if currentProject.images && currentProject.images.length > 1}
                        <button onclick={prevImage} class="absolute left-2 top-1/2 z-30 -translate-y-1/2 p-1 text-white/20 opacity-0 transition-all duration-500 group-hover/slider:opacity-100 hover:scale-110 hover:text-white focus:outline-none">
                            <Icon icon="mdi:chevron-left" width="32" height="32" />
                        </button>
                    {/if}

                    <div class="flex h-full w-full transition-transform duration-700 ease-in-out" style="transform: translateX(-{currentImageIndex * 100}%);">
                        {#each currentProject.images as src, i (i)}
                            <div class="h-full w-full shrink-0 overflow-hidden">
                                <enhanced:img src={src} alt={currentProject.title} class="h-full w-full object-cover brightness-70 transition-all duration-700 group-hover/slider:scale-105 group-hover/slider:brightness-100" />
                            </div>
                        {/each}
                    </div>

                    {#if currentProject.images && currentProject.images.length > 1}
                        <button onclick={nextImage} class="absolute right-2 top-1/2 z-30 -translate-y-1/2 p-1 text-white/20 opacity-0 transition-all duration-500 group-hover/slider:opacity-100 hover:scale-110 hover:text-white focus:outline-none">
                            <Icon icon="mdi:chevron-right" width="32" height="32" />
                        </button>
                    {/if}
                </div>
            </div>

            <div class="w-full md:w-7/12 flex flex-col pt-2">
                {#if currentProject.subtitle}
                    <p class="mb-8 font-sans text-sm font-normal text-white/70">
                        « {currentProject.subtitle}. »
                    </p>
                {/if}

                {#if currentProject.description && currentProject.description.length > 0}
                    <div class="space-y-6 font-sans text-sm font-light leading-loose tracking-wide text-white/80 text-justify">
                        {#each currentProject.description as paragraph, i (i)}
                            <p>{paragraph}</p>
                        {/each}
                    </div>
                    {:else}
                        <div class="flex h-40 w-full items-center justify-center rounded-2xl border border-white/5 bg-white/5">
                            <p class="text-[10px] font-normal uppercase tracking-[0.3em] text-white/30 text-center">
                                {m.common_development()}
                            </p>
                        </div>
                {/if}
            </div>
        </div>
        {#if currentProject.concerts && currentProject.concerts.length > 0}
            <div class="mt-16 w-full border-t border-white/10 pt-12">
        
                <h3 class="mb-10 text-center text-[10px] font-normal tracking-[0.2em] uppercase text-white/40">
                    Prochains concerts
                </h3>
                <div class="space-y-4">
                    {#each currentProject.concerts as concert (concert.date + concert.location)}
                        {@const dateParts = concert.date.split('/')}
                        
                        <div class="flex min-h-[90px] w-full items-center gap-6 rounded-lg border border-white/10 bg-black/30 p-6 transition-all">
                            
                            <div class="flex min-w-[60px] flex-col items-center justify-center border-r border-white/10 pr-6">
                                <span class="text-3xl font-medium leading-none tracking-tighter text-white/80">
                                    {dateParts[0]}
                                </span>
                                <span class="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/40">
                                    {dateParts[1]}.{dateParts[2]}
                                </span>
                            </div>

                            <div class="flex flex-1 grow flex-col justify-center">
                                <h4 class="text-base font-normal tracking-wide text-white/80 opacity-90">
                                    {concert.location}
                                </h4>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

        {#if currentProject.videos && currentProject.videos.length > 0}
            <div class="mt-24 w-full border-t border-white/10 pt-12">
                 <div class="flex flex-wrap justify-center gap-8 lg:gap-12">
                    
                    {#each currentProject.videos as video (video.videoId)}
                        
                        <div class="flex flex-col w-full max-w-[480px] sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)]">
                            
                            <div class="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all duration-700 hover:border-white/30 hover:shadow-2xl">
                                {#if playingVideoId === video.videoId}
                                    <iframe
                                        class="h-full w-full"
                                        src="https://www.youtube.com/embed/{video.videoId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0"
                                        title={video.title}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                        allowfullscreen
                                    ></iframe>
                                {:else}
                                    <img
                                        src="https://img.youtube.com/vi/{video.videoId}/hqdefault.jpg"
                                        alt={video.title}
                                        class="h-full w-full object-cover brightness-60 transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                                        loading="lazy"
                                    />
                                    <button
                                        onclick={() => playingVideoId = video.videoId}
                                        class="group absolute inset-0 z-30 flex items-center justify-center border-none bg-transparent outline-none transition-all"
                                        type="button"
                                        aria-label="Play {video.title}"
                                    >
                                        <div
                                            class="rounded-full bg-white/5 p-1 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-white/20"
                                        >
                                            <svg
                                                class="mr-3 ml-3 h-6 w-6 fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </button>
                                {/if}
                            </div>
                            
                            <p class="mt-5 text-center font-sans text-[10px] tracking-widest text-white/50 uppercase">
                                {video.title}
                            </p>
                            
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

    </article>
    {:else}
        <div class="flex flex-1 items-center justify-center">
            <h1 class="text-xl tracking-widest text-white/50">Project not found</h1>
        </div>
    {/if}
    <!-- <div class="mt-4 flex justify-center pt-8">
        <a
            href="/#projects"
            class="group flex items-center gap-2 rounded-2xl border-none bg-transparent px-4 py-2 text-xs font-normal tracking-widest text-white/40 uppercase transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none"
        >
            <span class="text-base-content/40 transition-colors group-hover:text-primary">
                {m.back_long()}
            </span>
        </a>
    </div> -->
</main>