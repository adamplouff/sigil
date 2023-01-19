<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from 'svelte/transition';
  import Button from "./Button.svelte";

  import {
    openLinkInBrowser,
  } from "../lib/utils";

  export let version = '1.0.0'
  export let name = ''
  export let url = 'https://battleaxe.dev/iteration/'
  export let color = 'var(--color-selection)'
  export let locale = 'en'

  let updateAvailable = false
  let newVersion = '0'
  let expanded = false

  let details = 'Update data unavailable'
  let downloadURL = 'https://battleaxe.co'

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
        downloadURL = updateData.downloadURL
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
    <div>{ (expanded) ? 'x': '↓'}</div>
  </div>
  <div class="detail-page" class:expanded style="background: {color}">
    <div style="width: calc(100% - 32px)">
      <Button on:click={() => openLinkInBrowser(downloadURL)}>Download {newVersion}</Button>
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
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: right;
  margin-bottom: -24px;
  position: fixed;
  right: 0;
  z-index: 1;
  top: calc(100vh - 36px);
  pointer-events: all;
}
.tab > * {
  font-size: 12px;
  padding: 8px;
  width: 100%;
  margin-top: 8px;
  text-align: right;
}
.expanded.tab > * {
  font-size: 12px;
  padding: 8px;
  width: 100%;
  margin-top: -2px;
  text-align: right;
}
.expanded.tab {
  top: 16px;
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

</style>