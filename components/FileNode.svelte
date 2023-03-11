<script>
  import Icon from './Icon.svelte';
  import { onMount } from 'svelte'
  import util from './mixinPrefs.js'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let item
  export let selectedPath
  export let altType = '_bend'
  $: selected = selectedPath == item.path
  let isOpen
  let open = false
  export let prefsId

  onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'folderNode');
      if (lastState === null) {
        isOpen = open
      } else {
        isOpen = lastState.value;
      }
    } else {
      isOpen = open
    }
  })

  export let select = (path) => {
    dispatch('select', path)
  }
  export let dblClick = (item) => {
    dispatch('dblClick', item.path)
  }

  // folder collapse
  const toggle = () => {
    isOpen = !isOpen
    if (prefsId) {
      util.setPrefsById(prefsId, isOpen, 'folderNode')
      console.log('toggle', prefsId);
    }
  }

</script>

<div>
  {#if item.type == 'folder'}

  <div class="list-item folder" on:click={ toggle }>
    <div class="fold-icon">{ (isOpen) ? '–' : '+' }</div>
    <span>{ item.name }</span>
  </div>

  <div class="indent {isOpen ? '' : 'isClosed'}">
    {#each item.children as child}
    <svelte:self { select } { dblClick } { selectedPath } prefsId={ child.path } item={ child } />
    {/each}
  </div>
  


  {:else}
  <div class="list-item file"
    class:selected
    on:click={ () => select(item.path) }
    on:dblclick={ () => dblClick(item) }
    >
    <div class="file-name">
      {#if item.name.includes(altType)}
      <Icon name="triangle-up" color="#FFBA49" size={ 7 } />
      {:else}
      <Icon name="circle-dot" color="#68B0AB" size={ 7 } />
      {/if}
      <!-- <div class:hide={ !selected }> <Icon name="circle-dot" size={ 7 } color="skyblue"/> </div>
      <div class:hide={ selected }> <Icon name="circle-dot" size={ 7 } /> </div> -->
      <span>
        { item.name.replace(/.ffx/i, '').replace(altType, '') }
      </span>
    </div>

    <div class="apply-style" on:click={ () => dblClick(item) }>
      <Icon name="arrow-right-filled" size={ 7 } />
    </div>
  </div>
  {/if}
</div>

<style>
  :root {
    --gap: 6px
  }
  .list-item {
    padding: 2px 3px 3px 3px;
  }
  .list-item, .file-name {
    display: flex;
    align-items: baseline;
    gap: var(--gap);
    margin-right: 2px;
    /* border-bottom: 1px solid #333; */
    padding-left: 1.5px;
  }
  .list-item.file {
    justify-content: space-between;
  }
  .selected {
    background-color: var(--color-header);
  }
  .isClosed {
    display: none;
  }
  .fold-icon {
    width: 10px;
    /* margin-right: 2px; */
    text-align: center;
    margin-right: -2px;
  }
  .indent {
    margin-left: calc(8px + var(--gap));
  }
  .apply-style {
    float: right;
    display: none;
    /* padding: 2px; */
  }
  .selected .apply-style {
    display: inline;
  }
  .hide {
    display: none;
  }
  /* .apply-style::before {
    content: '▶';
  } */
</style>