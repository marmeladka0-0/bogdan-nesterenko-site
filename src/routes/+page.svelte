<script lang="ts">
    import type { PageProps } from './$types';

    interface Profile {
        name: string;
        headline: string;
    }

    let { data }: PageProps = $props();

    // Це значення буде автоматично оновлюватися, якщо data зміниться
    let profile = $derived(data.profile as Profile);
</script>

<div class="min-h-screen bg-base-100 flex items-center justify-center p-6 text-center">
    {#if profile}
        <div class="space-y-4">
            <h1 class="text-6xl md:text-8xl font-serif italic text-primary">
                {profile.name}
            </h1>
            <p class="text-accent tracking-widest uppercase text-sm">
                {profile.headline}
            </p>
        </div>
    {/if}
</div>