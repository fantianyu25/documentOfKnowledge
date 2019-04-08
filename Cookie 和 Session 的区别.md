## Cookie 和 Session 的区别

1. cookie 存储在浏览器中；session 保存在服务器
2. cookie因为存储在浏览器中，可以编辑修改，所以安全性没有session高
3. cookie的时间可以设置,不设置的话，关闭刘浏览器就消失了；session存在时间由服务端设置，默认30分钟
4. cookie最大只有4kb，浏览器最多存储20个，session容量不限，但是会占用服务器资源
5. cookie只能存储string字符串，session能存储任意的java对象