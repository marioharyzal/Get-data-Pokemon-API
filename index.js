"use strict";
const getAll = async () => {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=30"
        );
        const pokemons = await response.json();

        let tempt = "";
        pokemons.results.map(async (data) => {
            try {
                const response = await fetch(data.url);
                const pokemon = await response.json();

                let cardColor;
                switch (pokemon.types[0].type.name) {
                    case "grass":
                        cardColor = "text-bg-success";
                        break;
                    case "water":
                        cardColor = "text-bg-primary";
                        break;
                    case "fire":
                        cardColor = "text-bg-danger";
                        break;
                    case "bug":
                        cardColor = "text-bg-secondary";
                        break;
                    case "electric":
                        cardColor = "text-bg-warning";
                        break;
                    case "poison":
                        cardColor = "text-bg-info";
                        break;
                    case "ground":
                        cardColor = "text-bg-dark";
                        break;
                    default:
                        cardColor = "";
                        break;
                }

                const { name, type, image } = {
                    name: pokemon.name,
                    type: pokemon.types[0].type.name,
                    image: pokemon.sprites.front_default,
                };

                const card = `
                <div class="col-sm-2 d-flex justify-content-center my-3 ">
                    <div class="card shadow-sm border-0 ${cardColor}" style="width: 18rem">
                        <img src="${image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title text-center"><strong>${name}</strong></h5>
                            <p class="card-text text-center">
                                ${type}
                            </p>
                        </div>
                    </div>
                </div>
                `;

                tempt += card;
                document.getElementById("list").innerHTML = tempt;
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

document.getElementById("get-all").addEventListener("click", getAll);
