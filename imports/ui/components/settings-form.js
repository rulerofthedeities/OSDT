import {Settings} from '../../api/settings.js';
import './settings-form.html';

Handlebars.registerHelper('selected', function(key, value) {
  return key === value ? {selected: 'selected'} : '';
});

Template.formSettings.onCreated(function() {
  this.settingUpdated = new ReactiveVar(false);
  this.timer = null;
});

Template.formSettings.onCreated(function formSettingsOnCreated() {
  this.subscribe('settings', function() {
    // This will run when we're subscribed
    let setting = Settings.findOne(
      {}, {fields: {currency: 1}}, {sort: {dt: -1}}
    );
    Session.set('currentCurrency', setting.currency);
  });
});

Template.formSettings.helpers({
  settings() {
    return Settings.findOne({}, {sort: {dt: -1}});
  },
  isSelected(curr, curCurr) {
    //note: returning simply selected or not
    //does not work when rendered in browser
    return '<option value="' +
      curr + '" ' +
      (curr === curCurr ? 'selected' : '')
      + '>' + curr + '</option>';
  },
  toggleCurrency(curr) {
    return curr === 'EUR' ? 'USD' : 'EUR';
  },
  getCurrentCurrency() {
    return Session.get('currentCurrency');
  },
  errormessage: function(key) {
    const validationContext = Settings.simpleSchema().namedContext();
    const msg = validationContext.keyErrorMessage(key);
    if (!Session.get('errormessages')) {
      Session.set('errormessages', msg);
    }
    return msg;
  },
  inserterrormessage: function() {
    return Session.get('inserterrormessage');
  },
  inserted: function() {
    return Template.instance().settingUpdated.get();
  },
});

Template.formSettings.events({
  'submit .settings'(event, template) {
    event.preventDefault();
    const target = event.target;
    const currency = target.currency.value;
    const exchangeRate = parseFloat(target.exchangeRate.value);

    const newSetting = {
      currency,
      exchangeRate,
      dt: new Date(),
    };

    Meteor.call('settings.insert', newSetting, (error) => {
      clearTimeout(template.timer);
      if(error) {
        console.log('Error', error.message);
        Session.set('inserterrormessage', 'Error: ' + error.message);
      } else {
        Session.set('inserterrormessage', null);
        template.settingUpdated.set(true);
        template.timer = setTimeout(() => {
          template.settingUpdated.set(false);
        }, 3000);
      }
    });
  },
  'change #currency'() {
    let selected = $('#currency option:selected').val();
    Session.set('currentCurrency', selected);
    $('#exchangeRate').val(
      Math.round(1 / $('#exchangeRate').val() * 1000) / 1000
      );
  },
});
