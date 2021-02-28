var PokemonsList = document.querySelector('.js-pokemons_list');
var PokemonsTemplate = document.querySelector('.js-pokemon_template').content;

var createPokemonCard = (pokemon) => {
    var PokemonsCard = PokemonsTemplate.cloneNode(true);

    PokemonsCard.querySelector('.pokemon').dataset.id = pokemon.id ;
    PokemonsCard.querySelector('.pokemon_img').src = pokemon.img ;
    PokemonsCard.querySelector('.pokemon_name').textContent = pokemon.name ;

    pokemon.type.forEach(function(tur){
        var span = document.createElement("span");
        span.classList.add("badge" ,"badge-warning", "mr-2" , "mb-1", "badge-lg");
        span.textContent = tur;
        PokemonsCard.querySelector('.pokemon_type').appendChild(span);
     });

    return PokemonsCard;
}

var renderPokemons = (pokemons) => {

    PokemonsList.innerHTML = '';

     pokemons.forEach(pokemon => {
        PokemonsList.appendChild(createPokemonCard(pokemon));
     });
}

renderPokemons(pokemons);

var search = document.querySelector("#search");
var findbutton = document.querySelector(".find-button");
findbutton.addEventListener("click",function(event){
    event.preventDefault();
        var searchName = search.value;
        var searchPokemons = pokemons.filter(function(pokemon){
          return pokemon.name.includes(searchName); 
       });
       PokemonsList.innerHTML = "";
       renderPokemons(searchPokemons);
    });

 var btnGroup = document.querySelector(".btn-group");
 var button = btnGroup.querySelectorAll("button");
 button.forEach(btn => {
    btn.addEventListener("click", function(event){
        var text = btn.textContent;
        var kindPokemons = pokemons.filter(function(pokemon){
            return pokemon.type.includes(text);
        });
        PokemonsList.innerHTML = "";
          renderPokemons(kindPokemons);
    });
 });

 PokemonsList.addEventListener("click" , (evt) => {
    if(evt.target.matches('.pokemon_info')) {
       var closestPokemon = evt.target.closest(".pokemon");
       
       var foundPokemon = pokemons.find(pokemon => {
           return closestPokemon.dataset.id === String(pokemon.id)
       });

       var renderModal = (pokemon) => {
        document.querySelector(".pokemon_info-height").textContent = pokemon.height;
        document.querySelector(".pokemon_info-weight").textContent = pokemon.weight;
        document.querySelector(".pokemon_info-candy").textContent = pokemon.candy;
        document.querySelector(".pokemon_info-egg").textContent = pokemon.egg;
        document.querySelector(".pokemon_info-spawn-chance").textContent = pokemon.spawn_chance;
        document.querySelector(".pokemon_info-avg-spawn").textContent = pokemon.avg_spawns;
        document.querySelector(".pokemon_info-weaknesses").textContent = pokemon.weaknesses;
        document.querySelector(".pokemon_info-multipliers").textContent = pokemon.multipliers;
        document.querySelector(".pokemon_info-next-evolution").textContent = pokemon.next_evolution ;
       };
       renderModal(foundPokemon);
    }
 })
