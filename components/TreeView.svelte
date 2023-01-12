<script>
  import FileNode from './FileNode.svelte';
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let list

  let selectedPath = ''

  const dblClick = (path) => {
    dispatch('dblClick', path.detail)
  } 
  
</script>


<div class="style-list">
  <!-- {selectedPath} -->
  {#each list as style}
  <FileNode 
    item={ style } 
    { selectedPath }
    on:select={ (path) => selectedPath = path.detail }
    on:dblClick={ (path) => dblClick(path) }
  />
  {/each}
</div>


<style>
  .style-list {
    text-align: left;
    height: 140px;
    overflow-y: auto;
    background-color: rgba(0,0,0, 0.1);
  }
  .style-list::-webkit-scrollbar {
    display: block;
  }
  ::-webkit-scrollbar {
    background-color: var(--color-scrollbar);
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-scrollbar-thumb);
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-scrollbar-thumb-hover);
  }
</style>