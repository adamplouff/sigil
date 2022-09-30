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

  let updateAvailable = false
  let expanded = false

  let details = ''
  let downloadURL = ''

  onMount(() => {
    versionCheck()

    setTimeout(() => {
      updateAvailable = true
    }, 1000);
  })

  //// update check
  let updateData = {}
  const versionCheck = () => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateData = data?.[`${name}`]
      console.log(updateData)
      const availableVersion = updateData?.version

      if (versionCompare(availableVersion, version) > 0) {
        updateAvailable = true
        details = updateData.details
        downloadURL = updateData.downloadURL
      }
    })
  }

  const versionCompare = (a: string, b: string) => {
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

<div class="update" 
  class:updateAvailable
  class:expanded>
  <div class="click" on:click={() => expanded = !expanded}>{ (expanded) ? 'x': '↓'}</div>
  <div>
    {#if expanded}
      <div in:fade class="details">
        {@html details}
        <Button on:click={() => openLinkInBrowser(downloadURL)}>Download</Button>
      </div>
    {/if}
  </div>
</div>

<style>
.update {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 10;
  top: 0;
  right: 0;
  background-color: var(--color-selection);
  width: 0;
  height: 0;
  /* padding: 0; */
  transition: all 0.25s cubic-bezier(.2,.07,.62,1);
  overflow: hidden;
  padding: 8px;
}
.updateAvailable {
  width: 10px;
  height: 10px;
}
.expanded {
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
}
.click {
  /* background-color: brown; */
  display: flex;
  justify-content: right;
  margin-bottom: -24px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 8px;
}
.details {
  width: 100%;
  /* width: calc(100vw - 58px); */
}

</style>