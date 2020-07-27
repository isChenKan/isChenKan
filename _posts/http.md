---
date: 2020-02-20
tags: 计算机网络
author: 社长的社畜
location: 北京
---

# 计算机网络-HTTP/TCP/IP协议

## HTTP响应码
[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)


## HTTP的REST架构论文
[https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

## 长连接和短连接
Connection: Keep-Alive/Close

问题：如果中间存在代理服务器（客户端=>陈旧的代理服务器=>原始服务器），如果代理服务器不识别
keep-alive，它会原样转发，导致客户端和原始服务器都以为正确建立了长连接。导致出错。

解决：Proxy-Connection。代理服务器不识别，退化为短连接。识别就替换成Connection建立长连接。

## HTTP消息在服务端的路由
1. 建立TCP连接
2. 接受请求
3. 匹配host头部与域名
4. 寻找URI的处理代码（匹配URI）
5. 执行代码（访问资源）
6. 生成/发送HTTP响应
7. 记录访问日志

## 正向代理与反向代理
服务于客户端的是正向代理，例如你需要翻墙时在浏览器配置的代理服务器；

服务于服务器端的是反向代理，主要用途是负载均衡与协议适配。

## 代码服务器转发如何传递IP地址
通过头部：X-Forwarded-For，从左到右。

Via：通过的代理服务器列表。

## 请求与响应的上下文
Referer：浏览器对来自某一页面的请求自动添加的头部。像埋点的访问来源统计分析就是用的这个字段。Referer还可以用来做缓存优化，防盗链等。

From：主要用于爬虫，告诉服务器如何通过邮件联系到爬虫的负责人。

Server：服务器上所用的软件信息。

响应上下文：

Allow：告诉客户端服务器上该URI对应的资源允许哪些方法的执行。

Accept-Ranges：是否支持range请求。bytes/none

## 内容协商
因为每个URI指向的资源可以有多种不同的表述，比如不同的语言，针对不同浏览器提供不一样的压缩编码（gzip/br）等等。所以需要内容协商。内容协商有两种方式：
* 主动式内容协商Proactive：客户端先在请求头部中主动提出需要的表述形式。服务器据此返回相应的表述。请求header：Accept/Accept-Language/Accept-Encoding。
* 响应式内容协商Reactive：服务器返回300Multiple Choices或者406Not Acceptable。由客户端自行选择一种表述。存在的问题：没有统一标准，比较少使用。

常见的协商要素:
* 质量因子q：内容的质量（q越小，质量越差）。可接受类型的优先级（简体中文/繁体/英语）。例子：`Accept:image/webp,image/apng,*/*;q=0.8,....`
* 内容编码：压缩算法。Accept-Encoding: gzip/deflate/br
* 表述语言：Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7（q表示优先级）

国际化internationalization（i18n，i和n中间有18个字符）：指软件设计时在不同的国家和地区，不用做逻辑实现层面上的修改就能够以不同的语言显示。
本地化localization（l10n）：指内容协商时，根据请求中的语言及区域信息，选择特定的语言作为资源表述。

资源表述的元数据头部：
* content-type
* content-encoding
* content-language

## HTTP包体的传输方式
请求和响应都可以携带包体（HEAD方法，1xx，204，304的响应不能有包体）：

`HTTP-message = start-line *(header-field CRLF) CRLF [message-body]`
其中message-body就是包体，是一个二进制字节流。

### 定长包体
Content-Length：用10进制表示包体的字节个数。

定长包体的优点：接收端接收到这个header，只需要读指定长度字节数作为包体返回即可。

### 不定长包体
Transfer-Encoding: 使用chunk传输方式，此时如果存在Content-Length头部，会被忽略。

优点 ：
* 基于长连接持续推送动态内容。
* 压缩体积较大的包体时，不必完全压缩完再发送（计算出头部），可以实现边发送变压缩。
* 可以先发送完包体，再发送剩余的HTTP头部。因为有一些头部需要依赖于包体来计算。比如某些哈希值要依靠包体来计算。


### Content-Disposition头部
attachment: 浏览器以附件形式下载包体。

## HTML form表单提交时的协议格式
表单提交的关键属性：
```html
<form action="/send" method="post" enctype="multipart/form-data">
	<input type="file" name="filed">
</form>
```
enctype：在post方法下，对表单内容在请求包体中的编码方式。
* application/x-www-form-urlencoded: 编码成以&分隔的键值对。
* multipart/form-data: boundary(分隔符，就是--开头的一串儿0-69个字符，last boundary是的格式是：--boundary--)，每部分都有HTTP头部描述子包体，例如content-type。(用于一个包体中有多种资源)。

## 断点续传、多线程下载、视频播放随机点播，实时拖动
HTTP Range：允许服务器根据客户端的请求只发送一部分包体，由客户端负责组装。

Accept-Ranges：服务器是否支持range请求。bytes（支持）/none（不支持）。

range范围请求的单位是bytes/字节。多段用逗号隔开。例：

* 第1个500字节：Range: bytes=0-499。
* 最后1个500字节：Range: bytes=-500

### 如何判断是否更新？
通过Etag和If-Match（条件请求）来判断服务器资源是否在两次下载之间发生了变化。如果变化了，要重新下载之前的来合成完整的资源包体。

响应状态码 412 Precondition Failed（先决条件失败）表示客户端错误，意味着对于目标资源的访问请求被拒绝。这通常发生于采用除 GET 和 HEAD 之外的方法进行条件请求时，由首部字段 If-Unmodified-Since 或 If-None-Match 规定的先决条件不成立的情况下。这时候，请求的操作——通常是上传或修改文件——无法执行，从而返回该错误状态码。

### 如果未更新
则服务端返回206 Partial Content（服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。）
Content-Range：bytes 200-1000/67589 （当前片段在完整包体中的位置）

## Cookie
保存在客户端，由浏览器维护，表示应用状态的HTTP头部。存放在内存或者磁盘中。
* Set-Cookie：服务端通过Set-Cookie头部告知客户端（此头部可以重复多次以传递多个值）。
* Cookie：客户端得到cookie之后，后续请求都会自动将Cookie放入请求头部中。只能有一个。

Cookie的格式（Cookie-paire：path-av/httponly-av）

### Cookie在协议设计中的问题
* Cookie被被附加在每一个HTTP请求中，增加了流量。
* 在HTTP中的Cookie是明文传递的，有安全性问题。（除非用HTTPS）
* Cookie的大小不应超过4KB，对于复杂的数据是不够用的。

### 在无状态REST架构设计下的状态管理
* 应用状态：由客户端管理。
* 资源状态：由服务端管理。（例如登录信息）
* 
HTTP请求的状态：
* 有状态的请求：服务端保存请求的相关信息（session保存登陆信息），每个新的请求可以使用之前的请求信息（cookie，使请求可以携带查询信息，与session配合完成有状态的请求）。
* 无状态的请求：服务端处理的信息都是当前请求携带的信息（服务端不保存session）。

### 第三方Cookie
访问A站点，A站点中有一个图片的src是另一个站点B，这是站点B可以传一个Cookie来追踪用户，当用户下次直接访问站点B时，将带上该Cookie，从而可以实现跟踪用户数据。

## 同源策略
### 为什么需要同源策略？
同一个浏览器发出的请求，有些不是用户自愿发出的请求（例如page.html是用户主动发出的请求，但是页面中的图片，js等资源都是浏览器自动发出的请求）。服务器A收到的来自同一个浏览器的请求（有相同的上下文，比如User-Agent, Cookie），但请求可能来自不同的站点。
如果没有同源策略：访问站点A后，A服务器通过Set-Cookie：Cookie头部将Cookie返回给浏览器（登陆），然后浏览器下次向A服务器发送HTTP时，会自动携带上该Cookie（已登陆）。此时，如果没有同源策略，站点B上的js可以向A服务器发起一个HTTP请求，此时浏览器会把Cookie加入到请求中，从而出现用户鉴权的问题（登陆验证通过）。如果没有同源策略，站点B的js甚至可以改变站点A的DOM结构。 

### 什么是同源策略？
* 同源策略：限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
* 同源：协议、主机（域名）、端口必须完全相同。

### 安全性和可用性的设计取舍
可用性：HTML的开发者可以决定跨域请求资源是否对本站点安全。
* 像`<img><link><script><video><iframe><audio>`这几个标签，是开发者自己控制的跨域请求，可以明确的使用src属性来指明资源的地址实现跨域访问。
* 允许跨域写操作：表单提交或者重定向请求（但是会有CSRF安全性问题）。

安全性：限制站点A的js向站点B发起危险动作，比如：
* Cookie, LocalStorage无法读取。
* DOM无法获取，限制B操作A的DOM。
* AJAX无法发送。

### 跨站请求伪造攻击（CSRF: Cross-Site Request Forgery）
浏览器A访问了站点B。得到了站点B设置的一个代表用户A的Cookie。此时浏览器A访问了恶意站点C，点击了站点C上带有迷惑性的一个东西，它向站点B发送了一个form表单（表单的action地址是“B.com”），因为出于可用性考虑，同源策略并没有限制表单提交跨域请求。所以此时便自动携带上了Cookie（注意，C不是直接获取了Cookie，实际上，C无法获取到Cookie，只是浏览器认为是用户自己向B发起请求，从而自动携带上了Cookie），导致严重后果。

解决方式
* 服务端通过referer来判断，referer只能是自己信任的域名，此时C如果发起伪造请求，referer就是C，服务端可以拒绝。问题是有些浏览器referer实现不规范或者可以伪造referer，所以可能获取不到正确的referer。
* 给form表单的隐藏元素添加token（token具有时效性，存在redis之类的服务端。例如在form最后添加隐藏的一个input，参数就是该token：`<input type=”hidden” name=”csrftoken” value=”tokenvalue”/>）`。发起请求的时候校验这个token。如果是C发起的伪造请求，根据同源策略，它无法访问B的DOM结构，所以它拿不到这个token。也就无法伪造请求了。

## 跨域的方式
CORS（Cross-Origin-Resource-Sharing）
* 对于简单请求（GET/POST/HEAD, 只能使用CORS安全头部（Content-Language, Accept等））服务端返回Access-Control-Allow-Origin: "域名"即可控制制定域名的跨域访问。（实际上请求都会得到响应，跨域是客户端浏览器做的控制，wireshark可以抓包到响应数据，如果没有Access-Control-Allow-Origin或其值不匹配，浏览器不会放行而已）。
* 对于复杂请求，需要先进行预检请求（OPTIONS, 对于简单请求，没有该询问情况）。预检请求头部：Access-Control-Request-Method, Access-Control-Request-Headers预检请求响应： Access-Control-Allow-Method, Access-Control-Allow-Headers, Access-Control-Max-Age

## 条件请求的作用（Precondition）
常见的应用场景：
* 使用缓存的更新更有效率（如响应码为304时，服务端无须返回包体）
* 断点续传时，对之前内容的校验。
* 多个客户端同时修改同一资源时，防止某一个客户端的修改被错误丢弃（比如同时修改wiki文档）。

### 强验证器和弱验证器
条件请求的验证通过服务端验证器来完成，而验证器又分为强验证器和弱验证器。区别是一旦服务器资源变化，强验证器则一定验证不通过，而弱验证器可以在一定程度上允许验证通过。

### ETag
* 强验证器：ETag: "xyzzy"
* 弱验证器：ETag: W/"xyzzy"

### Last-Modified
Last-Modified头部：对应资源的最后修改时间。

Date头部：响应包体的生成时间。（更晚）

### If-Range
If-Range HTTP 请求头字段用来使得 Range 头字段在一定条件下起作用：当字段值中的条件得到满足时，Range 头字段才会起作用，同时服务器回复206 部分内容状态码，以及Range 头字段请求的相应部分；如果字段值中的条件没有得到满足，服务器将会返回 200 OK 状态码，并返回完整的请求资源。
字段值中既可以用 Last-Modified 时间值用作验证，也可以用ETag标记作为验证，但不能将两者同时使用。
If-Range 头字段通常用于断点续传的下载过程中，用来自从上次中断后，确保下载的资源没有发生改变。

### 乐观锁
当两个客户端同时对资源进行修改时，如果client1先提交了修改，此时client2提交的修改会失败（因为它未基于最新的资源进行修改），client2需要重新拉去经client1修改之后的最新资源。
解决方法：基于If-Match：“Etag”的条件请求：

## 缓存
### 共享缓存
Age 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。

Age的值通常接近于0。表示此对象刚刚从原始服务器获取不久；其他的值则是表示代理服务器当前的系统时间与此应答中的通用头 Date 的值之差。

### 缓存实现的算法逻辑
字典、红黑树查找key、双向链表（缓存容量有限，要不断淘汰老的缓存）

## 计算缓存过期

### freshness_lifetime
response_is_fresh = (freshness_lifetime > current_age)
freshness_lifetime按优先级取这几个值：
s-maxage > max-age > Expires > 预估过期时间
eg：Cache-Control: s-maxage=3600（单位是秒）

### 预估时间
预估时间RFC规范推荐使用（DownloadTime - LastModified）* 0.1来计算。


### current-age的计算
强调：Age 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。


### Cache-Control头部

注：min-fresh是在请求中使用的，通俗的讲它的含义表示：如果你有缓存，那么当前缓存不能过期，而且至少要经过min-fresh秒都不能过期的话，才能给我用。

## 什么样的响应才能被缓存?
### 缓存作为当前请求的响应的条件
1. URI是匹配的。
2. 缓存中的响应允许当前请求中的方法使用缓存。
3. 如果有vary头部：vary是一个HTTP响应头部信息，它决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。格式是：`Vary: <header-name>, <header-name>`, ...Vary指定的头部必须和请求中的头部相匹配。Vary: * 意味着一定会匹配失败。
4. 不能含有no-cache头部。
5. 新鲜的，未过期的。如果是过期，但是响应头部明确告知了可以使用过期的缓存（Cache-Control: max-stale: 60），也是可以的。
6. 使用条件请求去服务端验证请求是否过期，得到304响应，此时也是可以使用缓存的。

Vary: Content-Encoding（必须根据Content-Encoding的值来决定是否使用缓存）

## 重定向
### 永久重定向（资源永久性的变更到了新的URI）
1. 301: 重定向请求通常会自动改成GET方法，而不管原请求是什么方法。
2. 308：重定向请求必须使用原请求的方法和包体发起访问。

### 临时重定向（资源只是临时性的变更URI）和特殊重定向
302、303、307；300、304

## DNS
DNS是一个用于将人类可读的“域名”与服务器的IP地址进行映射的数据库。

DNS查询是递归查询递归查询，从后向前（比如www.baidu.com，先查的是.com，叫做跟域名服务器）。

命令行：dig image.baidu.com

## wireshark捕获过滤器语法

https://biot.com/capstats/bpf.html


## WebSocket

http://www.websocket.org/echo.html

解决ajax轮询的问题，服务端及时推送更新给客户端（客户端订阅）。

WebSocket是帧，http是流。

## 如何从HTTP升级到WebSocket
http升级请求格式（URI格式：ws://echo.websocket.org/?encoding=text）

建立握手

可以根据响应中的Sec-WebSocket-Accept: /3Zus5sXJPAwsggW9YGBEl97czM= 字段来判断WebSocket连接是否成功。该字段的值通过请求中的Sec-WebSocket-Key: YycWHfSLJS1C2TkrMLiOWQ== 字段拼接上一段固定字符串儿，然后编码计算得出。计算方法：

## 掩码防止代理服务器的缓存攻击

websocket客户端发送的消息必须基于掩码进行编码（MASKED）。代理服务器不支持websocket，会识别成HTTP请求。使用掩码可以使代理服务器不识别。
随机生成32位的frame-masking-key（Masking-Key: 93dbadfa），JS无法猜出。由于掩码是针对于浏览器的，这一步也是浏览器强制执行的，然后会对包体进行XOR加密。
有了websocket协议后，恶意页面可以通过websocket协议建立与恶意服务器的长连接，并且发送一个格式符合HTTP规范的数据帧，由于代理服务器不支持websocket，会将该数据帧识别为HTTP请求并转发给恶意服务器，这样恶意服务器就可以返回伪造响应给代理服务器。
有了掩码机制后，恶意页面无法控制实际发送的数据，即使恶意页面构造了一个符合HTTP规范的数据帧，经过掩码后，数据已经不再符合HTTP规范，代理服务器无法识别，会关闭连接。

## HTTP/1.1发展过程中遇到的问题

### 变化
* 从几KB，变成了几MB。
* 从每个页面的10个资源，到几百个资源。
* 从text文本为主，变成了图片，视频的富文本为主。
* 对页面的实时性要求更高了，比如直播业务。

### HTTP/1.1的高延迟问题
* 随之带宽的增加，延迟并没有显著的下降。
* 并发连接数量有限。（比如Chrome为6个）
* 同一连接同一时间只能完成一个HTTP事务（请求/响应），才能处理下一个事务。也就是说，发送一个请求，但是迟迟没有响应的话，是不能够发送另一个request请求的。这也是导致高延迟的最主要原因。（单连接上的串行请求）

### 无状态导致的巨大HTTP头部
因为HTTP是无状态的，所以每一个请求都要携带完整的头部。比如cookie，而cookie比较大，因此重复传输巨大的头部。

**无法解决的问题：HTTP/1.1不支持服务端推送消息，客户端只能通过轮询来解决。**

## HTTP/2

### wireshark抓取HTTP/2报文的方法

添加环境变量命令：launchctl setenv SSLKEYLOGFILE /Users/chenkan/learn/wireshark-log/log.txt
wireshark首选项protocol选中TLS，添加该日志文件即可。

### Stream流ID的作用

* 实现多路复用
* 由客户端建立的流的stream id必须是奇数，由服务端建立的流的stream id必须是偶数。
* 不能重复，新建立的ID必须大于曾经建立过的ID。

### HPACK头部压缩

由于HTTP是无状态的协议，http1有时每次都会发送同样的首部，导致效率比较低下，http2为了解决该问题，使用了hpack头部压缩。

三种压缩方式：
1. 静态字典（查一个静态表，就是把一些固定的首部字段映射成相应的数字即可例如method: GET用2表示，method: POST用3表示），共61个。
2. 动态字典（如果两个请求只有一小部分字段不同，那么与前一个字段相同的部分可以用动态分配一个编码来代替表示），从62开始。先入先出的淘汰策略。
3. 压缩算法（哈夫曼算法：出现概率大的符号采用较短的编码，比如a、s，概率小的采用较长的编码，比如j, z）
静态哈夫曼编码，是写死的。哈夫曼树：出现概率从小到大构成子树，左边0，右边1。

### TLS/SSL协议
对称加密：对称加密的核心是异或运算，即00得0，11得0；01得1，10得1。例：
密匙是1010，明文是0110，那么加密之后就是1100，反之，用加密之后跟密匙进行异或运算也可以得到明文。但是这样加密也是有问题的：无法隐藏数据特征。

填充：密匙长度没有明文长，可以将明文分成多个block分别加密，长度不足的部分需要填充。