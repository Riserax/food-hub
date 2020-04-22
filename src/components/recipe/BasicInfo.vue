<template>
	<div>
		<div class="header">
			<div class="recipe-name-div">
				<span class="recipe-name">{{ recipe.title }}</span>
			</div>
			<div class="recipe-info">
				<div class="calories">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="info-icon"
					>
						<path
							d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
						/>
						<path d="M0 0h24v24H0z" fill="none" />
					</svg>
					{{ calories }} cals
				</div>
				<div class="servings">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="info-icon"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"
						/>
					</svg>
					{{ recipe.servings }} servings
				</div>

				<div class="preparation-time">
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
					{{ recipe.readyInMinutes }} mins
				</div>
			</div>
		</div>
		<div class="container">
			<div class="gallery">
				<img class="recipe-image" :src="recipe.image" />
			</div>
			<div class="action-bar-div">
				<div class="action-bar">
					<div class="favourite-icon" @click="addToFavourites">
						<svg
							class="clickable-svg"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="#D9001B"
							width="36px"
							height="36px"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
							/>
						</svg>
					</div>
					<div class="printer-icon" @click="printRecipe">
						<svg
							class="clickable-svg"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="#555555"
							width="36px"
							height="36px"
						>
							<path
								d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
							/>
							<path d="M0 0h24v24H0z" fill="none" />
						</svg>
					</div>
					<div class="share-icon" @click="shareRecipe">
						<svg
							class="clickable-svg"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="#555555"
							width="36px"
							height="36px"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
							/>
						</svg>
					</div>
					<div id="snackbar">Link copied to clipboard</div>
					<div class="facebook-icon">
						<a :href="facebookLink" target="_blank"
							><svg
								class="clickable-svg"
								xmlns:dc="http://purl.org/dc/elements/1.1/"
								xmlns:cc="http://creativecommons.org/ns#"
								xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
								xmlns:svg="http://www.w3.org/2000/svg"
								xmlns="http://www.w3.org/2000/svg"
								version="1.1"
								id="svg4730"
								viewBox="0 0 300 300.00223"
								height="36"
								width="36"
							>
								<g
									transform="translate(-33.466291,-429.48076)"
									id="layer1"
								>
									<g
										transform="matrix(1.1165523,0,0,-1.1165523,-103.48743,863.08638)"
										id="g4670"
									>
										<g
											id="g4672"
											clip-path="url(#clipPath4674)"
										>
											<g
												id="g4678"
												transform="translate(375.7163,120.5527)"
											>
												<path
													d="m 0,0 c 8.134,0 14.73,6.596 14.73,14.73 l 0,237.434 c 0,8.137 -6.596,14.731 -14.73,14.731 l -237.433,0 c -8.137,0 -14.73,-6.594 -14.73,-14.731 l 0,-237.434 c 0,-8.134 6.593,-14.73 14.73,-14.73 L 0,0 Z"
													style="fill:#3b5998;fill-opacity:1;fill-rule:nonzero;stroke:none"
													id="path4680"
												/>
											</g>
											<g
												id="g4682"
												transform="translate(307.7046,120.5527)"
											>
												<path
													d="m 0,0 0,103.355 34.693,0 5.194,40.28 -39.887,0 0,25.717 c 0,11.662 3.238,19.609 19.962,19.609 l 21.33,0.01 0,36.026 c -3.69,0.49 -16.351,1.587 -31.081,1.587 -30.753,0 -51.806,-18.771 -51.806,-53.244 l 0,-29.705 -34.781,0 0,-40.28 34.781,0 L -41.595,0 0,0 Z"
													style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
													id="path4684"
												/>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</a>
					</div>
					<div class="pinterest-icon">
						<a :href="pinterestLink" target="_blank">
							<svg
								class="clickable-svg"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 333333 333333"
								shape-rendering="geometricPrecision"
								text-rendering="geometricPrecision"
								image-rendering="optimizeQuality"
								fill-rule="evenodd"
								clip-rule="evenodd"
								height="36"
								width="36"
							>
								<path
									d="M302077 0H31255C14069 0 1 14068 1 31256v270822c0 17186 14068 31254 31254 31254h270822c17186 0 31254-14068 31254-31254l2-270824C333333 14068 319265 0 302079 0h-2zM116280 282807c12893-11499 21743-27876 26064-44672 1743-6620 8851-33730 8851-33730 4600 8851 18190 16308 32476 16308 42791 0 73594-39306 73594-88300 0-46902-38261-81957-87463-81957-61259 0-93735 41119-93735 85860 0 20768 11081 46693 28783 54917 2648 1324 4111 697 4739-1951 418-2021 2857-11569 3972-16099 348-1394 209-2718-976-4111-5854-7109-10593-20210-10593-32337 0-31291 23695-61607 64047-61607 34846 0 59238 23695 59238 57705 0 38400-19374 65023-44603 65023-13939 0-24393-11500-20977-25646 4042-16865 11778-35056 11778-47182 0-10872-5784-19931-17981-19931-14287 0-25646 14705-25646 34498 0 12544 4182 21047 4182 21047s-14078 59447-16656 70528c-2857 12266-1743 29480-488 40700l1254 11011 140-70z"
									fill="#bd081c"
								/>
							</svg>
						</a>
					</div>
				</div>
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
	computed: {
		calories() {
			let value = "";
			if (Object.keys(this.recipe).length > 0) {
				value = this.recipe.nutrition.nutrients[0].amount.toFixed(0);
			}
			return value;
		},
		facebookLink() {
			return (
				"https://www.facebook.com/sharer/sharer.php?u=" +
				window.location.href
			);
		},
		pinterestLink() {
			return (
				"http://pinterest.com/pin/create/button/?url=" +
				window.location.href +
				"&media=" +
				this.recipe.image
			);
		},
	},
	methods: {
		addToFavourites() {
			//TODO addToFavourites(this.recipe.id);
		},
		printRecipe() {
			window.print();
		},
		shareRecipe() {
			const input = document.createElement("input");
			input.setAttribute("value", window.location.href);
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);
			const snackbar = document.getElementById("snackbar");
			snackbar.className = "show";
			setTimeout(function() {
				snackbar.className = snackbar.className.replace("show", "");
			}, 3000);
		},
	},
};
</script>
<style scoped>
.container {
	margin: 20px;
}

.recipe-image {
	object-fit: cover;
	border-radius: 15px;
	box-shadow: 3px 3px 10px rgb(236, 236, 236);
	max-width: 100%;
	height: auto;
}

.gallery {
	width: 70%;
	display: inline-block;
	vertical-align: middle;
}

.action-bar-div {
	width: 20%;
	display: inline-block;
	vertical-align: middle;
}

.action-bar {
	border-radius: 10px;
	border: 1.5px solid rgb(236, 236, 236);
	width: 60px;
	box-shadow: 3px 3px 10px rgb(236, 236, 236);
	background-color: white;
	margin-left: 20px;
}

.favourite-icon,
.printer-icon,
.share-icon,
.facebook-icon,
.pinterest-icon {
	padding-bottom: 20px;
}
.favourite-icon {
	padding-top: 25px;
}

.recipe-name-div {
	font-size: 26px;
	padding: 0 5px 5px 5px;
	width: 55%;
	float: left;
	text-align: left;
}

.recipe-info {
	float: right;
	font-size: 14px;
	width: 40%;
	padding: 0 5px 5px 5px;
	vertical-align: middle;
	white-space: nowrap;
}

.servings,
.preparation-time,
.calories {
	float: right;
	padding-right: 20px;
}

.recipe-name {
	color: #333333;
	font-family: "Poppins";
	font-weight: 600;
}
.header {
	border-bottom: 1.5px solid rgb(236, 236, 236);
	width: 95%;
	margin: auto;
	overflow: hidden;
	display: inline-block;
}

.info-icon {
	fill: #555555;
	height: 34px;
	width: 34px;
	vertical-align: middle;
}

svg {
	filter: drop-shadow(3px 3px 5px #b1b1b1);
}

.clickable-svg {
	cursor: pointer;
}

span {
	color: #555555;
}

#snackbar {
	visibility: hidden;
	min-width: 250px;
	margin-left: -125px;
	background-color: #333;
	color: #fff;
	text-align: center;
	border-radius: 2px;
	padding: 16px;
	position: fixed;
	z-index: 1;
	left: 50%;
	bottom: 30px;
}

#snackbar.show {
	visibility: visible;
	-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
	animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
	from {
		bottom: 0;
		opacity: 0;
	}
	to {
		bottom: 30px;
		opacity: 1;
	}
}

@keyframes fadein {
	from {
		bottom: 0;
		opacity: 0;
	}
	to {
		bottom: 30px;
		opacity: 1;
	}
}

@-webkit-keyframes fadeout {
	from {
		bottom: 30px;
		opacity: 1;
	}
	to {
		bottom: 0;
		opacity: 0;
	}
}

@keyframes fadeout {
	from {
		bottom: 30px;
		opacity: 1;
	}
	to {
		bottom: 0;
		opacity: 0;
	}
}
</style>