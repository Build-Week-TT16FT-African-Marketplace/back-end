exports.up = function (knex) {
    return knex.schema
        .createTable("users", users => {
            users.increments();

            users
                .string("username", 128)
                .notNullable()
                .unique();
            users.string("password", 128).notNullable();
            users.string("department", 128).notNullable();
        })
        .createTable("items", items => {
            items.increments();
            items.text("name");
            items.text("description");
            items.float("price");
            items.text("location");
            items.text("category");
            items.string("URL");
            items
                .integer("user_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("items").dropTableIfExists("users");
};