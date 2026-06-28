<script lang="ts">
    import Icon from '@iconify/svelte';
    import { m } from '$lib/paraglide/messages.js';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    const imageModules = import.meta.glob(
        '/src/lib/assets/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}',
        { eager: true, query: { enhanced: true } }
    ) as Record<string, { default: string }>;

    // 1. Оновлена база даних: додано 'images' (масив) та 'videos' (масив з YouTube ID)
    let allProjects = $derived([
        {
            slug: 'trio-svita',
            title: 'TRIO SViTA',
            images: [
                imageModules['/src/lib/assets/projects/details/1201-SVITA.webp']?.default,
                imageModules['/src/lib/assets/projects/details/1203-SVITA.webp']?.default
            ],
            
            // Викликаємо функції Paraglide для учасників
            members: [
                m.project_svita_member_1(),
                m.project_svita_member_2(),
                m.project_svita_member_3()
            ],
            
            // Викликаємо функції Paraglide для опису
            description: [
                m.project_svita_desc_1(),
                m.project_svita_desc_2()
            ],
            
            videos: [
                { title: 'Pablo de Sarasate "Navarra"', videoId: 'JKCSseSa4CY' },
                { title: 'Antonín Dvořák - Danse slave "Dumka"', videoId: 'x7djILexImw' } 
            ]
        },
        // Інший проєкт...
        {
            slug: 'pan-bayan',
            title: 'PAN & BAYAN',
            subtitle: m.project_panbayan_subtitle(), // Додано підзаголовок
            images: [
                imageModules['/src/lib/assets/projects/1301 Pan Bayan.webp']?.default
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
            // Додано масив концертів
            concerts: [
                { date: '25/07/2026', location: 'Locmariaquer (56)' },
                { date: '26/07/2026', location: 'Rigny-Ussé (37)' },
                { date: '28/07/2026', location: 'Le Croisic (44)' },
                { date: '29/07/2026', location: 'Beauvoir-sur-Mer (85)' },
                { date: '17/08/2026', location: "Abbaye de Valcroissant à Die (26)" }
            ]
        }
    ]);

    let currentProject = $derived(allProjects.find(p => p.slug === data.slug));

    // 2. Логіка для каруселі фото (як у Біографії)
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

    // 3. Логіка для відео (як на головній)
    let playingVideoId = $state<string | null>(null);

    // Скидаємо стейт, якщо перейшли на інший проєкт
    $effect(() => {
        data.slug; // тригер
        currentImageIndex = 0;
        playingVideoId = null;
    });
</script>

<svelte:head>
    <title>{currentProject ? currentProject.title : 'Project'} - Bogdan Nesterenko</title>
</svelte:head>

<!-- ФОН -->
<video src="/video.webm" poster="/poster.webp" autoplay loop muted playsinline class="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full object-cover brightness-50 contrast-[0.85] hue-rotate-[-5deg]" aria-hidden="true"></video>
<div class="pointer-events-none fixed top-0 left-0 z-10 h-screen w-full bg-black/70 backdrop-blur-md" aria-hidden="true"></div>

<main class="relative z-20 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-8 pt-36 pb-24 font-sans sm:px-4">
    
    <!-- <div class="mb-12 w-full">
        <a href="/#projects" class="group inline-flex items-center text-white/50 transition-colors hover:text-primary">
            <Icon icon="mdi:chevron-left" width="28" height="28" class="-ml-2 transition-transform group-hover:-translate-x-1" />
            <span class="text-xs uppercase tracking-widest text-inherit">{m.back_short()}</span>
        </a>
    </div> -->


    {#if currentProject}
        <!-- Змінили gap-12 на flex-col, щоб шапка була зверху -->
        <article class="flex flex-col w-full">
        
        <!-- ШАПКА: Заголовок и Участники -->
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

        <!-- ОСНОВНОЙ БЛОК: Фото (40%) + Текст (60%) -->
        <div class="flex flex-col items-start gap-12 md:flex-row md:gap-16 w-full">
            
            <!-- КАРУСЕЛЬ ФОТО (Левая колонка) -->
            <!-- Сделали её чуть уже (w-5/12), чтобы тексту было свободнее -->
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
                                <enhanced:img src={src} alt={currentProject.title} class="h-full w-full object-cover brightness-60 transition-all duration-700 group-hover/slider:scale-105 group-hover/slider:brightness-100" />
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

            <!-- ТЕКСТОВОЕ ОПИСАНИЕ (Правая колонка) -->
            <!-- Занимает оставшееся место (w-7/12) -->
            <div class="w-full md:w-7/12 flex flex-col pt-2">
                {#if currentProject.subtitle}
                    <p class="mb-8 font-sans text-base italic font-light leading-relaxed text-primary/90">
                        {currentProject.subtitle}
                    </p>
                {/if}

                {#if currentProject.description && currentProject.description.length > 0}
                    <!-- Убрали text-justify, оставили естественное выравнивание, увеличили межстрочный интервал (leading-loose) -->
                    <div class="space-y-6 font-sans text-sm font-light leading-loose tracking-wide text-white/80 text-justify">
                        {#each currentProject.description as paragraph, i (i)}
                            <p>{paragraph}</p>
                        {/each}
                    </div>
                {/if}
                <!-- {#if currentProject.concerts && currentProject.concerts.length > 0}
                    <div class="mt-12 border-t border-white/10 pt-8">
                        <h3 class="mb-6 text-xs tracking-[0.25em] text-white/40 uppercase">Prochains concerts</h3>
                        <ul class="space-y-3 border-l border-primary/30 pl-4">
                            {#each currentProject.concerts as concert (concert.date + concert.location)}
                                <li class="flex items-start gap-4 sm:items-center text-sm font-light tracking-wide">
                                    <span class="w-24 shrink-0 text-primary/90">{concert.date}</span>
                                    <span class="text-white/80">{concert.location}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if} -->
            </div>
        </div>
        {#if currentProject.concerts && currentProject.concerts.length > 0}
            <div class="mt-16 w-full border-t border-white/10 pt-12">
                <h3 class="mb-8 text-center text-xs tracking-[0.25em] text-white/40 uppercase">Prochains concerts</h3>
                
                <div class="space-y-4">
                    {#each currentProject.concerts as concert (concert.date + concert.location)}
                        <!-- Розбиваємо дату '25/07/2026' на ['25', '07', '2026'] -->
                        {@const dateParts = concert.date.split('/')}
                        
                        <div class="group flex min-h-[90px] w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 p-4 transition-all hover:border-white/20 hover:bg-black/40 md:gap-6 md:p-6">
                            
                            <!-- Лівий блок: ДАТА з вертикальною лінією -->
                            <div class="flex min-w-[60px] flex-col items-center justify-center border-r border-white/10 pr-4 md:min-w-[80px] md:pr-6">
                                <!-- День (Великий) -->
                                <span class="text-3xl font-medium leading-none tracking-tighter text-white/80 transition-colors group-hover:text-white">
                                    {dateParts[0]}
                                </span>
                                <!-- Місяць і Рік (Маленькі) -->
                                <span class="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/40">
                                    {dateParts[1]}.{dateParts[2]}
                                </span>
                            </div>

                            <!-- Центральний блок: ЛОКАЦІЯ -->
                            <div class="flex flex-1 grow flex-col justify-center">
                                <h4 class="text-sm font-normal leading-tight tracking-wide text-white/80 opacity-90 transition-colors group-hover:text-white md:text-base">
                                    {concert.location}
                                </h4>
                            </div>

                            <!-- Правий блок: Елегантна стрілочка замість кнопки INFO -->
                            <div class="flex w-auto items-center justify-end pl-2">
                                <div class="text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary">
                                    <Icon icon="mdi:arrow-right-thin" width="24" height="24" />
                                </div>
                            </div>
                            
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- СЕКЦИЯ ВИДЕО (Вынесена вниз на всю ширину) -->
        {#if currentProject.videos && currentProject.videos.length > 0}
            <div class="mt-24 w-full border-t border-white/10 pt-16">
                <!-- Заголовок видео по центру для гармонии с верхней шапкой -->
                <!-- <h3 class="mb-10 text-center text-sm tracking-[0.4em] text-white/50 uppercase">Vidéos</h3> -->
                
                <!-- Сетка видео: теперь они не зажаты, а красиво распределяются -->
                 <div class="flex flex-wrap justify-center gap-8 lg:gap-12">
    
                    <!-- Прибрали index, він нам більше не потрібен -->
                    {#each currentProject.videos as video (video.videoId)}
                        
                        <!-- 2. Замість col-span використовуємо точну математику ширини: 50% мінус відступ -->
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
            <h1 class="text-xl tracking-widest text-white/50">Проєкт не знайдено / Project not found</h1>
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