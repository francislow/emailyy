function getPokemonData() {
  fetch('https://pokeapi.co/api/v2/pokemon/pikachu/')
    .then(res =>console.log(res.json()));
}

getPokemonData();
