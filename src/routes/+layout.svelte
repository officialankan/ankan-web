<script>
	import '../app.postcss';
	import ankan from "$lib/img/ankan.png";
	import githubLogo from '$lib/img/github-mark-white.svg';
	import linkedinLogo from '$lib/img/linkedin.png';

	const currentYear = new Date().getFullYear();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { Avatar, AppShell, AppBar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="pageHeader">
		<AppBar>
			<svelte:fragment slot="lead">
				<Avatar src={ankan} width="w-16 rounded-full" initials="AR" />
				<h2 class="h2 px-5"><strong>hello! i'm ankan!</strong></h2>
			</svelte:fragment>
				
			<svelte:fragment slot="trail">
				<a href="https://www.linkedin.com/in/anders-retzner/" target="_blank"><img src={linkedinLogo} alt="Github logo" class="w-12 link-button"/></a>
				<a href="https://github.com/officialankan" target="_blank"><img src={githubLogo} alt="Github logo" class="w-12 link-button"/></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter"><p>&copy; {currentYear} Anders Retzner</p></svelte:fragment>
</AppShell>

<style>
	.link-button {
		transition: transform 0.3s ease-in-out;
	}
	.link-button:hover {
		transform: scale(1.1);
	}
</style>