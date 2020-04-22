<template>
	<div>
		<div class="header">
			<span class="header-name">
				{{ headerTitle }}
			</span>
		</div>
		<div class="time-info">
			<div class="time-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="info-icon"
				>
					<path
						d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
					/>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
				</svg>
			</div>
			<div class="nowrap">
				<div class="preparation-time">
					<p><span class="time-info-header">Prep</span></p>
					<p>
						<span class="time-info-value"
							>{{ getPreparationTime() }} min</span
						>
					</p>
				</div>
				<div class="cooking-time">
					<p><span class="time-info-header">Cook</span></p>
					<p>
						<span class="time-info-value"
							>{{ getCookingTime() }} min</span
						>
					</p>
				</div>
				<div class="ready-time">
					<p><span class="time-info-header">Ready in</span></p>
					<p>
						<span class="time-info-value"
							>{{ getReadyTime() }} min</span
						>
					</p>
				</div>
			</div>
		</div>
		<div class="directions">
			<div
				v-if="getAnalyzedInstructions().length == 0"
				class="summary-div"
			>
				<span class="summary" v-html="getSummary()"></span>
			</div>
			<div
				v-else
				class="steps-list"
				v-for="step in getAnalyzedInstructions()[0].steps"
				v-bind:key="step.number"
			>
				<p>
					<input type="checkbox" class="checkbox-input" />

					<span class="checkbox-label"
						><span class="step-number">{{ step.number }}. </span
						>{{ step.step }}</span
					>
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
			headerTitle: "Directions",
		};
	},
	methods: {
		getPreparationTime: function() {
			let value = " ";
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.preparationMinutes || " ";
			}
			return value;
		},
		getCookingTime: function() {
			let value = " ";
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.cookingMinutes || " ";
			}
			return value;
		},
		getReadyTime: function() {
			let value = " ";
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.readyInMinutes || " ";
			}
			return value;
		},
		getSummary: function() {
			let value = " ";
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.summary;
			}
			return value;
		},
		getAnalyzedInstructions: function() {
			let value = [];
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.analyzedInstructions;
			}
			return value;
		},
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
.info-icon {
	fill: #555555;
	height: 40px;
	width: 40px;
	vertical-align: middle;
}

svg {
	filter: drop-shadow(3px 3px 5px #b1b1b1);
}

.time-info {
	padding: 0 15px 0 15px;
	text-align: left;
	margin-top: 10px;
	margin-bottom: 10px;
}
.time-icon {
	display: inline-block;
	padding: 0 10px 0 20px;
	vertical-align: middle;
}

.nowrap {
	display: inline-block;
	flex-wrap: nowrap;
}
.preparation-time,
.cooking-time,
.ready-time {
	display: inline-block;
	padding: 0 20px 0 20px;
	vertical-align: middle;
	text-align: center;
	font-size: 14px;
}
.time-info p {
	line-height: 10px;
}

.cooking-time {
	border-left: 1.5px solid rgb(236, 236, 236);
	border-right: 1.5px solid rgb(236, 236, 236);
}

.time-info-header {
	color: #7f7f7f;
}
.time-info-value {
	color: #333333;
}

.steps-list {
	text-align: left;
	padding: 5px 50px 5px 50px;
	font-size: 16px;
}
.checkbox-input {
	width: 20px;
	height: 20px;
	vertical-align: middle;
}
.checkbox-label {
	display: block;
	margin-top: -27px;
	margin-left: 50px;
}

.step-number {
	font-size: 25px;
	vertical-align: middle;
}
.checkbox-input:checked + .checkbox-label {
	color: #c4c4c4;
}

.summary-div {
	margin: 50px;
	text-align: left;
	font-size: 16px;
}

.summary >>> a {
	cursor: default;
	pointer-events: none;
	text-decoration: none;
	color: #333333;
}
</style>