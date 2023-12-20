<script>
    import BarChart from '$lib/components/BarChart.svelte';
    import diesel from '$lib/img/diesel.png';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import LongestStreak from '$lib/components/LongestStreak.svelte';

    export let data;
    let width = 400;

</script>

<!-- BarChart -->
{#await data.streamed.dailySteps}
    <div class="text-center py-2 px-5">
        <h2 class="h2 text-center py-4">Spinning up a free tier deployment...</h2>
        <ProgressBar rounded="rounded-md" />
        <p class="text-center py-4">If this takes more than 10s, my free tier will timeout but the backend will continue to spin up. <strong>Try refreshing!</strong>></p>
    </div>
{:then dailySteps} 
    <div class="text-center py-2">
        <h2 class="h2">i like to <span class="text-secondary-500"><strong>stay active!</strong></span></h2>
    </div>
    <div class="chart-container" role="img" bind:clientWidth={width}>
        <BarChart {width} data={dailySteps} />
    </div>
    <div class="text-center">
        <p>key to success is this guy &rarr;<img src={diesel} alt="diesel" class="w-32 rounded-full inline rotate-on-hover" /></p>
    </div>
{:catch error}
<div class="px-5 py-5">
    <aside class="alert variant-filled-error">
        <!-- Icon -->
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <!-- Message -->
        <div class="alert-message">
            <h3 class="h3">Oops! Daily steps data can't be fetched.</h3>
            <strong><pre>{error.message}</pre></strong>
            <p>Let Anders know something is wrong! Maybe his free tier deployment finally collapsed.</p>
        </div>
    </aside>
</div>
{/await}

<!-- Longest Streak -->
<LongestStreak /> 

<style>
    .chart-container {
        position: relative;
    }
    .rotate-on-hover {
        transition: transform 0.5s ease-in-out;
    }

    .rotate-on-hover:hover {
        transform: rotate(360deg);
    }
</style>