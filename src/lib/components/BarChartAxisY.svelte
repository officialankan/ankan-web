<script>
    import { fade } from "svelte/transition";
    export let yScale;
    export let width;

    let ticks = yScale.ticks(3);
</script>

<g class="axis-y" transition:fade={{ duration: 300 }}>
{#each ticks as tick, i}
    <g transform="translate(0, {yScale(tick)})">
        <line
            x1="0" 
            y1="0" 
            x2={width} 
            y2="0"
        />
        <text x="0" y="0" dy="-6" text-anchor="center">
            {tick.toLocaleString()}
        </text>
    </g>
{/each}
</g>
