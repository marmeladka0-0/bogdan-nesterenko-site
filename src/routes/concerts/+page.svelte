<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';
    import { getLocale } from '$lib/paraglide/runtime.js';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Tous les concerts - Bogdan Nesterenko</title>
</svelte:head>


<video
    src="/video.webm"
    poster="/poster.webp"
    autoplay
    loop
    muted
    playsinline
    class="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full object-cover brightness-50 contrast-[0.85] hue-rotate-[-5deg]"
    aria-hidden="true"
></video>

<div
    class="pointer-events-none fixed top-0 left-0 z-10 h-screen w-full bg-black/60 backdrop-blur-md"
    aria-hidden="true"
></div>

<main class="relative z-10 mx-auto w-full max-w-4xl px-8 pt-32 pb-24 font-sans sm:px-4">
    
    <div class="mb-8 flex items-center justify-center gap-4 opacity-70">
        <h2 class="text-center text-lg font-normal tracking-[0.5em] uppercase">
            {m.all_upcoming_concerts()}
        </h2>
    </div>

    <div class="space-y-4">
        {#each data.concerts as concert, index (concert.date + index)}
            <div class="flex min-h-[120px] w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 p-4 transition-all hover:bg-black/40 md:gap-6 md:p-6">
                <div class=" flex min-w-[50px] flex-col items-center justify-center border-r border-base-content/10 pr-2 md:pr-8 text-white">
                    <span class="text-3xl leading-none font-medium tracking-tighter opacity-90">
                        {concert.date.split('-')[2]}
                    </span>
                    <span class="mt-1 text-xs font-medium tracking-wider uppercase opacity-70">
                        {new Date(concert.date).toLocaleString(getLocale(), { month: 'short' }).replace('.', '')}
                    </span>
                    {#if concert.time}
                        <span class="mt-1 font-sans text-xs tracking-wide opacity-60">
                            {concert.time}
                        </span>
                    {/if}
                </div>

                <div class="flex flex-1 grow flex-col justify-center text-white">
                    <h4 class="text-base leading-tight font-normal tracking-wide opacity-90 md:text-lg">
                        {concert.city}{#if concert.country}, {concert.country}{/if}
                    </h4>

                    {#if concert.program}
                        <p class="mt-2 text-[9px] tracking-widest opacity-50 transition-all duration-700 group-hover:opacity-80">
                            {concert.program}
                        </p>
                    {/if}
                </div>

                <div class="flex w-auto items-center justify-end">
                    {#if concert.link}
                        <a href={concert.link} target="_blank" rel="noopener noreferrer" class="btn rounded-2xl border-none bg-transparent px-2 text-xs font-normal tracking-widest text-white/80 shadow-none transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none md:px-6 md:btn-sm">
                            INFO
                        </a>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    <!-- <div class="mt-4 flex justify-center pt-8">
        <a
            href="/#concerts"
            class="group flex items-center gap-2 rounded-2xl border-none bg-transparent px-4 py-2 text-xs font-normal tracking-widest text-white/40 uppercase transition-all duration-300 hover:bg-white/5 hover:text-primary focus:outline-none"
        >
            <span class="text-base-content/40 transition-colors group-hover:text-primary">
                {m.back_long()}
            </span>
        </a>
    </div> -->
</main>