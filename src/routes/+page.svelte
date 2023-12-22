<script>
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import BarChart from '$lib/components/BarChart.svelte';
    import diesel from '$lib/img/diesel.png';
    import LongestStreak from '$lib/components/LongestStreak.svelte';
    export let data;

    let width = 400;

</script>


<div class="text-center py-2">
    <h2 class="h2">i like to <span class="text-secondary-500"><strong>stay active!</strong></span></h2>
</div>
{#await data.streamed.dailySteps}
    <ProgressBar class="rounded-md" />
{:then data}
    <div class="chart-container" role="img" bind:clientWidth={width}>
        <BarChart {width} {data}/>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}

<div class="grid grid-cols-2 gap-4">
    <div class="px-2 text-center">
        <h4 class="h4">check out my streaks by adjusting the slider!</h4>
    </div>
    <div class="px-2">
        <LongestStreak />
    </div>
</div>

<div class="text-center">
    <p>key to success is this guy &rarr;<img src={diesel} alt="diesel" class="w-32 rounded-full inline rotate-on-hover" /></p>
</div>

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