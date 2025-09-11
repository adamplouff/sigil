<!--
@component

### Footer

@props
- `footerMessage` - Message to display
- `timeout` - Timeout in ms
- `color` - Background color of the footer

@example

<Footer footerMessage="A really cool string" />

 -->

<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  export let footerMessage = ''
  export let timeout = 5000
  export let color = 'var(--color-selection)'
  export let lofi = false   // support UXP with no animation
  $: showFooterMessage = false

  let footerText    // local var to store

  let footerTimeout
  $: if (footerMessage) {
    footerText = footerMessage
    clearTimeout(footerTimeout)

    showFooterMessage = false
    setTimeout(() => {
      showFooterMessage = true
    }, 200);


    footerTimeout = setTimeout(() => {
      showFooterMessage = false
    }, timeout);
  }
</script>

<div class="footer-container">
  {#if lofi}
    {#if showFooterMessage}
    <div class="footer" style="background: {color}" >
      {footerText}
    </div>
    {/if}
  {:else}

    {#if showFooterMessage}
    <div class="footer" in:fly="{{ y: 100, duration: 500 }}" out:fade style="background: {color}" >
      {footerText}
    </div>
    {/if}
  {/if}
</div>

<style>
.footer-container {
	width: 100vw;
	z-index: 1;
	position: fixed;
	bottom: 0;
	left: 0;
	overflow: hidden;
}
.footer {
  color: var(--tooltip-color);
	text-align: center;
	padding: 4px 20px;
	line-height: 1.15em;
	/* white-space: pre-wrap; */
	word-wrap: break-word;
	font-family: inherit;
	bottom: 0;
  font-size: 11px;
}
</style>
