
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
   table.increments();
   table.string('title');
   table.text('description');
   table.string('genre');
   table.string('cover_url');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
