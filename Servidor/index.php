<?php

require_once "clases/AccesoDatos.php";
require_once "clases/Usuario.php";
require_once "clases/Producto.php";


require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

use \Psr\Http\Message\ServerRequestInterface as Request; //alias
use \Psr\Http\Message\ResponseInterface as Response; //alias

require 'vendor/autoload.php'; //composer, referencia a slim framework

$app = new \Slim\App; //clase de slim framework

//-------------------EVITAR PROBLEMA DEL CORS---------------------------
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*') //La pagina donde este alojado.
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//-------------------FIN EVITAR PROBLEMA DEL CORS---------------------

//************************************JWT**************************************
$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->email =  $request->getParams()["email"];
    $usuario->password =  $request->getParams()["password"];

    $usuarioLogin = Usuario::Chequear($usuario->email,$usuario->password);

    $resultado = new stdClass();
    $resultado->exito = false;

    if ($usuarioLogin == false)
        $resultado->mensaje = "No se encontro el usuario ingresado.";
    else
    {
        $resultado->exito = true;
        $resultado->mensaje = "Usuario encontrado en la base de datos!";

        //JWT
        $key = "example_key";
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "usuario" => $usuarioLogin
        );

        $resultado->token = JWT::encode($token, $key);
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});
$app->get('/token', function ($request, $response, $args) 
{
    $headers = apache_request_headers();
    $key = "example_key";

    $tk = explode(' ', $headers['Authorization']);
    try 
    {
        $decoded = JWT::decode($tk[1], $key, array('HS256'));
    } 
    catch (Exception $e) 
    {

    }
    if ($decoded)
    {
        $rta['rta'] = $decoded;
    // return true;
    }
    else 
    {
        $rta['rta'] = false;
    }
        
    print_r(json_encode($rta));

    return;
    /**
        * IMPORTANT:
        * You must specify supported algorithms for your application. See
        * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
        * for a list of spec-compliant algorithms.
        */
        $jwt = JWT::encode($token, $key);
        $tok['token'] = $jwt;
        print_r(json_encode($tok));
        return;
});
//*********************************FIN JWT*************************************************

//********************************USUARIOS**********************************************
//-------------------------TRAER USUARIOS-----------------------------------------
 $app->get('/usuarios[/]', function ($request, $response, $args) 
{
    $listado=Usuario::TraerUsuarios();
    return $response->withJson($listado);
});
//---------------------------------------------------------------------------------
//---------------------------------AGREGAR USUARIO----------------------------------
$app->get('/agregar/{obj}', function ($request, $response, $args) 
{
    $obj= $request->getAttribute('obj');
    $cantidad=Usuario::Agregar(json_decode($obj));
    $can=json_encode($cantidad);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Usuario agregado con exito";
    }
    else
    {
        $retorno["Exito"] = FALSE;
         $retorno["Mensaje"] = "Error al agregar!";
    }
    return $response->withJson($retorno);
});
//------------------------------------------------------------------------------------
//---------------------------------MODIFICAR USUARIO----------------------------------
 $app->get('/modificar/{obj}', function ($request, $response, $args) 
 {
    $obj= $request->getAttribute('obj');
    $cantidad=Usuario::Modificar(json_decode($obj));
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se modifico correctamente!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al modificar!";
    }
    return $response->withJson($retorno);
});
//-------------------------------------------------------------------------------
//---------------------------------ELIMINAR USUARIO----------------------------------
$app->get('/eliminar/{id}', function ($request, $response, $args) 
{
    $cantidad=Usuario::Eliminar($args['id']);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se elimino correctamente!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al eliminar";
    }
    return $response->withJson($retorno);
});
//-----------------------------------------------------------------------
//**********************FIN USUARIOS*************************************

//**************************PRODUCTOS************************************
//---------------------------------TRAER PRODUCTOS----------------------------------
 $app->get('/productos[/]', function ($request, $response, $args) 
{
    $listado=Producto::TraerProductos();
    return $response->withJson($listado);
});
//-------------------------------------------------------------------------------
//---------------------------------AGREGAR PRODUCTO----------------------------------
$app->get('/agregar/producto/{obj}', function ($request, $response, $args) 
{
    $obj= $request->getAttribute('obj');
    $cantidad=Producto::Agregar(json_decode($obj));
    $can=json_encode($cantidad);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Producto agregado con exito";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al agregar producto!";
    }
    return $response->withJson($retorno);
});
//------------------------------------------------------------------------------------
//---------------------------------ELIMINAR PRODUCTO----------------------------------
$app->get('/eliminar/producto/{id}', function ($request, $response, $args) 
{
    $cantidad=Producto::Eliminar($args['id']);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se elimino producto correctamente!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al eliminar producto";
    }
    return $response->withJson($retorno);
});
    //-----------------------------------------------------------------------
//**************************FIN PRODUCTOS********************************

//**************************ARCHIVOS*************************************
//------------------MOVER FOTO---------------------------
$app->get('/mover/{foto}', function (Request $request, Response $response) {
        
    $nombreFoto = $request->getAttribute('foto');
    $pathOrigen = "tmp/".$nombreFoto;
    $pathDestino = "img/usuarios/".$nombreFoto;
	if(is_file($pathOrigen))
	{
        $pasaje = copy($pathOrigen, $pathDestino);
        unlink($pathOrigen);
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se movio correctamente la foto!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al mover la foto!";
    }
    return $response->withJson($retorno);
});
//-------------------------------------------------------------------------------
//------------------MOVER FOTO PRODUCTO---------------------------
$app->get('/mover/producto/{foto}', function (Request $request, Response $response) 
{        
    $nombreFoto = $request->getAttribute('foto');
    $pathOrigen = "tmp/".$nombreFoto;
    $pathDestino = "img/productos/".$nombreFoto;
	if(is_file($pathOrigen))
	{
        $pasaje = copy($pathOrigen, $pathDestino);
        unlink($pathOrigen);
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se movio correctamente la foto!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al mover la foto!";
    }
    return $response->withJson($retorno);
});
//-------------------------------------------------------------------------------
//-----------------------------ELIMINAR FOTO-----------------------------------
$app->get('/eliminarfoto/{foto}', function (Request $request, Response $response) 
{        
    $nombreFoto = $request->getAttribute('foto');
    $pathDestino = "img/usuarios/".$nombreFoto;
	if(unlink($pathDestino))
	{
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se eliminar correctamente la foto!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al eliminar la foto!";
    }
    return $response->withJson($retorno);
});
//---------------------------------------------------------------------------------------------
//-----------------------------ELIMINAR FOTO-----------------------------------
$app->get('/eliminarfotoproducto/{foto}', function (Request $request, Response $response) 
{        
    $nombreFoto = $request->getAttribute('foto');
    $pathDestino = "img/productos/".$nombreFoto;
	if(unlink($pathDestino))
	{
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se eliminar correctamente la foto!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al eliminar la foto!";
    }
    return $response->withJson($retorno);
});
//---------------------------------------------------------------------------------------------
//-----------------------------RECIBIR Y GUARDAR IMAGEN EN EL TEMPORAL------------------------
 $app->post('/api', function ($request, $response, $args) 
 {
    $retorno["Exito"] = TRUE;
    $archivoTmp = date("Ymd_His");
    $tipoArchivo = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    $nombreFoto = $archivoTmp.".".$tipoArchivo;
    $destino = "tmp/" . $nombreFoto;
    $retorno["foto"] = $nombreFoto;
     //VERIFICO EL TAMAÑO MAXIMO QUE PERMITO SUBIR
	if ($_FILES["file"]["size"] > 1000000) 
	{
		$retorno["Exito"] = FALSE;
		$retorno["Mensaje"] = "El archivo es demasiado grande. Verifique!!!";
		return json_encode($retorno);
	}
	//SI EL ARCHIVO NO ES UNA IMAGEN, RETORNA FALSE
	$esImagen = getimagesize($_FILES["file"]["tmp_name"]);
	if($esImagen === FALSE) 
	{
		$retorno["Exito"] = FALSE;
		$retorno["Mensaje"] = "Solo son permitidas IMAGENES";
		return json_encode($retorno);
	}
	else 
	{
	//CIERTAS EXTENSIONES
		if($tipoArchivo != "jpg" && $tipoArchivo != "jpeg" && $tipoArchivo != "gif"	&& $tipoArchivo != "png") 
		{
			$retorno["Exito"] = FALSE;
			$retorno["Mensaje"] = "Solo son permitidas imagenes con extension JPG, JPEG, PNG o GIF";
			return json_encode($retorno);
		}
	}
	if (!move_uploaded_file($_FILES["file"]["tmp_name"], $destino)) 
	{
		$retorno["Exito"] = FALSE;
		$retorno["Mensaje"] = "Ocurrio un error al subir el archivo. No pudo guardarse";
		return json_encode($retorno);
	}
	else
	{
		$retorno["Mensaje"] = "Archivo subido exitosamente!!!"; 
		$retorno["PathTemporal"] = $destino;
		return json_encode($retorno);
	}
});
//----------------------------------------------------------------------
//*****************************FIN ARCHIVOS******************************
$app->run();
?>