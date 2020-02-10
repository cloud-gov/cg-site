---
layout: page
title: "Docs"
permalink: "/docs/"
---

<ul>
  {% for docpage in site.docs %}
    <li>
      <a href="{{ docpage.url }}">{{ docpage.title }}</a>
      - {{ docpage.parent }}
    </li>
  {% endfor %}
</ul>