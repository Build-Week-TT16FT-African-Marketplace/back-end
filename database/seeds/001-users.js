
exports.seed = function (knex) {
  return knex('users').insert([
    { username: 'Jen1', password: "Testing", department: "buyer" },
    { username: 'Jaxon1', password: "Testing", department: "buyer" },
    { username: 'Malayah1', password: "Testing", department: "seller" },
    { username: 'Jason1', password: "Testing", department: "seller" },
  ]);
};