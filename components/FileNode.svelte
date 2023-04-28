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
    <div class="fold-icon" class:isOpen>
			<svg width="18" height="18" viewBox="0 0 24 24">
			<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
			<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		</div>
    <!-- <div class="fold-icon">{ (isOpen) ? '–' : '+' }</div> -->
    <div class="item-name">{ item.name }</div>
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
      <div>
        <Icon name="triangle-up" color="#FFBA49" size={ 7 } />
      </div>
      {:else}
      <div>
        <Icon name="circle-dot" color="#68B0AB" size={ 7 } />
      </div>
      {/if}
      <!-- <div class:hide={ !selected }> <Icon name="circle-dot" size={ 7 } color="skyblue"/> </div>
      <div class:hide={ selected }> <Icon name="circle-dot" size={ 7 } /> </div> -->
      <div class="item-name">
        { item.name.replace(altType, '') }
      </div>
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
    /* align-items: baseline; */
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
    /* width: 10px;
    text-align: center;
    margin-left: -4px;
    fill: var(--color-icon);
    transform: rotate(90); */
    /* background-color: seagreen; */
    width: 10px;
    height: 10px;
    margin-right: -1px;

    float: right;
    margin-top: -1px;
    fill: var(--color-icon);
    height: 14px;
    transform-origin: 50% 50%;
    transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-90deg);
  }
  .fold-icon.isOpen {
    transform: rotate(0);
  }
  .fold-icon > svg {
    margin-left: -40%;
    margin-top: -20%;
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
  .file-name:first-child {
    /* margin-top: 3px;
    margin-bottom: -3px; */
  }
  /* .apply-style::before {
    content: '▶';
  } */
</style>