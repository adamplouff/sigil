<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition';
  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  export let show = true
  
  export let label = ``
  export let confirm = null
  export let delay = 0

  let confirmText = {
    cancel: confirm?.cancel || 'Cancel',
    confirm: confirm?.confirm || 'OK'
  }

  const closeModal = () => {
    dispatch('close')
  }
  const confirmModal = () => {
    dispatch('confirm')
  }
</script>


{#if show}
<div class="overlay" in:fade={{duration:120}} out:fade={{duration:80}}>
  <div class="scrim" on:click={ closeModal } />
  <div class="modal">

    {#if label} 
      <div class="message">{ label }</div>
    {/if}

    <div class="slot">
      <slot />
    </div>
    
    {#if confirm}
    <div class="buttons">
      <Button block label={ confirmText.cancel } on:click={ closeModal } />
      <Button block primary label={ confirmText.confirm } on:click={ confirmModal } />
    </div>
    {:else}
    <div class="buttons">
      <Button block label={ confirmText.cancel } on:click={ closeModal } />
      <Button block primary label={ confirmText.confirm } on:click={ confirmModal } />
    </div>
    {/if}

  </div>
</div>
{/if}

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  text-align: left;
}
.scrim {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
.modal {
  width: calc(100% - 70px);
  max-width: 300px;
  position: absolute;
  top: 45%;
  left: 50%;
  background: var(--color-bg);
  border: 1px solid var(--color-dropdown-hover);
  border-radius: 4px;
  padding: 16px;
  transform: translate(-50%, -50%);
}
.message {
  margin-bottom: 16px;
}
.buttons {
  display: flex;
  gap: 4px;
  /* min-width: 50%; */
}
.slot {
  /* margin-top: 16px; */
}
.slot:empty {
  margin-top: 0;
}
@media (max-width: 230px) {
  :global(.row) {
    /* flex-direction: column !important; */
  }
  .buttons {
    flex-wrap: wrap;
  }
}
</style>