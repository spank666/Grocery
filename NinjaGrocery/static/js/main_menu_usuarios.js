$(document).on({
	click:function(){
		$("#sistema_contenido").html('<div id="sistema_nav">\
											<span id="sistema_loading_circle"></span>\
											<span id="sistema_label">'+$(this).text()+'</span>\
											<span id="sistema_triangulo"></span>\
											<div class="sistema_nav_button" id="usuarios_agregar">Agregar</div>\
									  </div>\
									  <div id="usuarios_fondo">\
											<div id="sistema_panel_filtro">\
												<input type="text" placeholder="Buscar" class="sistema_input_filter" id="sistema_filter">\
											</div>\
											<div id="sistema_tablaResponsiva">\
												<div id="sistema_table">\
													<div class="usuarios_row1">Nombre<span class="sistema_order" data-order="0">&#xe824;</span></div>\
													<div class="usuarios_row2">Apellido<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row3">Usuario<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row4">Nivel<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row5">Telefono<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row6">Correo<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row7"></div>\
												</div>\
												<div id="sistema_order_mascara">\
													<div id="sistema_order_by"></div>\
												</div>\
											</div>\
											<div style="height:8px;"></div>\
											<div id="access_pagination" data-actual="0">\
												<button class="arrow_left arrow_disabled" id="access_prev_p">\
													<i></i>\
													<i></i>\
												</button>\
												<span id="pagination_position"></span>\
												<button class="arrow_right" id="access_next_p">\
													<i></i>\
													<i></i>\
												</button>\
												<div style="height:15px;"></div>\
											</div>\
									  </div>\
									  <div id="sistema_fixBottom"></div>');
		
		$.ajax({
			type: 'POST',
			url: '../usuarios/usuarios',
			dataType:"json",
			timeout:tiempo,
			success: function(data) {
				//alert(JSON.stringify(data));
				if(data=="permiso"){}
				if(data=="sesion"){
					location.reload();
				}else{
					var contenido='';
					for(var i=0;data.length>i;i++){
						contenido+='<div class="sistema_row_registro">\
										<div class="usuarios_reg_row1">'+data[i].nombre+'</div>\
										<div class="usuarios_reg_row2">'+data[i].apellido+'</div>\
										<div class="usuarios_reg_row3">'+data[i].usuario+'</div>\
										<div class="usuarios_reg_row4">'+data[i].nivel+'</div>\
										<div class="usuarios_reg_row5">'+data[i].telefono+'</div>\
										<div class="usuarios_reg_row6">'+data[i].correo+'</div>\
										<div class="usuarios_reg_row7">\
											<!--<span class="usuario_eliminar">&#xe81a;</span>-->\
											<span class="usuario_editar" data-id="'+data[i].id+'">&#xe815;</span>\
											<span class="usuario_bloquear" data-id="'+data[i].id+'" data-lock="'+data[i].status+'">'+(data[i].status==1?'&#xf13e;':'&#xe80b;')+'</span>\
										</div>\
									</div>';
					}
					$("#sistema_order_by").html(contenido);
					sistema_loading_hide();
					calcular_paginacion_access();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("Ruta: "+this.url+". Error:"+thrownError)
				//alert(xhr.status);
				//alert(ajaxOptions);
			}
		});
		
		/*
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress here
						console.log(percentComplete)
					}
			   }, false);
		
			   xhr.addEventListener("progress", function(evt) {
				   var percentComplete;
				   if (evt.lengthComputable) {
					   percentComplete = evt.loaded / evt.total;
					   //Do something with download progress
					   //console.log("Descargado"+percentComplete)
				   }else{
					   
					   percentComplete = evt.loaded / evt.target.getResponseHeader('X-Content-Length');
					   //console.log(evt.loaded +"/"+ evt.target.getResponseHeader('X-Content-Length'))
					   //console.log("Descargado Falso:"+percentComplete)
				   }
				   console.log("Descargado"+percentComplete)
				   console.log(evt)
			   }, false);
		
			   return xhr;
			},
			type: 'POST',
			url: '../usuarios/usuarios',
			data: {},
			success: function(data){
				//Do something on success
				//alert(data)
			}
		});
		*/
	}
},"#main_menu_usuarios");

//Ordenar
$(document).on({
	click:function(){
		var columna=$(this).index();
		//Limpiar todos los campos por ordenar
		var este=$(this);
		//alert(este.text()+" - "+este.children(".sistema_order").data("order"))
		var direccion=este.children(".sistema_order").data("order");
		var otro=$(".sistema_order");
		otro.data("order",0);
		otro.html("&#xe824;");
		
		
		if(direccion==0){
			este.children(".sistema_order").data("order",1);
			este.children(".sistema_order").html("&#xf175;");
		}else{
			este.children(".sistema_order").data("order",0);
			este.children(".sistema_order").html("&#xf176;");
		}
		
		//$("#sistema_filter").val(.children(".sistema_order").data("order"))
		if(columna!=6){
			// doble flecha
			var $divs = $(".sistema_row_registro");
			var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
				if(direccion==0){
					return $(a).find("div:eq("+columna+")").text().toLowerCase().localeCompare($(b).find("div:eq("+columna+")").text().toLowerCase());
				}else{
					return $(b).find("div:eq("+columna+")").text().toLowerCase().localeCompare($(a).find("div:eq("+columna+")").text().toLowerCase());
				}
			});

			$("#sistema_order_by").html(alphabeticallyOrderedDivs);
		}
	}
},"#sistema_table > div");


$(document).on('touchstart', '.sistema_row_registro', function(event){

});

$(document).on({
	click:function(){
		/*
		sistema_loading_show();
		setTimeout(function(){
					sistema_loading_hide();
					},250);
		*/
        $("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_responsiveModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Agregar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		$("#sistema_modalContenido").html('<div id="usuarios_photo_profile_add"></div>\
										   <input type="file" name="foto" id="usuarios_subir_imagen" accept="image/*">\
										   <div id="usuario_panel_izquierdo">\
											   <div>Usuario <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_user_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_user">Debes ingresar un usuario.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_user_exist">El usuario ya existe.</div>\
											   <div class="usuarios_margenTitulo">Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form" id="usuarios_pass1_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_pass">Debes ingresar una contraseña.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_pass_match1">Las Contraseñas no coinciden.</div>\
											   <div class="usuarios_margenTitulo">Repetir Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form" id="usuarios_pass2_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_pass2">Debes ingresar una contraseña.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_pass_match2">Las Contraseñas no coinciden.</div>\
											   <div class="usuarios_margenTitulo">Nombre <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_name_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_name">Debes ingresar un nombre.</div>\
											   <div class="usuarios_margenTitulo">Apellidos <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_lastname_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_lastname">Debes ingresar un apellido.</div>\
											   <div class="usuarios_margenTitulo">Nivel <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
													<select class="usuario_select_form" id="usuarios_level_input"><option>x</option></select>\
												</label>\
												<div class="usuarios_error_message" >Debes ingresar un nombre.</div>\
										   </div>\
										   <div id="usuario_panel_derecho">\
										   		<div>Sucursal <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
													<select class="usuario_select_form" id="usuarios_branchoffice_input"><option>x</option></select>\
												</label>\
												<div class="usuarios_margenTitulo">Telefono</div>\
												<input type="text" class="usuario_input_form" id="usuarios_phone_input">\
												<div class="usuarios_margenTitulo">Correo</div>\
												<input type="text" class="usuario_input_form" id="usuarios_email_input">\
												<div class="usuarios_error_message" id="usuarios_validation_email">El correo no es valido.</div>\
												<div class="usuarios_margenTitulo">Calle</div>\
												<input type="text" class="usuario_input_form" id="usuarios_street_input">\
												<div class="usuarios_margenTitulo">Colonia</div>\
												<input type="text" class="usuario_input_form" id="usuarios_colony_input">\
												<div class="usuarios_margenTitulo">Estado</div>\
												<input type="text" class="usuario_input_form" id="usuarios_state_input">\
										   </div>\
										   <div class="sistema_fixSpace"></div>\
										   <div id="usuario_add" class="sistema_button_round" data-nombre="Agregar">\
												Agregar\
										   </div>');
		/*<!--style="border: 1px solid #d24d57;"-->
		var datos=new FormData();
		datos.append("usuario",'spank');
		datos.append("sucursal",JSON.stringify({"user":"hard","pass":"ass"}));
                    
		$.ajax({
			type: 'POST',
			data: datos,
			url: '../usuarios/testeo',
			cache: false,
			dataType: 'json',
			processData: false,
			contentType: false,
			success: function(data) {
				alert(data)
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(ajaxOptions);
			}
		});
		*/
	}
},"#usuarios_agregar");

$(document).on({
	click:function(){
		$.ajax({
			type: 'POST',
			data: {"id":$(this).data("id")},
			url: '../usuarios/usuarioCompleto',
			dataType: 'json',
			success: function(data) {
				alert(JSON.stringify(data))
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("Ruta: "+this.url+".\nError:"+thrownError+".\nError:"+xhr.responseText)
			}
		});
		
        $("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_responsiveModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Editar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		$("#sistema_modalContenido").html('<div id="usuarios_photo_profile_add"></div>\
										   <input type="file" name="foto" id="usuarios_subir_imagen" accept="image/*">\
										   <div id="usuario_panel_izquierdo">\
											   <div>Usuario <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_user_input" readonly>\
											   <div class="usuarios_error_message" id="usuarios_validation_user">Debes ingresar un usuario.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_user_exist">El usuario ya existe.</div>\
											   <div class="usuarios_margenTitulo">Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form" id="usuarios_pass1_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_pass">Debes ingresar una contraseña.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_pass_match1">Las Contraseñas no coinciden.</div>\
											   <div class="usuarios_margenTitulo">Repetir Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form" id="usuarios_pass2_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_pass2">Debes ingresar una contraseña.</div>\
											   <div class="usuarios_error_message" id="usuarios_validation_pass_match2">Las Contraseñas no coinciden.</div>\
											   <div class="usuarios_margenTitulo">Nombre <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_name_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_name">Debes ingresar un nombre.</div>\
											   <div class="usuarios_margenTitulo">Apellidos <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" id="usuarios_lastname_input">\
											   <div class="usuarios_error_message" id="usuarios_validation_lastname">Debes ingresar un apellido.</div>\
											   <div class="usuarios_margenTitulo">Nivel <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
													<select class="usuario_select_form" id="usuarios_level_input"><option>x</option></select>\
												</label>\
												<div class="usuarios_error_message" >Debes ingresar un nombre.</div>\
										   </div>\
										   <div id="usuario_panel_derecho">\
										   		<div>Sucursal <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
													<select class="usuario_select_form" id="usuarios_branchoffice_input"><option>x</option></select>\
												</label>\
												<div class="usuarios_margenTitulo">Telefono</div>\
												<input type="text" class="usuario_input_form" id="usuarios_phone_input">\
												<div class="usuarios_margenTitulo">Correo</div>\
												<input type="text" class="usuario_input_form" id="usuarios_email_input">\
												<div class="usuarios_error_message" id="usuarios_validation_email">El correo no es valido.</div>\
												<div class="usuarios_margenTitulo">Calle</div>\
												<input type="text" class="usuario_input_form" id="usuarios_street_input">\
												<div class="usuarios_margenTitulo">Colonia</div>\
												<input type="text" class="usuario_input_form" id="usuarios_colony_input">\
												<div class="usuarios_margenTitulo">Estado</div>\
												<input type="text" class="usuario_input_form" id="usuarios_state_input">\
										   </div>\
										   <div class="sistema_fixSpace"></div>\
										   <div id="usuario_update" class="sistema_button_round" data-nombre="Guardar">\
												Guardar\
										   </div>');
	}
},".usuario_editar");

$(document).on({
	click:function(){
		var este=$(this);
		var identificador=este.attr("id");
		btn_start_girar(identificador);
		setTimeout(function(){
			if(validar_insercion()){
				var datos=new FormData();
				datos.append("foto",$("#usuarios_subir_imagen")[0].files[0]);
				datos.append("usuario",$("#usuarios_user_input").val());
				datos.append("pass",$("#usuarios_pass1_input").val());
				datos.append("rpass",$("#usuarios_pass2_input").val());
				datos.append("nombre",$("#usuarios_name_input").val());
				datos.append("apellido",$("#usuarios_lastname_input").val());
				datos.append("nivel",$("#usuarios_level_input option:selected").val());
				datos.append("sucursal",$("#usuarios_branchoffice_input option:selected").val());
				
				datos.append("telefono",$("#usuarios_phone_input").val());
				datos.append("correo",$("#usuarios_email_input").val());
				datos.append("calle",$("#usuarios_street_input").val());
				datos.append("colonia",$("#usuarios_colony_input").val());
				datos.append("estado",$("#usuarios_state_input").val());
				
				/*                                 */
				$.ajax({
						type: 'POST',
						data: datos,
						url: '../usuarios/insertarUsuario',
						cache: false,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(data) {
							switch(data) {
								case "existe":
									$("#usuarios_user_input").addClass('usuarios_error_message_input');
									$("#usuarios_validation_user_exist").css({"display":"block"});
									btn_stop_girar_bad(identificador);
								break;
								case "imagen":
									alert("Ocurrio un problema al procesar la imagen, verifica que el formato de la imagen sea JPEG, JPG o PNG");
									btn_stop_girar_bad(identificador);
								break;
								case "validation":
									alert("Uno o mas campos estan incorrectos, favor de verificarlos");
									btn_stop_girar_bad(identificador);
								break;
								case "sesion":
									location.reload();
								break;
								case "true":
									$('#users_form_new_user')[0].reset();
									btn_stop_girar_good(identificador);
									//$("#main_menu_usuarios").trigger("click");
								break;
							}
							$("#sistema_modalContenido .usuarios_error_message_input:first").focus();
						},
						error: function (xhr, ajaxOptions, thrownError) {
								btn_stop_girar_bad(identificador);
								alert("Ruta: "+this.url+".\nError:"+thrownError+".\nError:"+xhr.responseText)
						}
				});
				/*                                  */
			}else{
				//cuando se invalida la insercion se hace focus al primer elemento con un error
				$("#sistema_modalContenido .usuarios_error_message_input:first").focus();
				btn_stop_girar_bad(identificador);
			}
		},280);
		/*btn_start_girar($(this).attr("id"));
		setTimeout(function(){
			btn_stop_girar_good("usuario_add")
		},3000);*/
	}
},"#usuario_add");

function validar_insercion(){
	var valor=true;
	//valida que el usuario se capture
	var user_validation=myTrim($('#usuarios_user_input').val());
	if(user_validation.length==0){
		$("#usuarios_user_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_user").css({"display":"block"});
		valor=false;
	}
	//valida que la contraseña se capture
	var pass_validation=myTrim($('#usuarios_pass1_input').val());
	if(pass_validation.length==0){
		$("#usuarios_pass1_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_pass").css({"display":"block"});
		valor=false;
	}
	
	//valida que la contraseña se capture
	var repass_validation=myTrim($('#usuarios_pass2_input').val());
	if(repass_validation.length==0){
		$("#usuarios_pass2_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_pass2").css({"display":"block"});
		valor=false;
	}
	
	//valida que las claves sean iguales
	if(pass_validation!=repass_validation){
		$("#usuarios_pass1_input").addClass('usuarios_error_message_input');
		$("#usuarios_pass2_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_pass_match1, #usuarios_validation_pass_match2").css({"display":"block"});
		valor=false;
	}
	
	//valida que el nombre se capture
	var name=myTrim($('#usuarios_name_input').val());
	if(name.length==0){
		$("#usuarios_name_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_name").css({"display":"block"});
		valor=false;
	}
	
	//valida que el nombre se capture
	var lastname=myTrim($('#usuarios_lastname_input').val());
	if(lastname.length==0){
		$("#usuarios_lastname_input").addClass('usuarios_error_message_input');
		$("#usuarios_validation_lastname").css({"display":"block"});
		valor=false;
	}
	
	if($('#usuarios_email_input').val().length>0){
		var email=myTrim($('#usuarios_email_input').val());
		if(!validateEmail(email)){
			$("#usuarios_email_input").addClass('usuarios_error_message_input');
			$("#usuarios_validation_email").css({"display":"block"});
			valor=false;
		}
	}
	
	return valor;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

$(document).on({
    focusout:function(){
        var identificador=$(this).attr("id");
		$(this).removeClass("usuarios_error_message_input");
		
		//oculto los textos de error del input de usuario
		if(identificador=='usuarios_user_input'){
			$("#usuarios_validation_user, #usuarios_validation_user_exist").removeAttr("style")
		}
		
		//oculto los textos de error del input de contraseña
		if(identificador=='usuarios_pass1_input'){
			$("#usuarios_validation_pass, #usuarios_validation_pass_match1").removeAttr("style")
		}
		
		//oculto los textos de error del input de repetir contraseña
		if(identificador=='usuarios_pass2_input'){
			$("#usuarios_validation_pass2, #usuarios_validation_pass_match2").removeAttr("style")
		}
		
		//oculto los textos de error del input de nombre
		if(identificador=='usuarios_name_input'){
			$("#usuarios_validation_name").removeAttr("style")
		}
		
		//oculto los textos de error del input de apellidos
		if(identificador=='usuarios_lastname_input'){
			$("#usuarios_validation_lastname").removeAttr("style")
		}
		
		//oculto los textos de error del input de correo
		if(identificador=='usuarios_email_input'){
			$("#usuarios_validation_email").removeAttr("style")
		}
    }
},".usuario_input_form");

$(document).on({
    click:function(){
        if(parseInt($("#access_pagination").data("actual"))>0){
			$("#sistema_order_mascara").removeAttr("style");
            var movimiento=740;
            var pagina=parseInt($("#access_pagination").data("actual"))-1;
            $("#access_pagination").data("actual",pagina)
            $("#sistema_order_by").css({'transform':'translate3d(0px,-'+movimiento*pagina+'px,0px)'});
            $("#pagination_position").html((pagina+1)+" / "+$("#access_pagination").data("total"));
            pagination_hd_access();
        }
    }
},"#access_prev_p");

$(document).on({
    click:function(){
        //alert(parseInt($("#access_pagination").data("actual"))+" - "+parseInt($("#access_pagination").data("total")))
        if(parseInt($("#access_pagination").data("actual"))<(parseInt($("#access_pagination").data("total")))-1){
            
            var movimiento=740;
            var pagina=parseInt($("#access_pagination").data("actual"))+1;
            //alert($("#access_pagination").data("total"))
            $("#access_pagination").data("actual",pagina)
            
            $("#sistema_order_by").css({'transform':'translate3d(0px,-'+movimiento*pagina+'px,0px)'});
            $("#pagination_position").html((pagina+1)+" / "+$("#access_pagination").data("total"));
            pagination_hd_access();
        }
    }
},"#access_next_p");

function pagination_hd_access(){
    if(parseInt($("#access_pagination").data("actual"))==0){
        $("#access_prev_p").addClass("arrow_disabled");
    }else{
        $("#access_prev_p").removeClass("arrow_disabled");
    }
    if(parseInt($("#access_pagination").data("actual"))==(parseInt($("#access_pagination").data("total"))-1)){
        $("#access_next_p").addClass("arrow_disabled");
		var contar_filas=$(".sistema_row_registro:visible").length;
		
		var c_pag=0;
		if(contar_filas % 20 === 0){
			c_pag=contar_filas/20;
		}else{
			c_pag=parseInt(contar_filas/20);
		}
		var nuevo_t=contar_filas-(c_pag*20);
		$("#sistema_order_mascara").css({"height":(nuevo_t*37)+"px"});
		
    }else{
        $("#access_next_p").removeClass("arrow_disabled");
    }
}

function calcular_paginacion_access(){
    var contar_filas=0;
    $(".sistema_row_registro").each(function(){
        if($(this).is(":visible")){
            contar_filas++;
        }
    });
    if(contar_filas>20){
        $("#access_pagination").css({"display":"block"});
    }else{
        $("#access_pagination").removeAttr("style");
    }
    
    var c_pag=0;
    if(contar_filas % 20 === 0){
        c_pag=contar_filas/20;
    }else{
        c_pag=parseInt(contar_filas/20);
        c_pag+=1;
    }

    $("#access_pagination").data("total",c_pag);
    $("#pagination_position").html("1 / "+parseInt(c_pag));
}

$(document).on({
	keyup:function(){
		$("#sistema_order_mascara").removeAttr("style");
		$("#sistema_order_by").removeAttr("style");
		
		$(".sistema_row_registro").hide();
		var data = this.value;
	
		$(".sistema_row_registro").filter(function (i, v) {
			var $t = $(this);
			if($t.is(":containsIN('" + data + "')")){
				$t.closest(".sistema_row_registro").show();
			}
		});
		$("#access_pagination").data("actual",0);
        //pagination_hd_access()
		$("#access_prev_p").addClass("arrow_disabled");
		$("#access_next_p").removeClass("arrow_disabled")
        calcular_paginacion_access();
	}
},"#sistema_filter");

$(document).on({
	click:function(){
		$("#usuarios_subir_imagen").trigger("click");
	}
},"#usuarios_photo_profile_add");

$(document).on({
	change:function(){
		var src = createObjectURL( $(this)[0].files[0] );
		var extension=$(this).val().split(".");
		extension=extension[extension.length-1];
		extension=extension.toLowerCase();
		if(extension=="jpg" || extension=="jpeg" || extension=="png"){
			$("#usuarios_photo_profile_add").css({'background-image':"url("+src+")"});
		}else{
			$(this).val('');
			$("#usuarios_photo_profile_add").removeAttr("style");
			$("#usuarios_photo_profile_add").css({"background-image":"url("+$("#perfil_photo_profile").data("imagen")+")"});
			alert("El formato de esa imagen no es valido.");
		}
	}
},"#usuarios_subir_imagen");
/*
$(document).on({
	click:function(){
		$("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_eliminarModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Eliminar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		var este=$(this).closest(".sistema_row_registro");
		$("#sistema_modalContenido").html('¿Estas seguro que deseas eliminar a "'+este.children(".usuarios_reg_row1").text()+" "+este.children(".usuarios_reg_row2").text()+'"?\
											<br><br>\
											<div id="usuario_add" class="sistema_button_round" data-nombre="Si">\
												Si\
										   </div>')
	}
},".usuario_eliminar");
*/

$(document).on({
	click:function(){
		$("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_bloquearModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Eliminar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		var este=$(this).closest(".sistema_row_registro");
		var mensaje=$(this).data("lock")==1?'bloquear':'desbloquear';
		$("#sistema_modalContenido").html('¿Estas seguro que deseas '+mensaje+' a <span class="sistema_cursiva">"'+este.children(".usuarios_reg_row1").text()+" "+este.children(".usuarios_reg_row2").text()+'"</span> ?\
											<br><br>\
											<div id="usuario_lock" class="sistema_button_round" data-nombre="Si" data-id="'+$(this).data("id")+'" data-lock="'+$(this).data("lock")+'">\
												Si\
										   </div>')
	}
},".usuario_bloquear");

$(document).on({
	click:function(){
		var este=$(this);
		var identificador=este.attr("id");
		var id=este.data("id");
		var icono=este.data("lock")==1?'&#xe80b;':'&#xf13e;';
		var estado=este.data("lock")==1?0:1;
		btn_start_girar(identificador);
		setTimeout(function(){
			$.ajax({
				type: 'POST',
				url: '../usuarios/actualizarStatus',
				dataType:"json",
				data:"id="+id+"&status="+estado,
				timeout:tiempo,
				success: function(data) {
					//alert(JSON.stringify(data));
					switch(data){
						case "sesion":
							location.reload();
						break;
						case "permiso":
						break;
						default:
							$('.usuario_bloquear[data-id="'+id+'"]').html(icono).data("lock",estado);
							btn_stop_girar_good(identificador);
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert("Ruta: "+this.url+". Error:"+xhr.responseText)
					btn_stop_girar_bad(identificador)
				}
			});
		},280);
	}
},"#usuario_lock");