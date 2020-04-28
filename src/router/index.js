/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import SearchResults from "../views/SearchResults.vue";
import Favourites from "../views/Favourites.vue";
import Recipe from "../views/Recipe.vue";
import History from "../views/History.vue";
import Profile from "../views/Profile.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/results",
		name: "SearchResults",
		component: SearchResults,
	},
	{
		path: "/history",
		name: "History",
		component: History,
		beforeEnter(to, from, next) {
			// if refresh delay
			if (from.name === null) {
				setTimeout(() => routeIfUserLoggedIn(to, from, next), 1500);
			} else {
				routeIfUserLoggedIn(to, from, next);
			}
		},
	},
	{
		path: "/favourites",
		name: "Favourites",
		component: Favourites,
		beforeEnter(to, from, next) {
			// if refresh delay
			if (from.name === null) {
				setTimeout(() => routeIfUserLoggedIn(to, from, next), 1500);
			} else {
				routeIfUserLoggedIn(to, from, next);
			}
		},
	},
	{
		path: "/recipe/:id",
		name: "Recipe",
		component: Recipe,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		beforeEnter(to, from, next) {
			// if refresh delay
			if (from.name === null) {
				setTimeout(() => routeIfUserLoggedIn(to, from, next), 1500);
			} else {
				routeIfUserLoggedIn(to, from, next);
			}
		},
	},
];

function routeIfUserLoggedIn(to, from, next) {
	if (store.state.isUserLoggedIn) {
		next();
	} else {
		next({
			name: "Home", // back to safety route //
		});
	}
}

const router = new VueRouter({
	routes,
});

export default router;
