<template>
	<div>
		<template v-if="grade==0">游客-未知访客</template>
		<template v-if="grade==1">会员</template>
		<template v-if="grade==2">农民</template>
		<template v-if="grade==3">地主</template>
		<template v-if="grade==4">知县</template>
		<template v-if="grade==5">通判</template>
		<template v-if="grade==6">知府</template>
    <template v-if="grade==7">总督</template>
		<template v-if="grade==8">巡抚</template>
		<template v-if="grade==9">丞相</template>
		<template v-if="grade==10">帝王</template>
     <template v-if="grade=='customer'">帝王</template>
	</div>
</template>
<script>
	export default {
        props: ['grade'],
        methods:{


        }
    }
</script>
