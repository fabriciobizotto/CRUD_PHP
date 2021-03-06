$(function(){
  $("#mensagem").hide();
  listar();

  var validator = $('#produtos_form').validate({
    // debug:true,
    rules: {
      codigo: {
        required: true,
        minlength: 4,
        maxlength: 4,
      },
      descricao: {
        required: true
      }
    },
    submitHandler: function(form) {
      $('#produto_id').removeAttr('disabled');
      var dados = $('#produtos_form').serialize();
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'produto_salvar.php',
        data: dados,
        beforeSend: function(data){
          beforeSend();
        },
        error: function(data){
          showMessageError(data);
        },
        success: function(data){
          showMessageSuccess(data);
          listar();
          $('#produtos_form')[0].reset();
          $('#codigo').focus();
          validator.resetForm();
          $('#produto_id').attr('disabled','disabled');
        }
      });
      return false;
    }
  });
});

function listar(){
  $.ajax({
    type: 'POST',
    dataType: 'html',
    url: 'produto_listar.php',
    success: function(data){
      $('#lista').html(data);
    },
    error: function(data){
      $('#lista').html(data);
    }
  });
}

function showMessageSuccess(data){
  $.each(data, function(key, value) {
    if (key == 'success'){
        $('#mensagem').addClass('alert-success bg-success');
    } else {
        $('#mensagem').addClass('alert-danger bg-danger');
    }
    $('#mensagem').html(value);
  });
  $('#mensagem').show();
}

function showMessageError(data){
  $('#mensagem').html(data.responseText);
  $('#mensagem').addClass('alert-danger bg-danger');
  $("#mensagem").show();
}

function beforeSend(){
  $('#mensagem').html('');
  $('#mensagem').removeClass('alert-danger alert-success bg-danger bg-success');
}

$(document).on('click', 'a.delete', function(){
  if(confirm("Tem certeza?")) {
    var id = $(this).parent().parent().find('td:eq(0)').text();
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {id: id},
      url: 'produto_excluir.php',
      beforeSend: function(data) {
        beforeSend();
      },
      success: function(data){
        showMessageSuccess(data);
        listar();
      },
      error: function(data){
        showMessageError(data);
      }
    });
  }
});

$(document).on('click', 'a.edit', function(){
  var id = $(this).parent().parent().find('td:eq(0)').text();
  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: {id: id},
    url: 'produto_editar.php',
    beforeSend: function(data) {
      beforeSend();
    },
    success: function(data){
      $('#produto_id').val(data.id);
      $('#codigo').val(data.codigo);
      $('#descricao').val(data.descricao);
    },
    error: function(data){
      showMessageError(data);
    }
  });
});
