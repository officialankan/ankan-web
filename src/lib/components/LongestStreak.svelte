<script>
    import { RangeSlider, ProgressRadial } from '@skeletonlabs/skeleton';
    let threshold = 10000;
    export let streak;

    const getStreak = async (threshold) => {
        const url = `https://mongofitness-backend.delightfulsmoke-547405ed.swedencentral.azurecontainerapps.io/api/v1/steps/streak/?threshold=${threshold}`; 
        const res = await fetch(url);
        const data = await res.json();
        streak = data;
    }

    $: {
        streak = getStreak(threshold);
    }
</script>

<RangeSlider name="range-slider" bind:value={threshold} min={10000} max={40000} step={1000} />
<p class="inline">my longest streak with {threshold} steps is: </p>
{#await streak}
    <ProgressRadial width="w-4" class="inline-flex"/>
{:then longestStreak} 
   <p class="inline"><strong>{longestStreak} {longestStreak == 1 ? "day" : "days"}!</strong></p>
{:catch error}
<p>{error.message}</p>
{/await}