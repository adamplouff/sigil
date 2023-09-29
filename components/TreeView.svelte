<script lang="ts">
  import FileNode from './FileNode.svelte';
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let list
// console.log('TreeView', list);
  let selectedPath = ''

  const dblClick = (path) => {
    // console.log('path', path.detail);
    // console.log('path replace', path.detail.replace(/\\/g, '\\'));
    dispatch('dblClick', path.detail.replace(/\\/g, '\\\\'))
  } 
  
</script>


<div class="style-list">
  <!-- {selectedPath} -->
  {#each list as style}
  <FileNode 
    item={ style } 
    { selectedPath }
    prefsId={ style.path }
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
