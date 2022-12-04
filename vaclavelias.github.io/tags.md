---
layout: page
title: Blog Tags - Vaclav Elias
tags: search
---
# Tags
{% assign sorted_tags = collections.tagList %}
{% for tag in sorted_tags %}
  <h3>{{ tag | replace: "-"," " }}</h3>
  <ul>
    {% for post in collections[tag] %}<li><a href="{{ post.url }}">{{ post.data.title }}</a></li>{% endfor %}
  </ul>
{% endfor %}