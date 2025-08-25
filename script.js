function calcularBinario() {
  let bin1Input = document.getElementById("bin1");
  let bin2Input = document.getElementById("bin2");
  let operacaoInput = document.getElementById("operacao");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let bin1 = bin1Input.value.trim();
  let bin2 = bin2Input.value.trim();
  let op = operacaoInput.value;

  // Validação dos binários
  if (!/^[01]+(\.[01]+)?$/.test(bin1) || !/^[01]+(\.[01]+)?$/.test(bin2)) {
    resultado.innerHTML = "Digite apenas números binários válidos (0, 1 e ponto).";
    passos.innerHTML = "";
    return;
  }

  // Função: binário → decimal com passos
  function binarioParaDecimalDetalhado(bin) {
    let partes = bin.split(".");
    let inteiroStr = partes[0];
    let fracStr = partes[1] || "";

    let inteiro = parseInt(inteiroStr, 2);
    let frac = 0;
    let passosDetalhados = [];

    // Passo 1: Conversão parte inteira
    let calcInt = [];
    for (let i = 0; i < inteiroStr.length; i++) {
      let bit = inteiroStr[inteiroStr.length - 1 - i];
      calcInt.push(`${bit}×2^${i}=${bit * Math.pow(2, i)}`);
    }
    passosDetalhados.push(`Parte inteira (${inteiroStr}): ${calcInt.reverse().join(" + ")} = ${inteiro}`);

    // Passo 2: Conversão parte fracionária
    if (fracStr) {
      let calcFrac = [];
      for (let i = 0; i < fracStr.length; i++) {
        let bit = fracStr[i];
        frac += parseInt(bit) * Math.pow(2, -(i + 1));
        calcFrac.push(`${bit}×2^(-${i + 1})=${parseInt(bit) * Math.pow(2, -(i + 1))}`);
      }
      passosDetalhados.push(`Parte fracionária (.${fracStr}): ${calcFrac.join(" + ")} = ${frac}`);
    }

    return {
      valor: inteiro + frac,
      passos: passosDetalhados
    };
  }

  // Função: decimal → binário (8 casas decimais)
  function decimalParaBinario(dec) {
    let inteiro = Math.floor(dec);
    let frac = dec - inteiro;
    let binInt = inteiro.toString(2);

    if (frac === 0) return binInt;

    let binFrac = "";
    let count = 0;
    while (frac > 0 && count < 8) {
      frac *= 2;
      if (frac >= 1) {
        binFrac += "1";
        frac -= 1;
      } else {
        binFrac += "0";
      }
      count++;
    }
    return binInt + "." + binFrac;
  }

  // Conversão detalhada dos dois binários
  let conv1 = binarioParaDecimalDetalhado(bin1);
  let conv2 = binarioParaDecimalDetalhado(bin2);
  let dec1 = conv1.valor;
  let dec2 = conv2.valor;
  let decResultado;

  // Operação
  switch (op) {
    case "+": decResultado = dec1 + dec2; break;
    case "-": decResultado = dec1 - dec2; break;
    case "*": decResultado = dec1 * dec2; break;
    case "/":
      if (dec2 === 0) {
        resultado.innerHTML = "Erro: divisão por zero não permitida.";
        passos.innerHTML = "";
        return;
      }
      decResultado = dec1 / dec2;
      break;
  }

  // Conversão final para binário
  let binResultado = decimalParaBinario(decResultado);

  // Resultado final
  resultado.innerHTML = `
    <strong>Resultado:</strong><br>
    ${bin1} ${op} ${bin2} = <strong>${binResultado}</strong><br>
    <em>(Decimal: ${dec1} ${op} ${dec2} = ${decResultado})</em>
  `;

  // Passos detalhados
  passos.innerHTML = `
    <strong>Conversão Binário → Decimal:</strong>
    <ul>
      <li><strong>${bin1}</strong>:<br>${conv1.passos.join("<br>")}<br>Resultado: ${dec1}</li><br>
      <li><strong>${bin2}</strong>:<br>${conv2.passos.join("<br>")}<br>Resultado: ${dec2}</li>
    </ul>
    <strong>Operação em decimal:</strong> ${dec1} ${op} ${dec2} = <strong>${decResultado}</strong><br>
    <strong>Resultado em binário:</strong> ${binResultado}
  `;
}

// Limpa campos
function limparCampos() {
  document.getElementById("bin1").value = "";
  document.getElementById("bin2").value = "";
  document.getElementById("operacao").value = "+";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("passos").innerHTML = "";
}
