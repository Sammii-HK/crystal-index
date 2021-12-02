<template>
	<div class="container">
		<div class="columns is-multiline is-mobile">
			<div
				v-for="(image, index) in images"
				:key="`imageId-${image.id}-image-gallery-${index}`"
				class="column is-4"
			>
				<c-rollover-image :imageItem="image" @click="selectItem" />
			</div>
		</div>
	</div>
</template>

<script>
import CRolloverImage from "../Molecules/CRolloverImage";

export default {
	name: "c-image-gallery",
	props: {
		images: {
			type: Array,
			required: true,
		},
	},
	components: {
		CRolloverImage,
	},
	methods: {
		selectItem(id) {
			this.$router.push(`/crystals/${id}`);
		},
	},
};
</script>

<style></style>
