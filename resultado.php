<?php
include_once('banco.php');

$response = buscar_pontos($conexao);

$response = array($response);
echo json_encode($response);

?>
