{% component source: "{{source}}", layout: "", type: "module", limit:"1000", filterBy: "parentid", filterValue:"{{parentItemId}}", collectionVariable: "allItems" %}

{% assign objectDates = "," %}
{% assign objectMonthDates = "," %}
{% for item in allItems.items %}
    {% assign itemDate = item.ReleaseDate | date: "%Y" %}
    {% assign itemMonthDate = item.ReleaseDate | date: "%Y-%m-%B" %}

    {% assign itemDateStr = itemDate | append: "," %}
    {% assign itemMonthDateStr = itemMonthDate | append: "," %}

    {% unless objectDates contains itemDateStr %}
    {% assign objectDates = objectDates | append: itemDate | append: "," %}
    {% endunless %}

    {% unless objectMonthDates contains itemMonthDateStr %}
    {% assign objectMonthDates = objectMonthDates | append: itemMonthDate | append: "," %}
    {% endunless %}
{% endfor %}
{% assign objectDates = objectDates | split: "," | sort | reverse %}
{% assign objectMonthDates = objectMonthDates | split: ","  | sort | reverse %}

{% assign monthDayList = "31,28,31,30,31,30,31,31,30,31,30,31" | split:"," %}
{% for objectDate in objectDates %}
    {% if objectDate != "" %}


        {% assign monthList = "" %}
        {% for objectMonthDate in objectMonthDates %}
            {% if objectMonthDate != "" %}
                {% assign objectMonthDate = objectMonthDate | split: "-" %}


                {% if objectMonthDate[0] ==  objectDate %}
                    {% assign monthNumber = objectMonthDate[1] | minus: 1 %}
                    {% assign maxMonthDay = monthDayList[monthNumber] %}
                    {% assign objectDateMod = objectDate | modulo: 4 %}
                    {% if maxMonthDay == 28 and objectDateMod == 0 %}
                        {% assign maxMonthDay = 29 %}
                    {% endif %}
                    {% assign monthStr = month | replace: "[[month]]",  objectMonthDate[1] | replace: "[[monthName]]",  objectMonthDate[2] | replace: "[[maxMonthDay]]", maxMonthDay  %}
                    {% assign monthList = monthList | append: monthStr %}
                {% endif %}
            {% endif %}
        {% endfor %}

        {{year| replace: "[[monthList]]",  monthList | replace: "[[year]]",  objectDate }}
    {% endif %}
{% endfor %}