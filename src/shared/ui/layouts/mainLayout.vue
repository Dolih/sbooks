<template>
	<v-layout class="rounded rounded-md" ref="app">
		<slot name="header"></slot>

		<v-main
		>
			<RouterView v-slot="{Component}">
				<Transition name="fade" mode="out-in">
					<component :is="Component"/>
				</Transition>
			</RouterView>
		</v-main>
	</v-layout>
</template>
<style lang="scss" scoped>
  	.fade-enter-active,
	.fade-leave-active {
	transition: opacity 0.3s ease-in-out;
	}

	.fade-enter-from,
	.fade-leave-to {
	opacity: 0;
	}
</style>