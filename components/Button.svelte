<script>
    import { fade } from 'svelte/transition';

    export let uppercase = false
    export let block = false
    export let tall = false
    export let left = false
    export let right = false
    export let primary = false
    export let flat = false
    export let filled = false
    export let disabled = false
    export let toolbar = false
    export let bg = ''
    export let color = ''
    export let label = ''
    export let tooltip = ''
    let colorHover = (bg !== '')

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

<div 
    class="button" 
    on:click 
    class:uppercase
    class:block
    class:tall 
    class:left
    class:right
    class:primary
    class:flat
    class:filled
    class:disabled
    class:colorHover
    class:toolbar
    style={`background-color: ${bg}; color: ${color}`}
    on:mouseenter={() => hover = true}
    on:mouseleave={() => hover = false}
    use:popperRef
>

    {label}
    <slot />
</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if}



<style>
.button {
    position: relative;
    background: var(--button);
    color: var(--button-color);
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: inherit;
    padding: 4px 6px;
    border-radius: 2px;
    height: 24px;
    white-space: nowrap;
}
.button:hover {
    background: var(--button-hover);
}
.uppercase {
    text-transform: uppercase;
}
.block {
    width: 100%;
    margin-right: 0;
}
.tall {
    height: 26px;
}
.left {
    justify-content: flex-start;
}
.right {
    justify-content: flex-end;
}
.primary {
    background: rgba(160, 160, 160, 0.3);
    border-color: var(--button-primary-border);
}
.flat,
.toolbar {
    background: transparent;
}
.flat:hover,
.toolbar:hover {
    background: var(--button-flat-hover);
    border-color: var(--button-flat-hover-border);
}
.colorHover {
    opacity: 0.95;
}
.colorHover:hover {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.25);
}
.flat:active,
.toolbar:active {
    background: var(--button-flat-active);
    border-color: var(--button-flat-active-border);
}
.filled {
    background: var(--button-filled);
}
.filled:hover {
    background: var(--button-filled);
    border-color: var(--button-filled-hover-border);
}
.filled:active,
.filled.active {
    color: var(--color-bg);
    background: var(--button-filled-active);
}
.button.toolbar {
    width: 34px;
    height: 34px;
    margin: 0;
}
.button :global(*) {
    margin-bottom: 0 !important;
}
.button.toolbar :global(svg) {
    margin: auto;
    min-width: 22px;
    width: 22px;
    height: 22px;
}
.button:not(.custom) :global(svg) {
    min-width: 16px;
    width: 16px;
    height: 16px;
    margin-top: -1px;
    margin-bottom: -1px !important;
    fill: var(--color-icon);
}
.button.custom :global(svg) {
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-top: -1px;
    margin-bottom: -1px;
}
.disabled {
    opacity: 0.4;
    pointer-events: none;
}

#tooltip {
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
}

</style>