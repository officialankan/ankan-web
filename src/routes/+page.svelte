<script>
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import BarChart from '$lib/components/BarChart.svelte';
    import diesel from '$lib/img/diesel.png';
    import LongestStreak from '$lib/components/LongestStreak.svelte';
    export let data;

    let width = 400;

</script>


<div class="text-center py-2">
    <h1 class="h1">i like to <span class="text-secondary-500"><strong>stay active!</strong></span></h1>
</div>

<h4 class="h4 text-center">
    here's a bar chart of my daily steps
</h4>
<div class="py-5">
    {#await data.streamed.dailySteps}
        <div class="px-8 text-center">
            <ProgressBar class="rounded-md" />
            <p>if this takes more than 10s, try refreshing again. this is me being cheap and deploying to free tiers...</p>
        </div>
    {:then data}
        <div class="chart-container" role="img" bind:clientWidth={width}>
            <BarChart {width} {data}/>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>

<div class="grid grid-rows-2 px-12 py-5 text-center">
    <div>
        <h4 class="h4">check out my streaks by adjusting the slider!</h4>
    </div>
    <div>
        {#await data.streamed.longestStreak}
            <div class="px-8 text-center">
                <ProgressBar class="rounded-md" />
                <p>if this takes more than 10s, try refreshing again. this is me being cheap and deploying to free tiers...</p>
            </div>
        {:then streak}
            <LongestStreak {streak} />
        {:catch error}
            <p>{error.message}</p>
        {/await}
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
