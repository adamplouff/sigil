<script>
    import { fade } from 'svelte/transition';

    export let color = ''
    export let label = ''
    export let tooltip = ''

    $: hover = false

    import { createPopperActions } from 'svelte-popperjs';
    const [popperRef, popperContent] = createPopperActions({
        placement: 'bottom',
        strategy: 'fixed',
        applyStyles: true,
    });
    const extraOpts = {
        modifiers: [
            { name: 
                'offset', 
                options: { 
                    offset: [0, 4] ,
                } 
            }
        ],
    }

</script>

<div class="container" 
    on:mouseenter={() => hover = true}
    on:mouseleave={() => hover = false}
>
    <div class="swatch">
        <div class="swatch-color" 
        style="background: {color}"/>
    </div>
    <span class="label">
        {label}
    </span>
</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if}



<style>
.container {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 6px;
    position: relative;
}
.swatch {
    width: 22px;
    height: 18px;
    border: 1px solid var(--color-btn-border);
}
.swatch-color {
    /* background: skyblue; */
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 1px;
}
#tooltip {
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    position: absolute;
    margin-top: 24px;
}

</style>