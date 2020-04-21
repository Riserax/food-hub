<template>
    <div class="favourites">
        <div class="favourites-header">
            <p class="favourites-header-title">
                {{ favouritesHeaderTitle }}
            </p>
        </div>
        <CardsContainer :recipe-list="favouriteRecipeList" />
    </div>
</template>

<script>
import CardsContainer from "@/components/cards-container/CardsContainer.vue";
import { getMockRecipeList } from "../mock/RecipeData.js";
export default {
    name: "Favourites",
    components: {
        CardsContainer,
    },
    data() {
        return {
            favouritesHeaderTitle: "Your favourite recipes",
            favouriteRecipeList: getMockRecipeList(),
        };
    },
    beforeMount() {
        this.initializeFavourites();
    },
    methods: {
        async initializeFavourites() {
            //get favourites from database
            // if favourites list empty -> get random recipes
            // this.favouriteRecipeList = responseRandomRecipes;
            // this.favouritesHeaderTitle = "No favourites? Maybe you will like:"
            // else
            //this.favouriteRecipeList = favouritesResponse;
            //this.favouritesHeaderTitle = `Your favourite recipes (${this.favouriteRecipeList.length})`;
        },
    },
};
</script>
<style scoped>
.favourites {
    display: grid;
    row-gap: 20px;
    margin-bottom: 20px;
}

.favourites-header {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

.favourites-header:after {
    content: "\a0";
    display: block;
    padding: 2px 0;
    line-height: 1px;
    border-bottom: 1px solid rgb(238, 238, 238);
}

.favourites-header-title {
    color: rgb(51, 51, 51);
    font-weight: 600;
    font-style: normal;
    font-size: 26px;
    font-family: "Poppins SemiBold", "Poppins Regular", "Poppins", sans-serif;
    padding-left: 10px;
    padding-bottom: 5px;
    text-align: start;
    margin-block-start: 0px;
    margin-block-end: 0;
}

@media screen and (max-width: 600px) {
    .favourites-header-title {
        font-size: 24px;
    }
}

@media screen and (max-width: 500px) {
    .favourites-header-title {
        font-size: 22px;
    }
}

@media screen and (max-width: 450px) {
    .favourites-header-title {
        font-size: 20px;
    }
}

@media screen and (max-width: 400px) {
    .favourites-header-title {
        font-size: 18px;
    }
}
</style>
