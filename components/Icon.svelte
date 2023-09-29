<!-- 
@component

### Icon

@props

- `name` - Name of the icon
- `title` - Title of the icon
- `color` - Color of the icon
- `size` - Size of the icon
- `disableFill` - Disable the fill of the icon
- `removeInitialStyle` - Remove the initial style of the icon
- `style` - CSS style of the icon
 -->

<script>
  import Icomoon from "svelte-icomoon";

  import iconSet from "../assets/huntress/selection.json";

  export let name;
  export let title = null;
  export let color = null;
  export let size = 16;
  export let disableFill = false;
  export let removeInitialStyle = false;
  export const style = {};

  const props = { name, title, color, size, disableFill, removeInitialStyle };
</script>

<Icomoon {...props} iconSet="{iconSet}" />