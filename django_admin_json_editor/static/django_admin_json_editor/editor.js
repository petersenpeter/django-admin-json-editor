var editors = {};
var $ = django.jQuery;

const injectJSONEditor = (element) => {
  var id = element.id
  if (id.indexOf('__prefix__') === -1) { // activate editor only if it is not an inline template row
    var textarea_id = "id_"+element.id.replace('_editor', '')
    var data = JSON.parse(element.getAttribute('data-data'))
    var options = JSON.parse(element.getAttribute('data-options'))

    editors[id] = new JSONEditor(element, options);
    editors[id].on('change', function () {
      var errors = editors[id].validate();
      if (errors.length) {
        console.log(errors);
      } else {
        var json = editors[id].getValue();
        $('#'+textarea_id)[0].value = JSON.stringify(json);
      }
    });

    if (data != null) {
      editors[id].setValue(data);
    }
  }
};

// Inject editors in the normal detail view and in inlines

$(document).ready(() => {
  $(document).find("[id$=_editor]").each(function(){
    injectJSONEditor(this);      
  });  
});

$(document).on('formset:added', (event, $row, formsetName) => {
  $row.find("[id$=_editor]").each(function(){
    injectJSONEditor(this);      
  });  
});
