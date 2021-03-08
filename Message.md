# CMS通用评论

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
post|jx3box/wp_posts|ID|post_author

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id  的值    | $post_type | comment  | comment_post  |  %s 评论了你的文章

$post_type可能的值：macro,jx3dat,fb,bps,tool,bbs,share,house


# 独立应用（kuguats）

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
collection|jx3box/post_collections|id|user_id
item_plan|jx3box_helper/helper_item_plans|id|user_id
knowledge|jx3box_helper/helper_knowledges|id|user_id

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id 的值 | collection | collection | comment_collection | 你的小册有一条新的评论
id 的值 | item_plan | item_plan | comment_item_plan | 你的清单有一条新的评论
id 的值 | knowledge | knowledge | comment_knowledge | 你的词条有一条新的评论


# 独立应用（L.T）

### 数据源
类型|数据库表|作品ID关联|用户ID关联
---|---|---|---
team|jx3box_wiki/team_teams|id|super
paper|jx3box/question_paper|id|create_user_id
question|jx3box/question_lib|id|create_user_id

### 消息模板
source_id | source_type | type | subtype | content 
---|---|---|---|---
id 的值 |org | team  | comment_org  |  你的团队有一条新的留言
id 的值 | paper | exam | comment_paper | 你的试卷有一条新的评论
id 的值 | question | exam | comment_question | 你的题目有一条新的评论
