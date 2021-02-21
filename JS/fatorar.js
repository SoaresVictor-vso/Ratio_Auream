var max = 10; //valor lomite
var primos = [2, 3, 5];
var npr = primos.length;//numero de primos procurados
var fatorado = "";
var num = 0;
var pre, erp;
var final = "";
var genhtml = "<table>";


window.document.getElementById("calc").addEventListener("click", exe);
console.log("Running")
function exe()
{
    window.document.getElementById("desenv").innerHTML = "calculando...";
    //console.log("click");
    erp = window.document.getElementById("patinho");
    pre = erp.value;
    num = parseInt(pre);
    if(num == 1)
    {
        window.document.getElementById("resultado").innerHTML= "1";
    }
    else
    {
        fatorar();
    }
    
}

function getprimos() //calcula números primos
{
    for(var i = primos[primos.length-1]; primos.length < npr; i++){  //enquanto o número de primos for menor que npr, o script procura mais primos
        var c =0;
        for(j=0; j< primos.length; j++) //testa se um numero candidato "i" é divisível por cada um dos primos menores que ele.
        {
            if(i%primos[j]!=0)
            {
                c++;
                if(c==primos.length)
                {
                    //console.log(i);
                    primos.push(i);   //se "i" não for divisível por nenhum primo menor que ele, então é adicionado à lista de primos
                }
            }
        }
    }
}

function organizar() // organiza em forma de uma linha de calculo executável em JavaScript o resultado da fatoração e printa o número inicial no console para confirmar que não houve nenhum erro.
{
    for(h = primos.length -1;h >= 0; h-- ) //testa cada primo se é um dos fatores encontrados.
    {
        var substr =primos[h] + "*";
        var expoente = fatorado.split(substr).length - 1
        if(expoente > 0)                        //se expoente for maior que 0, ele registra o primo relativo a esse expoente e apaga esse primo de "fatorado" OBS: os primos são testado dos maiores para os menores, pois caso contrário, cada algarismo "2" dos primos maiores que 2 seriam apagados e o resultado seria imprevisível.
        {
            final += primos[h] + "<sup>" + expoente + "</sup>x";
            //console.log(primos[h] + "^" + expoente)
            for( var y = expoente; y > 0; y--)
            {
                fatorado = fatorado.replace(substr, "--");
            }
            //console.log(fatorado);
        }
    }
    final = final.substring(0, (final.length -1)); //remove o ultimo * de "final"
    window.document.getElementById("resultado").innerHTML= final;
    console.log(final);
    var init = eval(final); //calcula o valor representado por "final" para garantir que é o mesmo inicial
    console.log(init);
}

function fatorar() //fatora o número imputado
{
    window.document.getElementById("resultado").innerHTML= "";
    
    genhtml = "<table>";
    final = "";

    console.log("processo iniciado");

    var count = 0;
    for(num;1 < num ;) //enquanto o número imputado for maior que 1
    {  
        if(primos.length < count+1)  //testa se tem primos ainda não testados, e caso não, calcula um novo primo imediatamente acima do ultimo.
        {
            //console.log("primo < "+ (count+1))
            npr++;
            getprimos();
        }
        else
        {
            console.log("processando");
            //console.log("ok");
            if(num%primos[count] == 0) //se o numero imputado for divisível por um primo, efetua a divisão e adiciona esse primo na lista de divisores (variável "fatorado") e testa novamente se o número restante ainda divide por esse primo.
            {
                //console.log(primos[count]);
                genhtml += "<tr><td>" + num + "</td><td>|" + primos[count] + "</td></tr>";
                window.document.getElementById("desenv").innerHTML= genhtml;
                num = num/primos[count];
                var pretex = primos[count] +"*";
                fatorado += pretex;
                
            }
            else
            {
                
                count++;
            }
        }
        //console.log(num);
    }
    //console.log(fatorado);
    //console.log((fatorado.split(substr).length - 1));
    //console.log(primos[primos.length-1]);
    organizar();
    genhtml += "</table>";
    window.document.getElementById("desenv").innerHTML= genhtml;

    console.log(genhtml);
    num = 0;
    fatorado = "";
    final = "";
    genhtml = "<table>";
    console.log("Fim do processo!");
}








