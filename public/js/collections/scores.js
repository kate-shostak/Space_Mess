define([
	'backbone',
	'models/score'
], function(
	Backbone,
	ScoreModel
){
    var ScoresCollection = Backbone.Collection.extend( {
      model : ScoreModel,

      comparator : function (model) {
          return -model.get("score");  // сортировка по убыванию параметра score
      },
      
      initialize : function () {
      }

    });
     
    return new ScoresCollection();

});
