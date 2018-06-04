const fake_data = require("./mokes/fake_data");
// const  username = fake_list.persons.username;
// const  email = fake_list.contacts.email;
// const  phone = fake_list.contacts.phone;
// const  nationalities = fake_list.nationalities;
// const  country_name = fake_list.countries.name;
// const  country_code = fake_list.countries.code;
// const  language_name = fake_list.languages.name;
// const  language_code = fake_list.languages.code;

function getRandomIndex (min = 0, max = 0)
{
    return Math.floor(Math.random() * max) + min;
}

module.exports.mappingResponseBody = function (response_params, response_type, fakeNumber=10) {
    let responseBody = null;

    switch (response_type) {
        case "application/json":
            responseBody = generateFakeJsonData(response_params, fakeNumber);
            break;
        case "application/xml":
            responseBody = generateFakeXMLData(response_params, fakeNumber);
            break;
        default:
            responseBody =  response_params;
            break;
    }
    return responseBody;
};


function generateFakeJsonData(params_list, fakeNumber) {

    let recordList = [];
    for(let record = 1; record <= fakeNumber; record++) {
        const newRecord = {};
        params_list.forEach(param => {
            let key = "";
            let value = "";

            if (param.hasOwnProperty("key") && param.hasOwnProperty("value")) {
                key = param.key;
                value = param.value;
                newRecord[key] = factory(value);
            }
        });
        recordList.push(newRecord);
    }


    return recordList;
}

function generateFakeXMLData(params_list, fakeNumber) {
    let xml = `<?xml version="1.0"?><response>`;
    for(let record = 1; record <= fakeNumber; record++) {
        let node = "";
        xml += `<data id="${record}">`;
        params_list.forEach(param => {
            let key = "";
            let value = "";

            if (param.hasOwnProperty("key") && param.hasOwnProperty("value")) {
                key = param.key;
                value = param.value;

                node += `<${key}>${factory(value)} </${key}>`;
            }
        });
        xml += node;
        xml += `</data>`;
    }

    xml += `</response>`;
    return xml;
}

const factory = function ( faker_name = "") {
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