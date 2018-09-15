<?php

$bdServidor = 'localhost';
$bdUsuario = 'root';
$bdSenha = '';
$bdBanco = 'leaflet';

$conexao = mysqli_connect($bdServidor, $bdUsuario, $bdSenha, $bdBanco);

if (mysqli_connect_errno($conexao)) {
    echo "Problemas para conectar no banco. Verifique os dados!";
    die();
}

function buscar_pontos($conexao){
  $sql = "SELECT * FROM pontos";
  
  $resultado = mysqli_query($conexao, $sql) or die(mysqli_error($conexao));
    
  return mysqli_fetch_all($resultado, MYSQLI_ASSOC);
}


?>