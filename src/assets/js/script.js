// BB Model
const BBModel = Backbone.Model.extend({
    defaults: {
        name: '',
        family: '',
        email: '',
        phone: ''
    }
})
//instantiate model:
const m1 = new BBModel({name:'mary', family:'kesha', email:'kk', phone:'404'});
const m2 = new BBModel({name:'dia', family:'zak', email:'dd'});

// BB Collection
const BBCollection = Backbone.Collection.extend({});
//instantiate Collection:
// const c1 = new BBCollection([m1, m2]);
const c1 = new BBCollection();

//create view for one model
const BBV1 = Backbone.View.extend({
    model: new BBModel(),
    tagName: 'tr',
    initialize: function(){
        this.template = _.template($('.models-list-templete').html())
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

//create view for All models
const BBVC = Backbone.View.extend({
    model: c1,
    el: $('.models-list'),
    initialize: function(){
        this.model.on('add', this.render, this)
    },
    render: function(){
        this.$el.html('');
        const self = this;
        _.each(this.model.toArray(), function(myModel){
            self.$el.append(new BBV1({model: myModel}).render().$el)
        });
        return this;
    }
});
//instantiated colectionView
const modelsView = new BBVC();

$(document).ready(function(){
    $('.add-model').on('click', () => {
        //instantiate a model
        const m = new BBModel({
            name: $('.name-input').val(),
            family: $('.family-input').val(),
            email: $('.email-input').val(),
            phone: $('.phone-input').val()
        });
        // console.log(m.toJSON());
        // add model to collection
        c1.add(m);
        $('.name-input').val('');
        $('.family-input').val('');
        $('.email-input').val('');
        $('.phone-input').val('');
    })
})