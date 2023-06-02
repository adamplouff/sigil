<script>
  export let backgroundColor = ''
  import starlette from "starlette";
  
  if (window.__adobe_cep__) {
      starlette.init()
  } else {
      starlette.initAs('AEFT', 'gradient', 0)
      // starlette.initAs('ILST', 'darkest')
  }

  window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
  },false);
</script>

<div class="panel" style="background-color: {backgroundColor};">
    <slot />
</div>


<style>
:root {
    --quad: cubic-bezier(0.48, 0.04, 0.52, 0.96);
    --quart: cubic-bezier(0.76, 0, 0.24, 1);
    --quint: cubic-bezier(0.84, 0, 0.16, 1);
    --font-size: 10px;
    --highlight-bg: #b4d7fd;
    --highlight-text: #161616;
    background-color: var(--color-bg);
    color: var(--default-color);
    font-family: "Open Sans", sans-serif;
}
.panel {
    height: 100vh;
    background-color: var(--color-bg);
    position: relative;
    box-sizing: border-box;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
    cursor: default;
    font-size: var(--font-size);
}
#app::-webkit-scrollbar {
  display: block;
}
::-webkit-scrollbar {
  background-color: var(--color-scrollbar);
  width: 12px;
}
::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-thumb);
  border-radius: 15px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}
body {
  margin: 0px;
  overflow: hidden;
}

button {
    font-size: inherit;
}

:global(h1) {
  line-height: 1em;
}
:global(h3) {
  margin-bottom: -0.6em;
}
</style>