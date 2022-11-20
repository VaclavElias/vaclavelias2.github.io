---
layout: page
title: Blog Archive - Vaclav Elias
---
# Archive
{% assign reversedPosts = collections.blog | reverse %}
{% for year in collections.yearList %}
<h3>{{ year }}</h3>
<ul>
{% for post in reversedPosts %}
<li>{{ post.date | date: "%b %d" }}
    <a href="{{ post.url }}">{{ post.data.title }}</a>
</li>
{% endfor %}
</ul>
{% endfor %}