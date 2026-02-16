<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import Icon from '@iconify/svelte';
	import type { PageProps } from '../$types';
	import { getConcerts } from '$lib/utils';

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
</script>

<svelte:window bind:scrollY />

<div class="relative h-screen w-full overflow-hidden bg-black">
	<video
		src="/video.mp4"
		poster="/poster.jpg"
		autoplay
		loop
		muted
		playsinline
		bind:this={videoElement}
		class="absolute inset-0 h-full w-full object-cover blur-xs brightness-50 grayscale"
		style="transform: translateY({scrollY * 0.4}px); opacity: {1 - scrollY * 0.001};"
		aria-hidden="true"
	>
		<track kind="captions" />
	</video>

	<div class="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black to-transparent"></div>

	<div class="absolute inset-x-0 bottom-5 z-20 flex animate-bounce justify-center text-white/50">
		<Icon icon="mdi:chevron-down" width="36" height="36" />
	</div>

	<div
		class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white"
	>
		<h1 class="text-5xl font-bold tracking-tight md:text-7xl">BOGDAN NESTERENKO</h1>
		<p class="mt-4 max-w-xl text-lg md:text-xl">
			This is a centered text block positioned over the video background.
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
<main class="mx-auto w-full bg-black px-4 md:px-8">
	<section id="concerts" class="mx-auto w-full max-w-5xl py-16 md:py-24">
		<div class="mb-10 flex items-center gap-6">
			<div class="h-px flex-1 bg-linear-to-r from-transparent to-base-content/20"></div>
			<h2
				class="text-center font-sans text-sm font-medium tracking-[0.3em] text-base-content/70 uppercase"
			>
				Upcoming Concerts
			</h2>
			<div class="h-px flex-1 bg-linear-to-l from-transparent to-base-content/20"></div>
		</div>

		<div class="overflow-x-auto rounded-lg border border-base-content/10">
			<table class="table table-lg">
				<thead>
					<tr class="border-b border-base-content/10 text-xs tracking-wider uppercase">
						<th class="text-base-content/40">Date</th>
						<th class="text-base-content/40">City</th>
						<th class="text-base-content/40">Venue</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each data.concerts as concert, i}
						<tr class="border-b border-base-content/10 transition-colors hover:bg-base-200/20">
							<!-- Date & Time -->
							<td class="whitespace-nowrap">
								<span class="text-lg tracking-tight text-base-content/80">{concert.date}</span>
								{#if concert.time}
									<span class="ml-1 text-sm text-base-content/40">({concert.time})</span>
								{/if}
							</td>

							<!-- City & Country -->
							<td>
								<span class="font-medium text-base-content/80">{concert.city}</span>
								{#if concert.country}
									<span class="text-sm text-base-content/40">, {concert.country}</span>
								{/if}
							</td>

							<!-- Venue -->
							<td>
								<span class="text-base-content/80">{concert.venue}</span>
							</td>

							<!-- Buy now -->
							<td class="text-right">
								<a
									href={concert.link}
									target="_blank"
									rel="noopener noreferrer"
									class="btn gap-2 rounded-none text-xs tracking-wider text-base-content/80 uppercase btn-outline btn-sm btn-neutral"
								>
									Buy now
									<Icon icon="mdi:chevron-right" width="16" height="16" />
								</a>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="py-20 text-center text-base-content/30 italic">
								No upcoming concerts at the moment.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</main>
