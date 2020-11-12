{% component source: "{{source}}", layout: "", type: "module", filterBy: "parentid", filterValue:"{{parentItemId}}", collectionVariable: "allItems" %}

{% assign objectTags = "," %}
{% for item in allItems.items %}
    {% for itemTag in item.itemTags %}
        {% assign itemTagStr = "," | append: itemTag | append: "," %}
        {% unless objectTags contains itemTagStr %}
            {% assign objectTags = objectTags | append: itemTag | append: "," %}
        {% endunless %}
    {% endfor %}
{% endfor %}
{% assign objectTags = objectTags | split: "," %}

{% for objectTag in objectTags %}
    {% if objectTag != "" %}
        {{tpl | replace: "[[tag]]",  objectTag}}
    {% endif %}
{% endfor %}