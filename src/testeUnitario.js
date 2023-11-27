import axios from 'axios';
import assert from 'assert';

const iniciarCorridaUrl = 'http://localhost:3000/iniciarCorrida';
const finalizarCorridaUrl = 'http://localhost:3000/finalizarCorrida';

describe('Testes Unitários', () => {
  it('Deve iniciar e finalizar uma corrida com sucesso', async () => {
    // Iniciar uma corrida
    const iniciarCorridaRequest = {
      "CliId": 1,
      "MotId": 2,
      "CorOrigem": "Rua Las Palmas 20",
      "CorDestino": "Rua Mandioca 50"
    };

    const iniciarCorridaResponse = await axios.post(iniciarCorridaUrl, iniciarCorridaRequest);
    console.log('Resposta da requisição de início:', iniciarCorridaResponse.data);

    assert.strictEqual(iniciarCorridaResponse.status, 200);
    assert.strictEqual(iniciarCorridaResponse.data.status, true);
    assert.strictEqual(iniciarCorridaResponse.data.msg, 'A corrida está em andamento');

    // Obter o CorId da corrida iniciada
    const corId = iniciarCorridaResponse.data.info.CorId;

    // Finalizar a corrida
    const finalizarCorridaRequest = {
    "CorId": corId,
    "Tipo": "concluido"
    };

    const finalizarCorridaResponse = await axios.post(finalizarCorridaUrl, finalizarCorridaRequest);
    console.log('Resposta da requisição de finalização:', finalizarCorridaResponse.data);

    assert.strictEqual(finalizarCorridaResponse.status, 200);
    assert.strictEqual(finalizarCorridaResponse.data.status, true);
    assert.strictEqual(finalizarCorridaResponse.data.msg, 'A corrida foi finalizada com sucesso!');

    // Console log das informações recebidas
    console.log('Informações da corrida finalizada:', finalizarCorridaResponse.data.info);
    
  });
});