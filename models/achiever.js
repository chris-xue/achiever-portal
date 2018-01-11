var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var AchieverSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    sport: {type: String, required: true},
    academic_pr: {type: [Number]},
    athletic_pr: {type: [Number]}
  }
);

// // Virtual for author's full name
// AuthorSchema
// .virtual('name')
// .get(function () {
//   return this.family_name + ', ' + this.first_name;
// });

// // Virtual for author's URL
// AuthorSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/' + this._id;
// });

//Export model
AchieverSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Achiever', AchieverSchema);