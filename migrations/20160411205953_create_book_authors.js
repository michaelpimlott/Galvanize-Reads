
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_authors', function(table){
    table.integer('book_id');
    table.integer('author_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('book_authors');

};
