<template>
	<transition name="moveHeight">
		<div v-show="isShow" class="openError"><slot></slot></div>
	</transition>
</template>
<script>
	export default {
		name:"openError",
		props:['isShow'],
		watch:{

		},
		methods:{

		}
	}
</script>