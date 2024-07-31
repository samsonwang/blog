.. title: 更新svn的externals到指定版本
.. slug: update-svn-externals-to-version
.. date: 2024-06-30 16:34:00 UTC+08:00
.. tags: svn
.. link: 
.. description: 

svn的externals功能用于将代码库中其他位置的代码链接到本目录中来。最近我尝试将代码回退到某个历史版本时发现externals链接过来的代码并没有回退到历史版本，仍然是库中最新的版本。

.. TEASER_END

查阅了资料后发现，externals链接过来的代码是可以指定svn版本的，svn的externals功能其实类似于git的submodule，本意是用来引用第三方模块的代码，所以在使用时应该标注引用模块的版本。

当然，如果希望externals代码跟随其他代码一起回退到指定版本，也是有办法的，我在stackoverflow上找到了一个脚本实现此功能。其原理就是递归该目录，并对每个子目录执行svn的更新操作。


Unix: ``find . -name .svn -execdir svn update -r {2010-08-30} \;``

Windows: ``forfiles /m .svn /s /c "cmd /c svn up -r {2010-08-30}"``

使用时将上面脚本的 ``{2010-08-30}`` 替换成需要的版本号即可。

参考链接： stackoverflow_

.. _stackoverflow: https://stackoverflow.com/questions/683716/subversion-update-externals-to-a-date

