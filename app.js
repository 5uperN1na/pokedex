async function fetchOriginal151Pokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonList = data.results;

        // console.log(pokemonList);

        const pokemonData = await Promise.all(
            pokemonList.map(async pokemon => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return pokemonData;
            })
        );
        return pokemonData;

    } catch (error) {
        console.log('Error fetching data: ' + error);
        return null;

    }
}

fetchOriginal151Pokemon()
    .then(pokemonData => {
        const pokemonCards = pokemonData.map(pokemon => generatePokemonCard(pokemon))
        pokemonCards.forEach(card => {
            document.querySelector('.container').appendChild(card);
        })
    })
    .catch(e => console.log(e));


function generatePokemonCard(pokemon) {

    const card = document.createElement('article');
    card.classList.add('card');

    const image = document.createElement('img');

    // console.log('img: ' +  pokemon.sprites.front_default)

    image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + `${pokemon.id}` + '.png';

    // console.log('image src: ' +  image.src)
    
    image.alt = pokemon.name;

    image.classList.add('card-img');
    
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.textContent = pokemon.name;
    cardBody.appendChild(title);

    const typeList = document.createElement('ul');
    typeList.classList.add('type-list');
    pokemon.types.forEach(type => {
        const typeItem = document.createElement('li');
        typeItem.textContent = type.type.name;
        typeList.appendChild(typeItem);
    });
    cardBody.appendChild(typeList);
    card.appendChild(cardBody);
    return card;

}