<script>
    import { timeFormat } from "d3-time-format";
    export let xScale;
    export let height;

    let xTicks = xScale.ticks(4);
    let xTicksLabels = xTicks.map(timeFormat("%b %d"));
</script>


<g class="axis x" transform="translate(0 {height})">
    {#each xTicks as tick, i}
        <g class="tick" transform="translate({xScale(tick)} 0)">
            <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
            />
            <text
                  x="0"
                  y="0" 
                  dy="20" 
                  text-anchor="middle"
                  dominant-baseline="middle"
                  >
                {xTicksLabels[i]}
            </text>
        </g>
    {/each}
</g>