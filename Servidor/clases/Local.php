<?php
require_once "AccesoDatos.php";
class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $direccion;
  	public $estado;
    public $telefono;
    public $latitud;
    public $longitud;
	public $img;

//--------------------------------------------------------------------------------//
	
	public static function TraerLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM locales");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Local");	
		return $arrUsuarios;
	}
    public static function Agregar($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into locales (direccion,estado,telefono,latitud,longitud,img) 
		values(:direccion,:estado,:telefono,:latitud,:longitud,:img)");
		$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
        $consulta->bindValue(':estado',$local->estado, PDO::PARAM_STR);
        $consulta->bindValue(':telefono',$local->telefono, PDO::PARAM_STR);
		$consulta->bindValue(':latitud', $local->latitud, PDO::PARAM_STR);
        $consulta->bindValue(':longitud',$local->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':img', $local->img, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
				
	}	

}
?>