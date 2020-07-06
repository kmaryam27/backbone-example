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
    events:{
        'click .edit-model': 'edit',
        'click .edit-update': 'update',
        'click .edit-cancel': 'cancel',
        'click .delete-model': 'delete'
    },
    edit: function(){
        const name = this.$('.name').html();
        const family = this.$('.family').html();
        const email = this.$('.email').html();
        const phone = this.$('.phone').html();

        this.$('.name').html(`<input type='text' class='form-control name-update' value='${name}'/>`)
        this.$('.family').html(`<input type='text' class='form-control family-update' value='${family}'/>`)
        this.$('.email').html(`<input type='text' class='form-control email-update' value='${email}'/>`)
        this.$('.phone').html(`<input type='text' class='form-control phone-update' value='${phone}'/>`)
        
        $('.edit-model').hide();
        $('.delete-model').hide();
        this.$('.edit-update').show();
        this.$('.edit-cancel').show();
    },
    update: function(){//in the using arrow function this does not refer to parent block
        this.model.set('name', $('.name-update').val());
        this.model.set('family', $('.family-update').val());
        this.model.set('email', $('.email-update').val());
        this.model.set('phone', $('.phone-update').val());
    },
    cancel: () => {
        modelsView.render();//modelsView = new BBCV()
    },
    delete: function(){
        this.model.destroy()
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
        const self = this;
        this.model.on('add', this.render, this);
        // this.model.on('change', this.render, this)//in this method because we need time just will update first culumn's update
        this.model.on('change', function(){
            setTimeout(() => {//we need the timer to wait for all -update values to get and change
                self.render();
            }, 30)
            
        }, this);

        this.model.on('remove', this.render, this);
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