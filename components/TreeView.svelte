<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let list

  let selectedStyle = ''

  const doubleClick = (text) => {
    dispatch('doubleClick', {
      text
    })
  }
</script>

<ul class="style-list" style="text-align: left;">
  <li>Default</li>
  <ul>
    {#each list.default as style}
      <li 
        on:click={() => selectedStyle = style} 
        on:dblclick={doubleClick(style)}
        class:selected="{selectedStyle == style}">
        {style}
      </li>
    {/each}
  </ul>
</ul>

<style>
  .selected {
    background-color: var(--color-btn-icon-active-border);
  }
  li {
    padding: 2px;
  }
</style>