<template>
	<div>
		<div class="header">
			<span class="header-name">
				{{ headerTitle }}
			</span>
		</div>
		<div class="ingredients-list">
			<div
				class="checkbox"
				v-for="ingredient in recipe.extendedIngredients"
				v-bind:key="ingredient.id"
			>
				<p class="checkbox-p">
					<input type="checkbox" class="checkbox-input" />
					<span class="checkbox-label">
						{{ ingredient.original }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		recipe: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			headerTitle: "Ingredients",
		};
	},
};
</script>

<style scoped>
.header {
	border-bottom: 1.5px solid rgb(236, 236, 236);
	width: 95%;
	margin: auto;
	text-align: left;
}
.header-name {
	color: #333333;
	font-size: 26px;
	padding: 5px;
}
.ingredients-list {
	text-align: left;
	padding: 20px 50px 20px 50px;
	font-size: 14px;
}
.checkbox-input {
	width: 30px;
	height: 30px;
	vertical-align: middle;
}
.checkbox-label {
	display: block;
	margin-top: -30px;
	margin-left: 50px;
}

.checkbox-input:checked + .checkbox-label {
	text-decoration: line-through;
	color: #c4c4c4;
}
</style>