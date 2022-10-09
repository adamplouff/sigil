<script>
  import { onMount } from 'svelte'

  $: hover = false


  const handleDragEnter = (e) => {
    hover = true
  }

  const handleDragLeave = (e) => {
    hover = false
  }

  const handleDragDrop = (e) => {
    hover = false
    drop(e)
  }

  const reset = () => {
    // this.isDragging = false;
    // this.isDraggingInWindow = false;
    // this.border = "transparent";
    // this.msg = this.anno;
  }
  function drop (event) {
    event.preventDefault();
    // console.log(event.dataTransfer.getData("Text"));
    // const json = event.dataTransfer.getData("text/plain");
		// const data = JSON.parse(json);

  }

  onMount(() => {
    // dont redirect if file dropped
    // window.addEventListener(
    //   "dragover",
    //   function (e) {
    //     e = e || event;
    //     e.preventDefault();
    //   },
    //   false
    // )
    // window.addEventListener(
    //   "drop",
    //   function (e) {
    //     e = e || event;
    //     e.preventDefault();
    //   },
    //   false
    // )
    // window.addEventListener("drop", (e) => {
    //   e.preventDefault();
    //   drop(e);
    // })
    // window.addEventListener("dragenter", () => {
    //   if (this.fullscreen) {
    //     if (this.debug) console.log("dragover");
    //     this.leaveCount = 0;
    //     if (!this.isDragging) this.enter();
    //   } else {
    //     if (!this.isDraggingInWindow) this.isDraggingInWindow = true;
    //   }
    // })
  })
</script>

<div
  on:dragenter={handleDragEnter} 
	on:dragleave={handleDragLeave}  
	on:drop={handleDragDrop} 
	id="drop_zone" 
  class:hover
	ondragover="return false">
</div>

<style>

#drop_zone {
  width: calc(100vw - 12px);
  height: calc(100vh - 12px);
  position: fixed;
  z-index: 10;
  top: 4px;
  left: 4px;
  pointer-events: none;
}
.hover {
  border: 2px solid var(--color-selection);
}

</style>