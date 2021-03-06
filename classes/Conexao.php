<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require('config.php');

class Conexao extends PDO {

  private static $instancia;
  private static $instanciaNoDb;

  public function __construct($dsn, $user, $pass){
    parent::__construct($dsn, $user, $pass);
  }

  public static function getInstance(){
    if (!isset(self::$instancia)) {
      $dsn = "pgsql:dbname=".DBNAME.";host=".DBHOST.";port=".DBPORT;
      self::$instancia = new Conexao($dsn, DBUSER, DBPASS);
      self::$instancia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$instancia->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);
    }
    return self::$instancia;
  }

  public static function getInstanceNoDatabase(){
    if (!isset(self::$instanciaNoDb)) {
      $dsn = "pgsql:host=".DBHOST.";port=".DBPORT;
      self::$instanciaNoDb = new Conexao($dsn, DBUSER, DBPASS);
      self::$instanciaNoDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$instanciaNoDb->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);
    }
    return self::$instanciaNoDb;
  }

}
