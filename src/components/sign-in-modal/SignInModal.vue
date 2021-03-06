<template>
	<div class="sign-in-modal">
		<div class="sign-in-modal-content" ref="sign-in-modal-content">
			<i
				class="fas fa-times fa-lg sign-in-modal-close-button"
				@click="onCloseButtonClicked"
			></i>
			<div class="sign-in-modal-header">
				<p class="header-title">{{ headerTitle }}</p>
			</div>
			<div class="sign-in-modal-body">
				<button
					v-if="isInSignInState"
					class="continue-with-facebook-button"
					@click="onContinueWithFacebookClicked"
				>
					<div class="grid-container-button">
						<i class="fab fa-facebook-f fa-2x icon-button"></i>
						<div class="text-button">Continue with Facebook</div>
					</div>
				</button>
				<div class="email-input-container">
					<div class="grid-container-input">
						<i class="far fa-envelope fa-lg icon-input"></i>
						<input
							v-model="email"
							autocomplete="nope"
							type="text"
							class="email-input"
							placeholder="E-mail"
							@keyup.enter="onActionButtonClicked"
						/>
					</div>
				</div>
				<div
					v-if="!isInForgotPasswordState"
					class="password-input-container"
				>
					<div class="grid-container-input">
						<i class="fas fa-lock fa-lg icon-input"></i>
						<input
							v-model="password"
							autocomplete="new-password"
							type="password"
							class="password-input text-input"
							placeholder="Password"
							@keyup.enter="onActionButtonClicked"
						/>
					</div>
				</div>
				<div class="sign-in-modal-response-message">
					{{ message }}
				</div>
				<button class="action-button" @click="onActionButtonClicked">
					{{ actionButtonName }}
				</button>
				<div
					v-if="isInSignInState"
					class="sign-in-modal-forgot-password-container"
				>
					<span
						class="sign-in-modal-forgot-password"
						@click="onForgotPasswordClicked"
						>I forgot my password</span
					>
				</div>
			</div>
			<div v-if="!isInForgotPasswordState" class="sign-in-modal-footer">
				<div class="sign-in-modal-footer-content">
					<span v-if="isInSignInState"
						>Don't have an account?
						<span
							class="sign-in-modal-footer-link"
							@click="onFooterLinkSignUpClicked"
							>Sign up</span
						>
					</span>
					<span v-else-if="isInSignUpState"
						>Already have an account?
						<span
							class="sign-in-modal-footer-link"
							@click="onFooterLinkSignInClicked"
							>Sign In</span
						>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { MODAL_MODE } from "./ModalMode.js";
import {
	signInWithFacebook,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "../../services/FirebaseServices.js";

export default {
	computed: {
		headerTitle() {
			let title = "";
			switch (this.modalMode) {
				case MODAL_MODE.SIGN_IN: {
					title = "Sign in to your account";
					break;
				}
				case MODAL_MODE.SIGN_UP: {
					title = "Create an account";
					break;
				}
				case MODAL_MODE.FORGOT_PASSWORD: {
					title = "Reset password";
					break;
				}
			}
			return title;
		},
		actionButtonName() {
			let name = "";
			switch (this.modalMode) {
				case MODAL_MODE.SIGN_IN: {
					name = "Sign in";
					break;
				}
				case MODAL_MODE.SIGN_UP: {
					name = "Sign up";
					break;
				}
				case MODAL_MODE.FORGOT_PASSWORD: {
					name = "Reset password";
					break;
				}
			}
			return name;
		},
		isInSignInState() {
			return this.modalMode === MODAL_MODE.SIGN_IN;
		},
		isInSignUpState() {
			return this.modalMode === MODAL_MODE.SIGN_UP;
		},
		isInForgotPasswordState() {
			return this.modalMode === MODAL_MODE.FORGOT_PASSWORD;
		},
	},
	data() {
		return {
			isLoading: true,
			email: "",
			password: "",
			user: "",
			message: "",
			modalMode: MODAL_MODE.SIGN_IN,
		};
	},
	mounted() {
		// prevent  scrolling
		document.body.style.overflowY = "hidden";
		document.body.style.marginRight = "17px";
		document.addEventListener("keydown", this.handleEscapeClickedEvent);
	},
	beforeDestroy() {
		this.clearData();
		document.body.style.overflowY = "scroll";
		document.body.style.marginRight = "0";
		document.removeEventListener("keydown", this.handleEscapeClickedEvent);
	},
	methods: {
		onCloseButtonClicked() {
			this.$emit("toggleSignInModal");
		},
		async onContinueWithFacebookClicked() {
			let loader = this.startLoading();
			signInWithFacebook()
				.then(error => {
					if (!error) {
						this.$emit("toggleSignInModal");
					} else {
						this.message = error;
						this.clearData();
					}
				})
				.finally(() => loader.hide());
		},
		async onActionButtonClicked() {
			switch (this.modalMode) {
				case MODAL_MODE.SIGN_IN: {
					await this.signInAction();
					break;
				}
				case MODAL_MODE.SIGN_UP: {
					await this.signUpAction();
					break;
				}
				case MODAL_MODE.FORGOT_PASSWORD: {
					await this.forgotPasswordAction();
					break;
				}
			}
		},
		async signInAction() {
			let loader = this.startLoading();
			signInWithEmailAndPassword(this.email, this.password)
				.then(error => {
					if (!error) {
						this.$emit("toggleSignInModal");
					} else {
						this.message = error;
						this.clearData();
					}
				})
				.finally(() => loader.hide());
		},
		async signUpAction() {
			let loader = this.startLoading();
			createUserWithEmailAndPassword(this.email, this.password)
				.then(error => {
					if (!error) {
						this.$emit("toggleSignInModal");
					} else {
						this.message = error;
					}
				})
				.finally(() => loader.hide());
		},
		async forgotPasswordAction() {
			let loader = this.startLoading();
			sendPasswordResetEmail(this.email)
				.then(error => {
					if (!error) {
						this.message = "Reset password request sent";
						this.clearData();
					} else {
						this.message = error;
						this.clearData();
					}
				})
				.finally(() => loader.hide());
		},
		onForgotPasswordClicked() {
			this.message = "";
			this.modalMode = MODAL_MODE.FORGOT_PASSWORD;
		},
		onFooterLinkSignUpClicked() {
			this.message = "Creating an account will automatically log you in";
			this.modalMode = MODAL_MODE.SIGN_UP;
		},
		onFooterLinkSignInClicked() {
			this.message = "";
			this.modalMode = MODAL_MODE.SIGN_IN;
		},
		handleEscapeClickedEvent(event) {
			if (event.key === "Escape") {
				this.$emit("toggleSignInModal");
			}
		},
		clearData() {
			this.email = "";
			this.password = "";
			this.modalMode = MODAL_MODE.SIGN_IN;
		},
		startLoading() {
			return this.$loading.show({
				container: this.$refs["sign-in-modal-content"],
				canCancel: false,
			});
		},
	},
};
</script>
<style scoped>
.sign-in-modal {
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow: auto;
	position: fixed;
	z-index: 10;
}

.sign-in-modal-content {
	background-color: #ffffff;
	border: none;
	border-radius: 5px;
	box-shadow: 0 0 16px 0px black;
	display: flex;
	flex-direction: column;
	position: relative;
	margin: auto;
	width: 340px;
}

.sign-in-modal-body {
	display: grid;
	row-gap: 20px;
}

.sign-in-modal-close-button {
	cursor: pointer;
	position: absolute;
	right: 15px;
	top: 15px;
}

.sign-in-modal-header {
	align-items: center;
	background-color: rgba(242, 242, 242, 1);
	box-sizing: border-box;
	border-bottom: 1px solid black;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	color: black;
	display: flex;
	justify-content: center;
	font-family: "Arial Normalny", "Arial", sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	height: 60px;
	padding: 20px;
}

.sign-in-modal-body {
	padding: 20px;
}

.sign-in-modal-footer {
	color: black;
	font-family: "Arial Normalny", "Arial", sans-serif;
	font-weight: 400;
	font-style: normal;
	padding-right: 20px;
	padding-left: 20px;
}

.sign-in-modal-footer:before {
	content: "\a0";
	display: block;
	padding: 2px 0;
	line-height: 1px;
	border-top: 1px solid rgb(215, 215, 215);
}

.sign-in-modal-footer-content {
	width: 260px;
	padding: 20px;
}

.continue-with-facebook-button,
.action-button {
	border: none;
	color: white;
	cursor: pointer;
	font-family: "Arial Pogrubiony", "Arial Normalny", "Arial", sans-serif;
	font-weight: 700;
	font-style: normal;
	padding-top: 10px;
	padding-bottom: 10px;
	height: 50px;
	width: 300px;
}

.continue-with-facebook-button {
	background-color: rgb(64, 86, 155);
	box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.35);
	position: relative;
}

.continue-with-facebook-button:hover {
	background-color: rgb(42, 60, 114);
}

.continue-with-facebook-button:active {
	background-color: rgb(42, 60, 114);
	top: 2px;
}

.action-button {
	background-color: rgba(255, 128, 128, 1);
	font-size: 18px;
	position: relative;
}

.action-button:hover {
	background-color: rgb(163, 70, 70);
}

.action-button:active {
	background-color: rgb(163, 70, 70);
	top: 2px;
}

.email-input-container,
.password-input-container {
	border: 1px solid rgb(201, 201, 201);
	border-radius: 5px;
	box-sizing: border-box;
	height: 50px;
	width: 300px;
}

.email-input,
.password-input {
	border: none;
	box-sizing: border-box;
	color: rgb(201, 201, 201);
	height: 35px;
	font-size: 16px;
	font-family: "Poppins", sans-serif;
	width: 250px;
}

.email-input::placeholder,
.password-input::placeholder {
	color: rgb(228, 228, 228);
}

.email-input:focus,
.password-input:focus {
	outline: none;
}

.input-icon {
	color: rgb(228, 228, 228);
}

.grid-container-button {
	display: grid;
	grid-template-columns: 5px 37px 1fr;
}

.grid-container-input {
	align-items: center;
	display: grid;
	grid-template-columns: 10px 37px 1fr;
	height: 100%;
}

.icon-button {
	grid-column: 2;
}

.text-button {
	align-items: center;
	display: grid;
	font-size: 18px;
	grid-column: 3;
	justify-content: center;
	padding-right: 20px;
}

.icon-input {
	color: rgb(228, 228, 228);
	grid-column: 2;
}

.text-input {
	color: rgb(153, 153, 153);
	grid-column: 3;
}
.sign-in-modal-forgot-password {
	align-items: center;
	display: flex;
	justify-content: center;
	width: 300px;
}

.sign-in-modal-forgot-password {
	font-family: "Arial Normalny", "Arial", sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 13px;
}

.sign-in-modal-footer-link,
.sign-in-modal-forgot-password {
	color: rgb(22, 155, 213);
	cursor: pointer;
}

.sign-in-modal-footer-link:hover,
.sign-in-modal-forgot-password:hover {
	text-decoration: underline;
}

.sign-in-modal-response-message {
	align-items: center;
	display: flex;
	justify-content: center;
	width: 300px;
}

@media screen and (max-width: 600px) {
	.text-button,
	.action-button {
		font-size: 16px;
	}
}
</style>
