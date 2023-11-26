import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function abrirConexao() {
  return await open({
    filename: './VaiDeTaxiDB.db',
    driver: sqlite3.Database
  });
}

export async function executarSelect(query) {
  try{
    let resultadoQuery = await abrirConexao().then(db => {
      return db.all(query)
    });
    if(!resultadoQuery[0]){
      return{
        status: false,
        msg: 'dado inexistente, verifique se os IDs estão corretos!'
      }
    } else {
      return{
        status: true,
        resultadoQuery: resultadoQuery
      }
    }
  } catch (error){
    return{
      status: false,
      msg: `Erro ao executar query: ${error.message}`
    }
  }
}

//para realizar updates e inserts
export async function executarQuery(query) {
  try{
    let resultadoQuery = await abrirConexao().then(db => {
      db.exec(query)
    });
    return{
      status: true
    }
  } catch (error){
    return{
      status: false,
      msg: `Erro ao executar query: ${error.message}`
    }
  }
}

export async function obterUltimoIdInserido() {
  try {
    const conexao = await abrirConexao();

    const resultadoId = await conexao.get('SELECT last_insert_rowid() as lastId');

    conexao.close();

    return{
      status: true,
      Id: resultadoId.lastId
    }
  } catch (error) {
    return{
      status: false,
      msg: `Erro ao executar query: ${error.message}`
    }
  }
}
