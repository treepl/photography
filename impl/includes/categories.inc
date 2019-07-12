{% component source: "{{source}}", layout: "", type: "module", limit:"1000", filterBy: "parentid", filterValue:"{{parentItemId}}", collectionVariable: "allItems" %}

{% assign objectCategories = "," %}
{% for item in allItems.items %}
    {% for itemCategory in item.itemCategories %}
        {% assign itemCategoryStr = "," | append: itemCategory | append: "," %}
        {% unless objectCategories contains itemCategoryStr %}
            {% assign objectCategories = objectCategories | append: itemCategory | append: "," %}
        {% endunless %}
    {% endfor %}
{% endfor %}
{% assign objectCategories = objectCategories | split: "," %}

{% for objectCategory in objectCategories %}
    {% if objectCategory != "" %}
        {{tpl | replace: "[[category]]",  objectCategory}}
    {% endif %}
{% endfor %}