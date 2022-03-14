# CMS通用评论（iRuxu）

### 库表
+ 数据库：**jx3box**
+ 数据表：**wp_posts**

### 数据源
类型|数据库表|作品ID关联|用户UID关联
---|---|---|---
macro|jx3box/wp_posts|ID|post_author
jx3dat|jx3box/wp_posts|ID|post_author
fb|jx3box/wp_posts|ID|post_author
bps|jx3box/wp_posts|ID|post_author
tool|jx3box/wp_posts|ID|post_author
house|jx3box/wp_posts|ID|post_author
share|jx3box/wp_posts|ID|post_author
bbs|jx3box/wp_posts|ID|post_author
notice|jx3box/wp_posts|ID|post_author
feedback|jx3box/wp_posts|ID|post_author


### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
ID  的值    | $post_type | comment  | comment_post  |  %s 回复了你。

### category与source_type
+ 以上评论组件传入的**category**值为【**post**】
+ 以上设置短消息时的**source_type**应取 **$post_type**


# 独立应用（jx3box_helper库）

### 库表
+ 数据库：jx3box_helper
+ 数据表：多个

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
item_plan|jx3box_helper/helper_item_plans|id|user_id
knowledge|jx3box_helper/helper_knowledges|id|user_id
quest|jx3box_helper/helper_wiki_posts|source_id|user_id

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id 的值 | item_plan | item_plan | comment_item_plan | 你的清单有一条新的评论
source_id的值|knowledge|knowledge|comment_knowledge|你的通识词条有一条新的评论
source_id的值|quest|quest|comment_quest|你的任务词条有一条新的评论

helper_wiki_posts表中也是类似CMS一样会有很多类型，是百科形式的，后续还会扩展book，声望等类型。

### category与source_type
+ 以上评论组件传入的**category**值为**对应的应用标识**
+ 以上设置短消息时的**source_type**应取 **对应的应用标识**


# 独立应用（jx3box库）

### 库表
+ 数据库：jx3box
+ 数据表：多个

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
collection|jx3box/post_collections|id|user_id
pz|jx3box/pz_schemas|id|user_id
paper|jx3box/question_paper|id|create_user_id
question|jx3box/question_lib|id|create_user_id
emotion|jx3box/pvx_emotions|id|user_id
joke|jx3box/pvx_jokes|id|user_id
calendar|jx3box/calendar|id|user_id

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id 的值 | collection | collection | comment_collection | 你的小册有一条新的评论
id 的值 | paper | exam | comment_paper | 你的试卷有一条新的评论
id 的值 | question | exam | comment_question | 你的题目有一条新的评论
id 的值|pz|pz|comment_pz|你的配装方案有一条新的评论
id 的值|emotion|emotion|comment_emotion|你的表情作品有一条新的评论
id 的值|joke|joke|comment_joke|你的骚话作品有一条新的评论
id 的值|calendar|calendar|comment_calendar|你的日历记录有一条新的评论

### category与source_type
+ 以上评论组件传入的**category**值为**对应的应用标识**
+ 以上设置短消息时的**source_type**应取 **对应的应用标识**


# 独立应用（jx3box_wiki库）

### 库表
+ 数据库：jx3box
+ 数据表：多个

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
team|jx3box_wiki/team_teams|id|super
battle|jx3box_wiki/battle_record|id|user_id

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id  |org | team  | comment_org  |  你的团队有一条新的留言
id  |battle | battle  | comment_battle  |  你的战斗记录有一条新的留言

### category与source_type
+ 以上评论组件传入的**category**值为**对应的应用标识**
+ 以上设置短消息时的**source_type**应取 **对应的应用标识**


# 独立应用（jx3box_query库）

以下均为游戏的表，是没有创作者的，正文内容都不是由玩家创作。
暂时本库在腾讯云服务器，之后会一起放到阿里云这台同mysql实例上。

### 库表
+ 数据库：jx3box_query
+ 数据表：多个

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
pet|jx3box_query/pet_std_index和pet_origin_index|Index|无
adventure|jx3box_query/adventure_std_index和adventure_origin_index|dwID|无
furniture|jx3box_query/furniture_std_index和furniture_origin_index|dwID|无
horse|jx3box_query/horse_std_index和horse_origin_index|ID|无
book|jx3box_query/book_std_index和book_origin_index|ID|无
exterior|jx3box_query/exterior_std_index和exterior_origin_index|暂不确认|无

### 评论加精
此类游戏类的表，没有创作者，不需要提醒作者，但存在评论加精。
source_id | source_type | type | subtype | content 
---|---|---|---|---
应用资源ID（例如宠物ID） | 应用类型（例如pet） | comment  | star_comment |  你的评论被设为精华


### category与source_type
+ 以上评论组件传入的**category**值为**对应的应用标识**
+ 以上设置短消息时的**source_type**应取 **对应的应用标识**




