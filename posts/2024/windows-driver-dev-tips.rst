.. title: Windows驱动开发笔记
.. slug: windows-driver-dev-tips
.. date: 2024-07-29 18:49:00 UTC+08:00
.. tags: windows, driver
.. link: 
.. description: 
/.. author: Samson

本文记录了我在开发Windows驱动时的一些心得体会。

.. TEASER_END

如何调试一个硬件驱动
=======================================
可以使用DebugView工具查看驱动模块输出的调试信息。在勾选上DebugView的 `Capture Kernel`
和 `Enable Verbose Kernel Output` 菜单后，就能捕捉并显示驱动模块的调试信息。

在驱动代码中输出调试信息调用的接口为 ``kdPrint`` 和 ``DbgPrint`` , 它们都能输出调试信息。
区别是 ``kdPrint`` 输出的调试信息能够在发布版本的驱动中保留下来，即 *release* 版本的驱动也能够通过
``kdPrint`` 输出调试信息；而 ``DbgPrint`` 输出的调试信息只会在调试版本（*debug*）的驱动中生效。


驱动签名
=======================================
windows驱动需要经过数字签名后才能安装在操作系统中，在调试时可以绕过驱动签名的限制。
使用下面的命令打开Windows系统的高级选项，然后重启电脑，再次开机时就会显示高级启动选项界面，
选择“禁用强制驱动签名”菜单，这样进入系统后就能安装没有经过驱动签名的驱动了。

``bcdedit /set advancedoptions on``

关闭Windows系统的高级选项命令如下

``bcdedit /set advancedoptions off``


硬件设备只能用管理员权限打开
=======================================
在驱动模块中会为硬件硬件设备起一个名字，应用层程序可以通过这个设备名字打开硬件。
使用 ``WdfDeviceInitAssignName`` 指定的硬件名字只能用管理员权限打开，
而 ``WdfDeviceCreateSymbolicLink`` 指定的硬件名字不需要管理员权限也能打开。


驱动的编译模式
=======================================
我所使用的Windows驱动开发包的版本是7.1.0.7600，这是个比较老的驱动开发包，
它在编译驱动时提供了两种模式： `free` 和 `checked` 。
这两种模式可以简单的类比为应用层程序的 `release` 和 `debug` 。


（全文完）

