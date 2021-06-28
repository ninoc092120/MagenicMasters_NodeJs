const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../pokemon.json');
const db = lowdb(adapter);

db.defaults({ pokemons: [] }).write();

exports.get = (name) => {
    const isNameEmpty = name === null || name === undefined || name.length == 0;

    const pokemons = isNameEmpty ?
        db.get('pokemons').value() :
        db.get('pokemons').value().filter((_) => _.name.toUpperCase() === name.toUpperCase());

    return pokemons;
};

exports.insert = (pokemon) => {
    const { name } = pokemon;

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} already exist.`,
        };
    }

    db.get('pokemons').push(pokemon).write();

    return {
        success: true,
    };
};

exports.delete = (paramName) => {
    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === paramName).length > 0;

    if (isPokemonExist) {
        db.get('pokemons').remove({name: paramName}).write();
        return {
            success: true,
        };
    }

    return {
        success: false,
        errorMessage: `Pokemon ${paramName} does not exist.`,
    };
};

exports.update = (pokemon, paramName) => {
    const { name, type, generation} = pokemon;

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === paramName).length > 0;

    if (!isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${paramName} does not exist.`,
        };
    }

    if (type === null || type === undefined) {
        return {
            success: false,
            errorMessage: 'Update fail, type property is missing.',
        };
    }

    if (type.length == 0) {
        return {
            success: false,
            errorMessage: 'Update will fail, type property is blank.',
        };
    }

    if(generation === null || generation === undefined || generation.length == 0) {
        db.get('pokemons').find({name: paramName}).assign({type: type}).write();
    } else {
        db.get('pokemons').find({name: paramName}).assign({type: type, generation: generation}).write();
    }

    return {
        success: true,
    };
};