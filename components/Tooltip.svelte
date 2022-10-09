<script>
  import { fade } from 'svelte/transition';

  export let tooltip = 'fart box'
  export let hover = true

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
    };
</script>


{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ y: 8, duration: 80, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if}

<style>

#tooltip {
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
}
</style>