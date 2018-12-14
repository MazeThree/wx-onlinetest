<template>
	<section>
		<h3>当前管理员：{{sysUserName}}</h3>
	</section>
</template>

<script>
	export default {
		data(){
			return {
				sysUserName:''
			}
		},
		mounted(){
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user || '';
				
			}
		}
	}
</script>

<style scoped>

</style>