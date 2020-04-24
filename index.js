var pokemonName = "Pikachu";

function whoIsThatPokemon() {
  // 1 caso - this dentro de uma função declarada no escopo global
  // é o próprio objeto global(no navegador window)
  console.log(this.pokemonName)
}

whoIsThatPokemon();

var pokemon = {
  name: "Charmander",
  whoIsThatPokemon: function() {
    // 2 caso - this dentro de um método de um objeto
    // é o próprio objeto
    console.log(this.name);
  }
}

pokemon.whoIsThatPokemon();

var pokemon2 = {
  name: "Squirtle",
  whoIsThatPokemon: function() {
    function getPokemonName() {
      // 3 caso - funções declaradas dentro de métodos de objetos
      // o this vai ser o outerEnvironment do objeto
      return this.name;
    }

    console.log("Aqui é Squirtle", this.name);
    console.log("Como aqui não é o Squirtle?", getPokemonName());
  }
}

pokemon2.whoIsThatPokemon();

var pokemon3 = {
  name: "Charizard",
  whoIsThatPokemon: function() {
    function getPokemonName() {
      return this.name;
    }

    // 4 caso - quando invocarmos a qualquer função com .call(valor)
    // o this será igual ao valor passado
    console.log("Aqui tem que imprimir o " +this.name, getPokemonName.call(this));
  }
}

pokemon3.whoIsThatPokemon();

var pokemon4 = {
  name: "Mew",
  whoIsThatPokemon: function() {

    // 5 caso - quando invocamos qualquer função com .apply(valor)
    // o this será igual ao valor passado
    pokemon3.whoIsThatPokemon.apply(this)
  }
}

pokemon4.whoIsThatPokemon();

var pokemon5 = {
  name: "Mew",
  whoIsThatPokemon: function() {
    function getPokemonName(prependText) {
      return prependText + this.name;
    }

    // call - os argumentos sao passados ad hoc
    console.log(getPokemonName.call(this, "Call - Aqui tem que imprimir o "));
    // apply - os argumentos sao passados via array de args
    console.log(getPokemonName.apply(this, ["Apply - Aqui tem que imprimir o "]));
  }
}

pokemon5.whoIsThatPokemon();

// 6 caso - quando criamos uma função com .bind(valor)
// o this da função criada vai ser igual ao valor
var imprimeSquirtle = pokemon3.whoIsThatPokemon.bind(pokemon2);

imprimeSquirtle()

// cai no caso 1
var imprimePikachu = function () {
  function getPokemonName() {
    return this.name;
  }

  console.log("imprime pikachu", getPokemonName());
  
};

imprimePikachu()