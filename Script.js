var indiceEncontrado = -1;

var boolDataMode_XML = 1;
var boolDataMode_JSON = 2;
var boolDataMode = boolDataMode_XML;

var txt = "<alumnos>" 
txt += 	"<alumno>" 
txt +=	"<clave>123456</clave>" 
txt +=	"<nombre>Juan</nombre>"
txt +=	"<apellidoP>Perez</apellidoP>"
txt +=	"<apellidoM>Ordaz</apellidoM>"
txt +=	"<correo>Wea@hotmail</correo>"
txt +=	"<celular>345678</celular>"
txt +=	"<fecha>123412</fecha>"
txt +=	"<color>345621</color>"
txt +=	"<alergia>Prro</alergia>"
txt +=	"<mes>Enero</mes>"
txt +=	"<lugar>SIEMENS</lugar>"
txt += "</alumno>" 
txt += "</alumnos>";

var parser = new DOMParser();
var xmlDoc = parser.parseFromString(txt,"text/xml");

var txtj = '{"alumno":['
			+ '{ "clave":"123450", "nombre":"Juan", '
				+'"sexo":"Masculino", "edoCivil":"Soltero"},'
			+ '{ "clave":"123451", "nombre":"Lety", '
				+'"sexo":"Femenino", "edoCivil":"Soltero"}'
			+ ']}';
			
var alumnos = JSON.parse(txtj);

function sendData()
{
	clave = document.getElementById("claveA").value;
	nombre = document.getElementById("nombreA").value;
	apellidoP = document.getElementById("apPaternoA").value;
	apellidoM = document.getElementById("apMaternoA").value;
	correo = document.getElementById("correoA").value;
	celular = document.getElementById("celularA").value;
	fecha = document.getElementById("fechaA").value;
	color = document.getElementById("colorA").value;
	alergia = document.getElementById("alergiaA").value;
	//mes = "Enero";
	if(document.getElementById("visitaEA").checked == true)
		mes = "Enero";
	else if(document.getElementById("visitaMA").checked == true)
		mes = "Mayo";
	else if(document.getElementById("visitaAA").checked == true)
		mes = "Agosto";
	else
		mes = "Septiembre";
	lugar = document.getElementById("lugarA").value;
	
	if (boolDataMode == boolDataMode_XML)
	{
		newEleClave = xmlDoc.createElement("clave");
		newTxtClave = xmlDoc.createTextNode(clave);
		newEleClave.appendChild(newTxtClave);

		newEleNombre = xmlDoc.createElement("nombre");
		newTxtNombre = xmlDoc.createTextNode(nombre);
		newEleNombre.appendChild(newTxtNombre);
		
		newEleApellidoP = xmlDoc.createElement("apellidoP");
		newTxtApellidoP = xmlDoc.createTextNode(apellidoP);
		newEleApellidoP.appendChild(newTxtApellidoP);
	
		newEleApellidoM = xmlDoc.createElement("apellidoM");
		newTxtApellidoM = xmlDoc.createTextNode(apellidoM);
		newEleApellidoM.appendChild(newTxtApellidoM);
		
		newEleCorreo = xmlDoc.createElement("correo");
		newTxtCorreo = xmlDoc.createTextNode(correo);
		newEleApellidoM.appendChild(newTxtCorreo);
		
		newEleCelular = xmlDoc.createElement("celular");
		newTxtCelular = xmlDoc.createTextNode(celular);
		newEleCelular.appendChild(newTxtCelular);
		
		newEleFecha = xmlDoc.createElement("fecha");
		newTxtFecha = xmlDoc.createTextNode(fecha);
		newEleFecha.appendChild(newTxtFecha);
		
		newEleColor = xmlDoc.createElement("color");
		newTxtColor = xmlDoc.createTextNode(color);
		newEleColor.appendChild(newTxtColor);
		
		newEleAlergia = xmlDoc.createElement("alergia");
		newTxtAlergia = xmlDoc.createTextNode(alergia);
		newEleAlergia.appendChild(newTxtAlergia);
		
		newEleMes = xmlDoc.createElement("mes");
		newTxtMes = xmlDoc.createTextNode(mes);
		newEleMes.appendChild(newTxtMes);
		
		newEleLugar = xmlDoc.createElement("lugar");
		newTxtLugar = xmlDoc.createTextNode(lugar);
		newEleLugar.appendChild(newTxtLugar);
	
		newEleA = xmlDoc.createElement("alumno");
		newEleA.appendChild(newEleClave);
		newEleA.appendChild(newEleNombre);
		newEleA.appendChild(newEleApellidoP);
		newEleA.appendChild(newEleApellidoM);
		newEleA.appendChild(newEleCorreo);
		newEleA.appendChild(newEleCelular);
		newEleA.appendChild(newEleFecha);
		newEleA.appendChild(newEleColor);
		newEleA.appendChild(newEleAlergia);
		newEleA.appendChild(newEleMes);
		newEleA.appendChild(newEleLugar);

		xmlDoc.getElementsByTagName("alumnos")[0].appendChild(newEleA);
	}//if
	else 
	{
		var objAlumno = {
			clave: clave,
			nombre: nombre,
			apellidoP: apellidoP,
			apellidoM: apellidoM,
			correo: correo,
			celular: celular,
			fecha: fecha,
			color: color,
			alergia: alergia,
			mes: mes,
			lugar: lugar,
		};
		
		alumnos.alumno.push(objAlumno);
	}//else JSON
	alert("Alta Realizada.");
}//sendData

function deleteData()
{
	clave = document.getElementById("claveB").value;
	i = 0;
	flag = false;
	
	if (boolDataMode = boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("alumno");
		l = x.length;
	}//if-XML
	else 
	{
		l = alumnos.alumno.length;
	}//else-JSON
	
	
	while ((i<l) && (flag==false))
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodoValue == clave)
			{	//Se encontro registro a borrar
				baja = confirm("Dar de baja a: "
								+x[i].childNodes[0].childNodes[0].nodoValue
								+" - "
								+x[i].childNodes[0].childNodes[0].nodoValue
								+ "?");
				if (baja == true)
				{
					x[i].parentNode.removeChild(x[i]);
					alert("Alumno dado de baja.");
				}
				flag = true;
			}
			else
				i++;
		}//if
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i].clave == clave)
			{	//Se encontro registro a borrar
				baja = confirm("Dar de baja a: "
								+alumnos.alumno[i].clave
								+" - "
								+alumnos.alumno[i].nombre
								+ "?");
				if (baja == true)
				{
					alumnos.alumno.splice(i,1);
					alert("Alumno dado de baja.");
				}
				flag = true;
			}
			else
				i++;
		}//else-JSON
	}//while
	alert("Baja Realizada.");
}

function changeData()
{
	clave = document.getElementById("buscarC").value;
	i=0;
	flag = false;
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("alumno");
		l = x.length;
	}//if-XML
	else {
		l = alumnos.alumno.length;
	}//else-JSON
	
	while (i < l && flag == false)
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodeValue == clave)
			{
				//Copia de los valores del documento XML a controles HTML de la página
				document.getElementById("claveC").value = x[i].childNodes[0].childNodes[0].nodeValue;
				document.getElementById("nombreC").value = x[i].childNodes[1].childNodes[0].nodeValue;
				document.getElementById("apPaternoC").value = x[i].childNodes[2].childNodes[0].nodeValue;
				document.getElementById("apMaternoC").value = x[i].childNodes[3].childNodes[0].nodeValue;	
				document.getElementById("correoC").value = x[i].childNodes[4].childNodes[0].nodeValue;
				document.getElementById("celularC").value = x[i].childNodes[5].childNodes[0].nodeValue;
				document.getElementById("fechaC").value = x[i].childNodes[6].childNodes[0].nodeValue;
				document.getElementById("colorC").value = x[i].childNodes[7].childNodes[0].nodeValue;
				document.getElementById("alergiaC").value = x[i].childNodes[8].childNodes[0].nodeValue;
				if (x[i].childNodes[9].childNodes[0].nodeValue == "Enero")
				{
					document.getElementById("visitaEC").checked = true;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = false;
				}
				else if (x[i].childNodes[9].childNodes[0].nodeValue == "Mayo")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = true;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = false;
				}
				else if (x[i].childNodes[9].childNodes[0].nodeValue == "Agosto")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = true;
					document.getElementById("visitaSC").checked = false;
				}
				else if (x[i].childNodes[9].childNodes[0].nodeValue == "Septiembre")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = true;
				}
				document.getElementById("lugarC").value = x[i].childNodes[10].childNodes[0].nodeValue;
					indiceEncontrado = i;
					flag = true;
			}//if
			else{
				i++;
			}
		}//if-XML
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i].clave == clave)
			{
				document.getElementById("claveC").value = alumnos.alumno[i].clave;
				document.getElementById("nombreC").value = alumnos.alumno[i].nombre;
				document.getElementById("apPaternoC").value = alumnos.alumno[i].apellidoP;
				document.getElementById("apMaternoC").value = alumnos.alumno[i].apellidoM;	
				document.getElementById("correoC").value = alumnos.alumno[i].correo;
				document.getElementById("celularC").value = alumnos.alumno[i].celular;
				document.getElementById("fechaC").value = alumnos.alumno[i].fecha;
				document.getElementById("colorC").value = alumnos.alumno[i].color;
				document.getElementById("alergiaC").value = alumnos.alumno[i].alergia;
				x[i].childNodes[1].childNodes[0].nodeValue;
				if (alumnos.alumno[i].mes == "Enero")
				{
					document.getElementById("visitaEC").checked = true;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = false;
				}
				else if (alumnos.alumno[i].mes == "Mayo")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = true;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = false;
				}
				else if (alumnos.alumno[i].mes == "Agosto")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = true;
					document.getElementById("visitaSC").checked = false;
				}
				else if (alumnos.alumno[i].mes == "Septiembre")
				{
					document.getElementById("visitaEC").checked = false;
					document.getElementById("visitaMC").checked = false;
					document.getElementById("visitaAC").checked = false;
					document.getElementById("visitaSC").checked = true;
				}
				document.getElementById("lugarC").value = alumnos.alumno[i].lugar;
				indiceEncontrado = i;
				flag = true;
				}//if
				else
					i++;
		}//else-JSON
	}//while
	
	if (flag)
		document.getElementById("formCambios").style.display = "block";
	else 
	{
		indiceEncontrado = -1;
		alert("Not Found");
	}
}//change data

function updateData () 
{
	i = indiceEncontrado;
	
	if (i >= 0)
	{
		//Si fue encontrado
		if (document.getElementById("visitaEC").checked = true)
			mes = Enero;
		else if(document.getElementById("visitaMC").checked = true)
			mes = Mayo;
		else if(document.getElementById("visitaAC").checked = true)
			mes = Agosto;
		else if(document.getElementById("visitaSC").checked = true)
			mes = Septiembre;

		if (boolDataMode == boolDataMode_XML)
		{
			x=xmlDoc.getElementById("alumno");

			
			x[i].childNodes[0].childNodes[0].nodeValue = document.getElementById("claveC").value;
				
			x[i].childNodes[1].childNodes[0].nodeValue = document.getElementById("nombreC").value;
				
			x[i].childNodes[2].childNodes[0].nodeValue = document.getElementById("apPaternoC").value;
				
			x[i].childNodes[3].childNodes[0].nodeValue = document.getElementById("apMaternoC").value;
				
			x[i].childNodes[4].childNodes[0].nodeValue = document.getElementById("correoC").value;
				
			x[i].childNodes[5].childNodes[0].nodeValue = document.getElementById("celularC").value;
				
			x[i].childNodes[6].childNodes[0].nodeValue = document.getElementById("fechaC").value;
				
			x[i].childNodes[7].childNodes[0].nodeValue = document.getElementById("colorC").value;
				
			x[i].childNodes[8].childNodes[0].nodeValue = document.getElementById("alergiaC").value;
			
			x[i].childNodes[9].childNodes[0].nodeValue = mes;
							
			x[i].childNodes[10].childNodes[0].nodeValue = document.getElementById("lugarC").value;
			
		}//if-XML
		else
		{
			alumnos.alumno[i].clave = document.getElementById("claveC").value;
			alumnos.alumno[i].nombre = document.getElementById("nombreC").value;
			alumnos.alumno[i].apellidoP = document.getElementById("apPaternoC").value;
			alumnos.alumno[i].apellidoM = document.getElementById("apMaternoC").value;	
			alumnos.alumno[i].correo = document.getElementById("correoC").value;
			alumnos.alumno[i].celular = document.getElementById("celularC").value;
			alumnos.alumno[i].fecha	= document.getElementById("fechaC").value;
			alumnos.alumno[i].color = document.getElementById("colorC").value;
			alumnos.alumno[i].alergia = document.getElementById("alergiaC").value;
			alumno.alumno[i].mes = mes;
			alumnos.alumno[i].lugar = document.getElementById("lugarC").value;
		}//else-JSON
	}
	alert("Actualización Realizada");
}//updateData

function busqueda()
{
	campo = document.getElementById("campoBusqueda").value;
	valor = document.getElementById("textoBusqueda").value;
	cont = 0;
	
	if (boolDataMode == boolDataMode_XML){
		a = xmlDoc.getElementsByName("alumno");
		x = xmlDoc.getElementsByName(campo);
		l = a.length;
	}//if-XML
	else if (boolDataMode == boolDataMode_JSON)
	{
		l = alumnos.alumno.length;
	}
	tblResultados = document.getElementById("resultadoBusqueda");
	
	tabla.innerHTML = "";
	tabla.innerHTML = "<thead><tr>"
						+"<th>Clave</th>" 
						+"<th>Nombre</th>"
						+"<th>ApellidoP</th>"
						+"<th>ApellidoM</th>"
						+"<th>Correo</th>"
						+"<th>Celular</th>"
						+"<th>Fecha</th>"
						+"<th>Color</th>"
						+"<th>Alergia</th>"
						+"<th>Mes</th>"
						+"<th>Lugar</th>"
						+ "</tr></thead>"
						+ "<tbody>";

						
	for(i = 0; i < l; i++)
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].nodeValue == valor)
			{
			tabla.innerHTML += "<tr>"
								+ "<td>"
								+		x[i].childNodes[0].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[1].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[2].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[3].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[4].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[5].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[6].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[7].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[8].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[9].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[10].childNodes[0].nodeValue
								+ "</td>"
							+ "</tr>";
				cont++;
			}//if
		}//if-XML
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i][campo] == valor)
			{
				tblResultados.innerHTML += "<tr>"
								+ "<td>"
								+		alumnos.alumno[i].clave
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].nombre
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].apellidoP
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].apellidoM
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].correo
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].celular
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].fecha
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].color
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].alergia
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].mes
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].lugar
								+ "</td>"
							+ "</tr>";
				cont++;
			}//if
		}//else-JSON
	}
	tabla.innerHTML += "</tbody>";
	if (cont == 0)
		document.getElementById("message").innerHTML = "No hay coincidencias";
	else
		document.getElementById("message").innerHTML = "Se encontraron"+cont+" coincidencias";
	}

function reporte()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "block";
	
	var tabla = document.getElementById("tablaReporte");
	
	tabla.innerHTML = "";
	tabla.innerHTML = "<thead><tr>"
						+"<th>Clave</th>" 
						+"<th>Nombre</th>"
						+"<th>ApellidoP</th>"
						+"<th>ApellidoM</th>"
						+"<th>Correo</th>"
						+"<th>Celular</th>"
						+"<th>Fecha</th>"
						+"<th>Color</th>"
						+"<th>Alergia</th>"
						+"<th>Mes</th>"
						+"<th>Lugar</th>"
						+ "</tr></thead>"
						+ "<tbody>";

	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("alumno");
		l = x.length;
		
		for(i = 0; i < l; i++)
		{
			tabla.innerHTML += "<tr>"
								+ "<td>"
								+		x[i].childNodes[0].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[1].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[2].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[3].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[4].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[5].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[6].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[7].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[8].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[9].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[10].childNodes[0].nodeValue
								+ "</td>"
							+ "</tr>";
		}
	tabla.innerHTML += "</tbody>";
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		for(i = 0; i < alumnos.alumno.length; i++)
		{
			tblResultados.innerHTML += "<tr>"
								+ "<td>"
								+		alumnos.alumno[i].clave
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].nombre
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].apellidoP
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].apellidoM
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].correo
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].celular
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].fecha
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].color
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].alergia
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].mes
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].lugar
								+ "</td>"
							+ "</tr>";
		}
	}//JSON
}

function altas()
{
	document.getElementById("altas").style.display = "block";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
} //altas

function bajas()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "block";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
}

function cambios()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "block";
	document.getElementById("reporte").style.display = "none";
}

function buscar()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "block";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
}

