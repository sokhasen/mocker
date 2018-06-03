const fake_data = require("./mokes/fake_data");
// const  username = fake_list.persons.username;
// const  email = fake_list.contacts.email;
// const  phone = fake_list.contacts.phone;
// const  nationalities = fake_list.nationalities;
// const  country_name = fake_list.countries.name;
// const  country_code = fake_list.countries.code;
// const  language_name = fake_list.languages.name;
// const  language_code = fake_list.languages.code;

module.exports.factory = function ( faker_name = "") {
    try {
        const callFaker = eval("fake_data." + faker_name);
        let totalOfFaker = callFaker.length;
        let randomIndex = getRandomIndex(0, totalOfFaker);
        return callFaker[randomIndex];
    }
    catch (e) {
        return null;
    }
};

module.exports.mapFieldFaker = function ( fieldName = "", fakerName = "", cols = {}) {

    cols[`${fieldName}`] = this.factory(fakerName);

    return cols;
};

function getRandomIndex (min = 0, max = 0)
{
    return Math.floor(Math.random() * max) + min;
}
