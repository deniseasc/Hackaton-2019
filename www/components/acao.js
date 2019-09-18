// This is a JavaScript file
var urlImage;
$(document).on("click","#salvar",function(){
    var prop = document.getElementById('caminho').files[0]; //caminho = foto
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();
    
    if(jQuery.inArray(extensao_imagem,['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }else{
      var form_data = new FormData();
      form_data.append("foto",prop);
      form_data.append("livro",$("#nome").val());
      form_data.append("autor",$("#idade").val());
      form_data.append("ano",$("#cpf").val());
      form_data.append("ano",$("#telefone").val());
      $.ajax({
        url:"https://appmobile3i2.000webhostapp.com/cadastra.php",
        method:'POST',
        data:form_data,
        contentType:false,
        cache:false,
        processData:false,
        success:function(data){
          navigator.notification.alert(data);
          location.reload();
        }
      });
    }    
});

function habilita(){
  $("#nome").prop("readonly",false);
  $("#idade").prop("readonly",false);
  $("#cpf").prop("readonly",false);
  $("#telefone").prop("readonly",false);
}

function desabilita(){
  $("#nome").prop("readonly",true);
  $("#idade").prop("readonly",true);
  $("#cpf").prop("readonly",true);
  $("#telefone").prop("readonly",true);
}

$(document).on("click","#novo",function(){
  habilita();
});

$(document).on("click","#cancelar",function(){
  desabilita();
});


$(document).on("click","#listar",function(){
    $(location).attr("href","lista.html");
});


$(document).on("change","#listalivros",function(){
  var parametro ={
    "codigo":$("option:selected",("#listalivros")).val()
  }
  
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/listarUm.php",//para onde enviar
        data:parametro,
        dataType:'json',//o que enviar
        //se der certo
        success: function(data){
           $("#codigo").val(data.livro.codigo);
           $("#nome").val(data.livro.titulo);
           $("#idade").val(data.livro.autor);
           $("#cpf").val(data.livro.ano);
           $("#imagem").attr('src',"https://appmobile3i2.000webhostapp.com/"+data.livro.imagem);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
});

//codigo para chamar a camera

$(document).on("click","#foto",function(){
    navigator.camera.getPicture(onSuccess, onFail, { 
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      saveToPhotoAlbum:true,
      correctOrientation:true
    });

    function onSuccess(imageURI) {
        navigator.notification.alert("imagem registrada com sucesso!");
    }

    function onFail(message) {
       navigator.notification.alert('erro ao capturar imagem: ' + message);
    }
});