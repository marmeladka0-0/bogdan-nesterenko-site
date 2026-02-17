<script lang="ts">
	export let id: string;
	export let title: string;
	export let description: string;
</script>

<div
	class="group flex h-full flex-col overflow-hidden rounded-none border border-base-300 bg-base-200"
>
	<div class="relative aspect-video w-full">
		<iframe
			class="absolute inset-0 h-full w-full"
			src="https://www.youtube.com/embed/{id}"
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>

	<div class="flex flex-grow flex-col justify-between p-4">
		<div>
			<h3 class="mb-1 font-serif text-lg tracking-wider uppercase">{title}</h3>
			<p class="text-sm italic opacity-70">{description}</p>
		</div>
	</div>
</div>
