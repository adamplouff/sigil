<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from 'svelte/transition';
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";

  import {
    openLinkInBrowser,
  } from "../lib/utils";
    import Icon from "./Icon.svelte";

  export let version = '1.0.0'
  export let name = ''
  export let key = ''
  export let url = 'https://battleaxe.dev/iteration/'
  export let color = '#298EE0'
  export let locale = 'en'

  let updateAvailable = false
  let newVersion = '0'
  let expanded = false

  let details = 'Update data unavailable'
  let downloadURL = `https://battleaxe.co/`

  onMount(() => {
    if (navigator.onLine)
      setTimeout(() => {
        versionCheck()
      }, 1000)
  })

  //// update check
  let updateData = {}
  const versionCheck = () => {        
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // updateData = data?.[`${ name.toLowerCase() }`]
      updateData = getParameterCaseInsensitive(data, name)
      console.log('updateData', updateData)
      const availableVersion = updateData?.version

      if (versionCompare(availableVersion, version) > 0) {
        updateAvailable = true
        details = updateData[locale] || updateData.en
        downloadURL = `https://license.battleaxe.co/download?product=${ name }&key=${ key }`
        newVersion = availableVersion
      }
    })
  }

  const getParameterCaseInsensitive = (object, key) => {
    const asLowerCase = key.toLowerCase()
    return object[Object.keys(object).find(k => k.toLocaleLowerCase() == asLowerCase)]
  }

  const versionCompare = (a: string, b: string) => {
    console.log(`a: ${a}\nb: ${b}`);
    
    if (a === b) {
      return 0;
    }

    let a_components = a.split('.');
    let b_components = b.split('.');

    let len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (let i = 0; i < len; i++) {
      // A bigger than B
      if (parseInt(a_components[i]) > parseInt(b_components[i])) {
        return 1;
      }

      // B bigger than A
      if (parseInt(a_components[i]) < parseInt(b_components[i])) {
        return -1;
      }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
      return 1;
    }

    if (a_components.length < b_components.length) {
      return -1;
    }

    // Otherwise they are the same.
    return 0;
  }
</script>

<div class="update" class:updateAvailable>
  <div class="update-scrim" class:expanded on:click={() => expanded = false}/>
  <div class="tab" class:expanded on:click={() => expanded = !expanded}
    style="background: linear-gradient(to bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, {color} 50%, {color} 100%)">
    <div>
      {#if expanded}
      <Icon name="close" size={ 14 } />
      {:else}
      <Icon name="arrow-down" size={ 14 } />
      {/if}
    </div>
  </div>
  <div class="detail-page" class:expanded style="background: {color}">
    <div style="width: calc(100% - 48px);">
      <Button label={ `Download ${ newVersion }` } on:click={() => openLinkInBrowser(downloadURL)} />
    </div>
    <div class="details">
      {@html details}
    </div>
  </div>
</div>

<style>
/* .update-scrim {
  transition: all 0.25s cubic-bezier(.2,.07,.62,1);
} */

* {
  transition: all 0.2s cubic-bezier(.2,.07,.62,1);
}
.update {
  /* display: flex; */
  position: absolute;
  flex-direction: column;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  pointer-events: none;
  display: none;
  font-size: 11px;
  line-height: 1.6em;
}
.updateAvailable {
  display: block;
}
.update-scrim {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.update-scrim.expanded {
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: all;
}
.tab {
  width: 58px;
  height: 58px;
  display: flex;
  justify-content: right;
  margin-bottom: -24px;
  position: fixed;
  right: 0;
  z-index: 1;
  top: calc(100vh - 58px);
  /* top: 0; */
  pointer-events: all;
}
.tab > * {
  font-size: 12px;
  padding: 12px;
  width: 100%;
  margin-top: 20px;
  text-align: right;
}
.expanded.tab > * {
  font-size: 12px;
  padding: 12px;
  width: 100%;
  margin-top: 16px;
  text-align: right;
}
.expanded.tab {
  top: 12px;
  background: none !important;
}
.detail-page {
  position: fixed;
  top: 100vh;
  height: calc(100vh - 48px);
  width: calc(100vw - 16px);
  /* background-color: color; */
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 16px;
  overflow-y: scroll;
  pointer-events: all;
  text-align: left;
}
.expanded.detail-page {
  top: 16px;
}
.details {
  overflow-y: auto;
  padding-bottom: 16px;
  /* display: none; */
}
.details::-webkit-scrollbar {
  display: block;
  background-color: rgba(0,0,0,0.1);
  width: 10px;
}
.details::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.35);
  border-radius: 15px;
}
.details::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.4)5;
}
:global(ul), :global(ol) {
  padding-inline-start: 16px;
}
:global(code) {
  background: rgba(80, 80, 80, 0.2);
}
:global(hr) {
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

</style>