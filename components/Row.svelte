<!-- 

@component

### Row

@props
- `fill` - Make the contents Fill the row
- `center` - Center the row
- `column` - Make the row a column\

 -->

<script lang="ts">
	export let fill = false
	export let center = false
	export let column = false
</script>


<div class="row" 
	class:fill
	class:center
	class:column
	>
    <slot/>
</div>

<style>
.row {
	display: flex;
	flex-direction: row;
	justify-content: start;
	flex-wrap: wrap;
	margin-bottom: 4px;
	gap: 4px;
}
.column {
	flex-direction: column;
}
.center {
	justify-content: center;
}
/* .row :global(div) {
	margin-right: 4px;
	margin-bottom: 4px;
	align-content: space-around;
} */
.row > :last-child {
	margin-right: 0;
}
.row.fill :global(div) {
	flex: 1
} 
</style>