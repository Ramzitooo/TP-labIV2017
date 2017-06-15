<?php
require_once "AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $nombre;
  	public $apellido;
  	public $dni;
	public $tipo;
	public $email;
	public $password;
	public $sexo;
	public $img;
//--------------------------------------------------------------------------------//


//--METODO DE CLASE
	public static function Buscar($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
					
	}

	public static function Chequear($mail,$pass) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * FROM usuarios WHERE email =:email AND password =:password");
		$consulta->bindValue(':email', $mail, PDO::PARAM_STR);
		$consulta->bindValue(':password', $pass, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('Usuario');
		return $usuarioBuscado;	
					
	}
	
	public static function TraerUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrUsuarios;
	}
	
	public static function Eliminar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from usuarios WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Modificar($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update usuarios 
				set nombre=:nombre, apellido=:apellido, dni=:dni, tipo=:tipo, email=:email, password=:password, sexo=:sexo, img=:img
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido',$usuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':dni',$usuario->dni, PDO::PARAM_STR);
			$consulta->bindValue(':tipo',$usuario->tipo, PDO::PARAM_STR);
            $consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
            $consulta->bindValue(':password',$usuario->password, PDO::PARAM_STR);
			$consulta->bindValue(':sexo',$usuario->sexo, PDO::PARAM_STR);
            $consulta->bindValue(':img',$usuario->img, PDO::PARAM_STR);
            
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Agregar($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (nombre,apellido,dni,tipo,email,password,sexo,img) 
		values(:nombre,:apellido,:dni,:tipo,:email,:password,:sexo,:img)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $usuario->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $usuario->dni, PDO::PARAM_STR);
		$consulta->bindValue(':tipo',$usuario->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':email', $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(':sexo',$usuario->sexo, PDO::PARAM_STR);
		$consulta->bindValue(':img', $usuario->img, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
?>