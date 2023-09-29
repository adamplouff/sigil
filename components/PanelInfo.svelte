<!-- 
@component

### Panel-Info

@props
- `name` - Name of the panel
- `version` - Version number of the panel
- `author` - Author of the panel
- `releaseYear` - First year of release

 -->

<script lang="ts">
  export let name = 'Fart basket'
  export let version = '1.0.0'
  export let author = 'Battle Axe Inc'
  export let releaseYear = ''

  const calcYears = (year) => {
    const currentYear = new Date().getFullYear().toString()
      if (!year) { return currentYear }

      let ccYear = year
      if (year < currentYear) {
          ccYear += `-${currentYear}`
      }

      return ccYear
  }
  
  let ccYear = calcYears(releaseYear)

</script>

<div class="panel-info">
  <p> 
    {#if name}
    {name}
    {/if}
    
    {#if name && version}
    - 
    {/if}
    {#if version}
    {version}
    {/if}
  </p>
  <p>© {ccYear} {author}</p>
</div>

<style>
.panel-info {
  text-align: left;
  margin-top: 16px;
}
.panel-info > p {
  margin: 3px 0;
}
</style>