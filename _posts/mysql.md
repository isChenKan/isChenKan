---
date: 2019-6-16
tags: JS基础
author: 葵花养殖技术人员
location: Beijing
---

# MySQL基础命令

## 基本指令
```SQL
mysql -h localhost -u root -p
```
进入mysql
```SQL
sudo mysql
```
进入命令行mysql
```SQL
create database xxx;
```
创建数据库
```SQL
source /Users/username/create.sql;
```
导入本地数据库
```SQL
show databases;
```
查看所有存在的数据库
```SQL
use xxx;
```
进入xxx数据库
```SQL
show tables;
```
查看所有的表
```SQL
describe "table_name";
```
显示某个表
```SQL
quit
```
退出命令行mysql

## SELECT
```SQL
select "table_name_col"
from "table_name";
```
检索某个表里的某列，可以select多列，用逗号隔开，\*选择所有列
```SQL
select distinct "table_name_col"
from "table_name";
```
返回不重复的值
```SQL
select "table_name_col"
from "table_name"
limit 5;
```
不超过5行
```SQL
select "table_name_col"
from "table_name"
limit 5, 6;
```
查询从行5开始的6行，第一行为行0

### SELECT SORT
```SQL
select "table_name_col"
from "table_name"
order by "table_name_col";
```
结果按字母顺序排序，order by后面是排序条件，可以有多个，最后加desc关键字表示倒序。如果想在多个列上进行降序排序，必须对每个列指定DESC关键字，还可以在最后加上limit 1；从而查出极值。

## WHERE
### AND & OR
```SQL
select "table_name_col"
from "table_name"
where "table_name_col" between num_1 and num_2;
```
支持操作符和**between**区间过滤。`is null`过滤出空值。
更复杂的过滤条件：
```SQL
where state_1 and state_2 and state_3;
```
以及**or**，这些就是类似于编程语言里面的用法，简单。
可以加圆括号控制**and**和**or**的逻辑块儿。
### IN
指定一个条件范围:
```SQL
where xxx in (x_1, x_2, x_3…);
```
以及**not**关键字：
```SQL
where xxx not in (x_1, x_2, x_3…);
```
## LIKE
%通配符
```SQL
where xxx like 'abc%';
```
%是通配符，表示任何字符出现任意次数（把它看成省略号就很好理解了）不能匹配**null**，上面这个语句的意思就是查出所有以abc开头的xxx。

%abc%：表示任何位置包含文本abc的值，不论它之前或之后出现什么字符。

\_通配符

区别是下划线只匹配单个字符而不是多个字符。**通配符会导致性能损失，不要过度使用通配符。避免在搜索模式的开始处使用通配符，这样是最慢的。**

## 正则表达式
```SQL
where xxx regexp '[^123]';
```
这里的正则表达式不用两个//括起来。跟markdown有些地方不一样，比如转义是两个右斜线\\\\

### 常用的字符类：

类 | 说明
--- | ---
[:alnum:] | 任意字母和数字(同[a-zA-Z0-9])
[:alpha:] | 任意字符(同[a-zA-Z])
[:blank:] | 空格和制表(同[\t])
[:digit:] | 任意数字(同[0-9])
[:lower:] | 任意小写字母(同[a-z])
[:space:] | 包括空格在内的任意空白字符(同[\f\n\r\t\v])
[:upper:] | 任意大写字母(同[A-Z])
[:xdigit:] | 任意十六进制数字(同[a-fA-F0-9])

### 重复元字符：
元字符 | 说明
--- | ---
* | 0个或多个匹配
+ | 1个或多个匹配(等于{1,})
? | 0个或1个匹配(等于{0,1})
{n} | 指定数目的匹配
{n,} | 不少于指定数目的匹配
{n,m} | 匹配数目的范围(m不超过255)

### 定位符：
元字符 | 说明
--- | ---
^ | 文本的开始
$ | 文本的结尾
[[:<:]] | 词的开始
[[:>:]] | 词的结尾

## 计算字段
### Concat()
Concat可以用来拼接字段：
```SQL
select Concat(aaa, bbb)
from "table_name";
```
### Trim()
去掉字符串两边的空格，另外还有LTrim(去掉左边的)以及RTrim(去掉右边的)
### AS
给拼接的字段定义一个别名。
```SQL
select Concat(aaa, bbb) as
new_name
from "table_name";
```
### 常用的文本处理函数
函数 | 说明
--- | ---
Left() | 返回串左边的字符
Length() | 返回串的长度
Locate() | 找出串的一个子串
Lower() | 将串转换为小写
LTrim() | 去掉串左边的空格
Right() | 返回串右边的字符
RTrim() | 去掉串右边的空格
Soundex() | 返回串的SOUNDEX值
SubString() | 返回子串的字符
Upper() | 将串转换为大写

其中有一个soundex函数，它可以找出发音类似的字段。

### 常用的日期和时间处理函数
函数 | 说明
--- | ---
AddDate() | 增加一个日期(天、周等)
AddTime() | 增加一个时间(时、分等)
CurDate() | 返回当前日期
CurTime() | 返回当前时间
Date() | 返回日期时间的日期部分
DateDiff() | 计算两个日期之差
Date_Add() | 高度灵活的日期运算函数
Date_Format() | 返回一个格式化的日期或时间串
Day() | 返回一个日期的天数部分
DayOfWeek() | 对于一个日期，返回对应的星期几
Hour() | 返回一个时间的小时部分
Minute() | 返回一个时间的分钟部分
Month() | 返回一个日期的月份部分
Now() | 返回当前日期和时间
Second() | 返回一个时间的秒部分
Time() | 返回一个日期时间的时间部分
Year() | 返回一个日期的年份部分

### 常用数值处理函数
函数 | 说明
--- | ---
Abs() | 返回一个数的绝对值
Cos() | 返回一个角度的余弦
Exp() | 返回一个数的指数值
Mod() | 返回除操作的余数
Pi() | 返回圆周率
Rand() | 返回一个随机数
Sin() | 返回一个角度的正弦
Sqrt() | 返回一个数的平方根
Tan() | 返回一个角度的正切

## 聚集函数
汇总行组的字段值，比如得到中位数，平均数之类的。
函数 | 说明
--- | ---
AVG() | 返回某列的平均值
COUNT() | 返回某列的行数
MAX() | 返回某列的最大值
MIN() | 返回某列的最小值
SUM() | 返回某列值之和

## 数据分组
### GROUP BY
group by子句指示MySQL分组数据，然后对每个组而不是 整个结果集进行聚集。
### HAVING
having可以对分组进行过滤，此时不能用where，因为where是针对行的。
### UNION
组合多个select，类似于多个条件的where。有些场景下会更好用。
## INSERT
```SQL
insert into customers(cust_name,
cust_email,
cust_city,
cust_address)
values('alex',
NULL,
'Beijing',
'Beijing chaoyang');
```
## UPDATE
```SQL
update customers
set cust_email = 'hhhh@163.com'
where cust_id = 10005;
```
## DELETE
```SQL
delete from customers
where cust_id = 10005;
```
