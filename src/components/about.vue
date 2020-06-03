<template>
  <div class="about">
    <ol class="breadcrumb">
      <li>
        <a class="a" href>首页</a>
      </li>
      <li class="active">关于</li>
    </ol>
    <div class="about_box">
      <h2 class="about_h2">关于</h2>
      <div class="about_div">
        <p class="about_p">
          <span style="padding-right:5px; color:green" class="glyphicon glyphicon-leaf"></span>本网站是根据,vue.js社区和cnode.js社区里里面提供的开源接口重构的。
        </p>
        <p class="about_p">
          <span style="padding-right:5px;color:green" class="glyphicon glyphicon-leaf"></span>其社区接口没有完全开源,有些功能不能实现。
        </p>
        <p class="about_p">
          <span style="padding-right:5px;color:green" class="glyphicon glyphicon-leaf"></span>该网站是使用vue+boostrap框架进行开发。
        </p>
        <p class="about_p">
          <span style="padding-right:5px;color:green" class="glyphicon glyphicon-leaf"></span>该网站可实现,用户登录功能,主题列表,主题详情页,用户发表文章,文章评论,回复评论,文章点赞,文章收藏,个人信息等······
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.about {
  margin-top: 20px;
}
.about_h2 {
  font-weight: 700;
  border-bottom: solid 2px grey;
  padding: 20px;
}
.about_div {
  padding: 20px;
}
.about_p {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 30px;
}
</style>