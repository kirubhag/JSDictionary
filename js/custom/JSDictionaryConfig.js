/**
 * Created by WebStorm.
 * User: kirubhakaran_g
 * Date: 2/16/2015
 * Time: 1:06 PM
 * Project: JSDictionary
 * File Name: JSDictionaryConfig
 */

var JSDictionaryConfig = (function () {
    var JSDictionaryConfig = {};

    JSDictionaryConfig.DBName = "JSDictionary";
    JSDictionaryConfig.DBDescription = "JSDictionary is used to store all the JS keyword with it's description as well as example.";
    JSDictionaryConfig.DBSize = 2 * 1024 * 1024;

    return JSDictionaryConfig;
})();