<script>
  export let tooltip = 'fart box'
  export let hover = false
</script>

<div ref="tooltipWrapper" class="button-tooltip-wrapper" >
  <span
  ref="tooltip"
  class="button-tooltip bottom"
  class:hover
  >{ tooltip }</span >
</div>

<style>

/* Tooltips */
.button-tooltip-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    pointer-events: none;
}
.button-tooltip {
    position: absolute;
    width: fit-content;
    height: fit-content;
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    top: 14px;
    opacity: 0;
}
.button-tooltip.hover {
    transition: all 160ms var(--quint) 0.4s;
    opacity: 1;
    top: 16px;
}
</style>