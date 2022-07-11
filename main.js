const formCalculadora = document.getElementById('formCalculadora');


formCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    clickBtnCalcular();
})

function clickBtnCalcular(){
    var infoImc = '';

    var nombre = document.getElementById('nombre').value; 

    var txtTipoDocumento = document.getElementById('tipoDocumento');var tipoDocumento = txtTipoDocumento.value;

    var txtDocumento = document.getElementById('documento');var documento = txtDocumento.value;

    var txtPeso = document.getElementById('peso');var peso = txtPeso.value;

    var txtAltura = document.getElementById('altura');var altura = txtAltura.value;

    var txtEdad = document.getElementById('edad');var edad = txtEdad.value;

    var txtSexo = document.getElementById('genero');var sexo = txtSexo.value;

    var txtActividad = document.getElementById('actividad');var actividad = txtActividad.value;

    var caloriasMTB = MTB(peso, altura, edad, sexo, actividad);

    var imc = IMC(peso, altura);

    infoImc = infoImc2(imc);

    var minPeso = imcMinIdeal(altura);

    var maxPeso = imcMaxIdeal(altura);

    var grasa = totalGrasa(imc, edad, sexo);

    var infoGrasa = informacionGrasa(grasa, sexo);

    var infoGrasaIdeal = grasaIdeal(sexo);

    var grupoPoblacional = grupoPoblacion(edad);



    var finalRespuesta = document.getElementById('inputNombre');
    finalRespuesta.innerHTML = "<p>Hola <b>" + nombre + "</b> te estas identificando con la <b>" + tipoDocumento + "</b> NO.<b>" + documento + "</b>, haces parte del grupo poblacional de <b>" + grupoPoblacional + "</b><br>Calorias diarias: <b>" + caloriasMTB + "</b>.<br>Imc: <b>" + imc + "</b>.  <b>" + infoImc + "</b>.<br>Peso ideal: <b>" + minPeso + "Kg - " + maxPeso + "Kg</b>.<br>% Grasa: <b>" + grasa + "</b>. <b>" + infoGrasa + "</b><br>Grasa Ideal: <b>" + infoGrasaIdeal + "</b>.<br></p>";
}

function MTB (peso, altura, edad, sexo, actividad){
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    var totalCaloriasMTB;
    if (sexo === 'Masculino') {
        totalCaloriasMTB = actividad * ((multiplicadorTMB.peso * peso) +
                                             (multiplicadorTMB.altura * altura) -
                                             (multiplicadorTMB.edad * edad)) + 5;
    } else {
        totalCaloriasMTB = actividad * ((multiplicadorTMB.peso * peso) +
                                             (multiplicadorTMB.altura * altura) -
                                             (multiplicadorTMB.edad * edad)) -161
    }
    return totalCaloriasMTB;
}

function grupoPoblacion(edad){
    var informacion;
    if (14 < edad && edad < 30) {
        informacion = 'Jovenes';
    } else if (29 < edad && edad < 60) {
        informacion = 'Adultos';        
    } else {
        informacion = 'Adultos Mayores';
    }
    return informacion;
}

function IMC(peso, altura){
    totalImc = (peso / (altura * altura))*10000;
    return totalImc.toFixed(1);
}

function infoImc2(imc){
    var info = '';
    if(imc < 18.5){info = 'Bajo Peso';}
    if(18.5 <= imc && imc < 25){info = 'Peso Normal';}
    if(25 <= imc && imc < 30){info = 'Sobrepeso';}
    if(30 <= imc && imc < 35){info = 'Obesidad tipo I';}
    if(35 <= imc && imc < 40){info = 'Obesidad tipo II';}
    else{info = 'Obesidad tipo III';}
    return info;
}

function imcMinIdeal(altura){
    var minPeso = altura * altura * 18.5 / 10000;
    return minPeso.toFixed();
}

function imcMaxIdeal(altura){
    var maxPeso = altura * altura * 24.9 / 10000;
    return maxPeso.toFixed();
}

function totalGrasa(imc, edad, sexo){
    var genero;
    if (sexo === 'Masculino') {
        genero = 1;
    } else{
        genero = 0;
    }
    var totalGrasa = 1.2 * imc + 0.23 * edad - 10.8 * (genero) - 5.4;
    return totalGrasa.toFixed(1);
}

function informacionGrasa(grasa, sexo){
    var informacion = '';
    if (sexo === 'Masculino') {
        if (grasa < 5) {informacion = 'Grasa Esencial'}
        if (5 <= grasa && grasa < 13) {informacion = 'Atletas'}
        if (14 <= grasa && grasa < 17) {informacion = 'Fitness'}
        if (17 <= grasa && grasa < 24) {informacion = 'Aceptable'}
        if (24 <= grasa) {informacion = 'Obesidad'}
    }
    if (sexo === 'Femenino') {
        if (grasa < 13) {informacion = 'Grasa Esencial'}
        if (13 <= grasa && grasa < 20) {informacion = 'Atletas'}
        if (20 <= grasa && grasa < 24) {informacion = 'Fitness'}
        if (24 <= grasa && grasa < 31) {informacion = 'Aceptable'}
        if (31 <= grasa) {informacion = 'Obesidad'}
    }
    return informacion;
}

function grasaIdeal(sexo){
    var informacion = '';
    if (sexo === 'Masculino') {
        informacion = '18-24 %';
    } else {
        informacion = '25-31 %';
    }
    return informacion;
}