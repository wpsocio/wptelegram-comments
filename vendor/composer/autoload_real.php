<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit10c3cbbac3c50d75b926c67840a147cc
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit10c3cbbac3c50d75b926c67840a147cc', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit10c3cbbac3c50d75b926c67840a147cc', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit10c3cbbac3c50d75b926c67840a147cc::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
