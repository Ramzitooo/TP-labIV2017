# TP-labIV2017

- De entrega obligatoria para la firma de la libreta para final
- Puede sufrir cambios o requerimiento nuevos.
- La entrega de TP y corrección se hace en clase.
- solo se corrigen los TP estando en un sitio <strong>On-Line</strong>(servico web ej: hostinger, 00webhost, amazon)


<h1> Primera fecha de entrega</h1> 
<h3>29 de Junio</h3>
.
.
.


<h1> Segunda fecha de entrega</h1> 
<h3> 6 de Julio (cambio de requerimientos y nuevas funcionalidades)</h3>
.
.
.

 <h1> de no presentar el TP para las fechas anteriores, debe  presentar en fecha de final</h1>
 
   <h1>PAGINA WEB: </h1>
  <h1>www.floresosmar.hol.es</h1>
 
 <h1>Pizzeria Argenta SRL</h1>
<p>El usuario que entra a la pagina. Puede navegar sin necesidad de registrarse o logearse.
La primer pagina que se muestra es la de inicio en la cual incluye un carusel de imagenes con una breve descrcipcion de dicha empresa .
Tiene la posibilidad de ver la lista de productos y de los locales disponibles. No podra generar ningun pedido
o generar o una reserva ya que para eso necesita estar registrado y logearse sin excepcion.</p>
<h2>Registro</h2>
El usuario invitado que navega en nuestra pagina tiene la posiblidad de registrarse en el cual se le tomaran los datos personales
con foto opcional. Este siempre se genera usuarios de tipo clientes.
<h2>Login </h2>
El usuario tiene la posiblidad de logearse como un usuario de tipo cliente,empleado,encargado y administrador
Al ingresar el email y el password correcto este segenera un token. En caso de ingresar datos tanto email y password incorrectos con un mensaje de datos incorrectos.
<h2>Operatoria Cliente:</h2>
<p>Tiene genera pedidos al apretar un en un boton del un item de la lista de productos.
Puede ver los locales (jarcodeados temporalmente) en el cual genera reservas dinamicamente.
Tiene la posiblidad de des logearse destruyendo el token.
El cliente entra puede acceder a las paginas de productos y los locales.</p> 
<h2>Operatoria Empleado:</h2>
<p>Puede hacer todo lo que un cliente tiene permiso con la diferencia de ver todos los pedidos y enviarlos en caso de que estan pagados
Puede generar clientes y ver la lista de usuarios pero no podra modificar dicha lista.</p>
<h2>Operatoria Encargado:</h2>
<p>Tiene la posibilidad de hacer todo lo que hace un empleado.Tiene la posibilidad de ver la lista de usuarios
Puede modificar eliminar y agregar un usuario de cualquier tipo. Tambien tiene acceso a ver los locales y generar una reserva</p>
<h2>Operatoria Administrador:</h2>
<p>Es el que puede hacer todo dentro de la pagina tiene acceso a ver la pagina de informacion donde se mostraran
estadisticas de la empresa dentro de dicha pagina se puede apretar un boton donde de descargara.
Es el unico que tiene la posibilidad de eliminar y modificar un cliente</p>
