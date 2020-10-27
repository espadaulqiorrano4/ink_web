<template>
<div>
  {{$auth.user}}
</div>
</template>

<script>
export default {
middleware: 'auth'
}
</script>

<style>

</style>
