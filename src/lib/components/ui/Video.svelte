<script lang="ts">
    export let id: string;
    export let title: string;
    export let description: string;
</script>

<div class="group flex flex-col bg-base-200 border border-base-300 rounded-none overflow-hidden h-full">
    <div class="aspect-video w-full relative">
        <iframe
            class="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/{id}"
            title={title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>

    <div class="p-4 flex flex-col flex-grow justify-between">
        <div>
            <h3 class="text-lg font-serif uppercase tracking-wider mb-1">{title}</h3>
            <p class="text-sm opacity-70 italic">{description}</p>
        </div>
    </div>
</div>