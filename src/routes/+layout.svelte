<!-- <script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()} -->

<script lang="ts">
  import './layout.css';
  let { children } = $props();
</script>

<div class="navbar bg-base-100 border-b border-primary/20 sticky top-0 z-50">
  <div class="flex-1">
    <li><a href="/" class="menu menu-horizontal">B. Nesterenko</a></li>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal">
      <li><a href="/biography">biography</a></li>
      <li><a href="/repertoire">repertuar</a></li>
      <li><a href="/media">media</a></li>
      <li><a href="/contacts">contacts</a></li>
    </ul>
  </div>
</div>

<main>
  {@render children()}
</main>

<footer class="footer footer-center p-10 bg-base-100 text-base-content border-t border-primary/10">
  <aside>
    <p class="font-serif italic text-lg text-primary">Bogdan Nesterenko</p>
    <p>© 2026 — Академічний баян</p>
  </aside>
</footer>
