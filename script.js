const pokemonName = document.querySelector ('.pokemon__name');
const pokemonNumber = document.querySelector ('.pokemon__number');
const pokemonimage = document.querySelector ('.pokemon__image');


const form = document.querySelector ('.form');
const input = document.querySelector ('.input__search');
const buttonPrev = document.querySelector ('.btn-prev');
const buttonNext = document.querySelector ('.btn-next');

let searchPokemon = 1;

    const feetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data;
     }
    }
    const renderPokemon = async (pokemon) => {
        pokemonName.innerHTML = 'loading...'
        pokemonNumber.innerHTML = '';

        const data = await feetchPokemon (pokemon);

         if(data){
            pokemonimage.style.display = 'block';
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            pokemonimage.src = data ['sprites'] ['versions']['genertion-v']
            ['black-white'] ['animated'] ['front_defaut'];
            input.value = '';
            searchPokemon = data.id;

            }else{
            pokemonimage.style.display = 'none';
            pokemonName.innerHTML = 'Not Found :c';
            pokemonNumber.innerHTML ='';
            }

     }

    form.addEventListener('submit', (event) =>{
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
    })

    buttonPrev.addEventListener('click', ()=> {
        if( searchPokemon > 1){
            searchPokemon -=1;
            renderPokemon (searchPokemon);

        }
    });

    buttonNext.addEventListener ('click', ()=>{
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    });

    renderPokemon(searchPokemon);
    



