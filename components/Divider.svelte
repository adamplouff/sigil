<script>
  export let vertical = false
</script>

<div 
  class="divider-line"
	class:vertical
/>

<style>
.divider-line {
	box-sizing: border-box;
	max-width: 100%;
}
.divider-line:not(.vertical) {
	margin: 6px 0px;
}
.divider-line.vertical {
	box-sizing: border-box;
	height: 100%;
	margin-left: 2px;
	margin-right: 6px;
}
.wrapper > .divider-line {
	margin-bottom: 14px;
}
.divider-line:not(.alt) {
	background-color: var(--divider-light);
}
.divider-line.alt {
	background-color: var(--divider-dark);
}
</style>