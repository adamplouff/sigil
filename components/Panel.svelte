<!--
@component

### Panel

@props
- `backgroundColor` - Background color of the panel
- `padding` - Padding of the panel

-->

<script lang="ts">
  import starlette from "starlette";
  const cep = window.__adobe_cep__


  const checkAeLightMode = () => {
    const hostEnv = (cep) ? JSON.parse(cep.getHostEnvironment()) : null
    if (hostEnv.appSkinInfo.panelBackgroundColor.color.red > 240) {
      starlette.initAs('ILST', 'lightest')
    } else {
      starlette.init()
    }
  }

  if (cep) {
    const hostEnv = (cep) ? JSON.parse(cep.getHostEnvironment()) : null
    const appVersion = hostEnv.appVersion
    checkAeLightMode()

    if (parseInt(appVersion.split('.')[0]) >= 25) {
      cep.addEventListener( "com.adobe.csxs.events.ThemeColorChanged", checkAeLightMode )
    } else {
      starlette.init()
    }
  } else {
      starlette.initAs('AEFT', 'gradient', 0)
      // starlette.initAs('ILST', 'darkest')
  }

  export let backgroundColor = ''
  export let padding = 8

  window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
  },false);
</script>

<div class="panel" style="background-color: { backgroundColor }; padding: { padding }px">
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
/* body {
  margin: 0px;
  overflow: hidden;
}

button {
    font-size: inherit;
} */

:global(h1, h2, h3, h4, h5, h6) {
  text-align: start;
  font-style: normal;
  font-weight: 300;
  margin: 0.8em 0 0.8em 0;
  padding: 0;
  /* text-transform: uppercase; */
  letter-spacing: 0.1ch;
  opacity: 0.75;
}
:global(h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child) {
  margin-top: 0.25em;
}
:global(h1) {
  line-height: 1em;
}
:global(h3) {
  /* margin-bottom: 0.8em; */
}
:global(#tooltip) {
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: left;
}
</style>
