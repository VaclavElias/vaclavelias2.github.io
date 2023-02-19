---
layout: page
title: Blog Archive - Vaclav Elias
tags: search
---
Blog Archive
<!-- excerpt -->
# Archive
{% assign reversedPosts = collections.blog | reverse %}
{% for year in collections.yearList %}
<h3>{{ year }}</h3>
<ul>
{% assign yearString = year | append: "" %}
{% assign filteredPosts = reversedPosts | where:"data.year", yearString %}
{% for post in filteredPosts %}
<li>{{ post.date | date: "%b %d" }}
    <a href="{{ post.url }}">{{ post.data.title }}</a>
</li>
{% endfor %}
</ul>
{% endfor %}