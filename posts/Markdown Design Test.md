---
title: "Markdown Desgin Test"
date: "2020-04-23"
---
# Overview
Nearly all Markdown applications support the basic syntax outlined in John Gruber’s original design document. There are
minor variations and discrepancies between Markdown processors — those are noted inline wherever possible.


# Headings
To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should 
correspond to the heading level. For example, to create a heading level three (`<h3>`), use three number signs 
(e.g., `### My Header`).

# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

## Alternate Syntax
Alternatively, on the line below the text, add any number of == characters for heading level 1 or -- characters for 
heading level 2.

Heading level 1
===============

Heading level 2
---------------

## Heading Best Practices

Markdown applications don’t agree on how to handle missing blank lines between a heading and the surrounding paragraphs. 
For compatibility, separate paragraphs and headings with one or more blank lines.


# Paragraphs

To create paragraphs, use a blank line to separate one or more lines of text.

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

## Paragraph Best Practices

Don't put tabs or spaces in front of your paragraphs.

Keep lines left-aligned like this.


# Line Breaks

To create a line break (`<br>`), end a line with two or more spaces, and then type return.

This is the first line.  
And this is the second line.

## Line Break Best Practices

You can use two or more spaces (referred to as “trailing whitespace”) for line breaks in nearly every Markdown 
application, but it’s controversial. It’s hard to see trailing whitespace in an editor, and many people accidentally or 
intentionally put two spaces after every sentence. For this reason, you may want to use something other than trailing 
whitespace for line breaks. Fortunately, there is another option supported by nearly every Markdown application: the 
`<br>` HTML tag.

For compatibility, use trailing white space or the `<br>` HTML tag at the end of the line.

There are two other options I don’t recommend using. CommonMark and a few other lightweight markup languages let you 
type a backslash (\) at the end of the line, but not all Markdown applications support this, so it isn’t a great option 
from a compatibility perspective. And at least a couple lightweight markup languages don’t require anything at the end
of the line — just type return and they’ll create a line break.

First line with two spaces after.  
And the next line.

First line with the HTML tag after.<br>
And the next line.


# Emphasis

You can add emphasis by making text bold or italic.

## Bold

To bold text, add two asterisks or underscores before and after a word or phrase. To bold the middle of a word for 
emphasis, add two asterisks without spaces around the letters.

I just love **bold text**.  
I just love __bold text__.  
Love**is**bold  

### Bold Best Practices

Markdown applications don’t agree on how to handle underscores in the middle of a word. For compatibility, use asterisks 
to bold the middle of a word for emphasis.

## Italic

To italicize text, add one asterisk or underscore before and after a word or phrase. To italicize the middle of a word 
for emphasis, add one asterisk without spaces around the letters.

Italicized text is the *cat's meow*.  
Italicized text is the _cat's meow_.  
A*cat*meow  

### Italic Best Practices

Markdown applications don’t agree on how to handle underscores in the middle of a word. For compatibility, use asterisks
to italicize the middle of a word for emphasis.

A*cat*meow

## Bold and Italic

To emphasize text with bold and italics at the same time, add three asterisks or underscores before and after a word or
phrase. To bold and italicize the middle of a word for emphasis, add three asterisks without spaces around the letters.

This text is ***really important***.
This text is ___really important___.
This text is __*really important*__.
This text is **_really important_**.
This is really***very***important text.

### Bold and Italic Best Practices

Markdown applications don’t agree on how to handle underscores in the middle of a word. For compatibility, use asterisks
to bold and italicize the middle of a word for emphasis.

This is really***very***important text.

# Blockquotes

To create a blockquote, add a `>` in front of a paragraph.

```
> Dorothy followed her through many of the beautiful rooms in her castle.
```

The rendered output looks like this:

> Dorothy followed her through many of the beautiful rooms in her castle.

## Blockquotes with Multiple Paragraphs

Blockquotes can contain multiple paragraphs. Add a `>` on the blank lines between the paragraphs.

```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

The rendered output looks like this:

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

## Nested Blockquotes

Blockquotes can be nested. Add a `>>` in front of the paragraph you want to nest.

```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

The rendered output looks like this:

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

## Blockquotes with Other Elements

Blockquotes can contain other Markdown formatted elements. Not all elements can be used — you’ll need to experiment to 
see which ones work.

```
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
```

The rendered output looks like this:

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.

# Lists

You can organize items into ordered and unordered lists.

## Ordered Lists

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical 
order, but the list should start with the number one.

```
1. First item
2. Second item
3. Third item
4. Fourth item
```

1. First item
2. Second item
3. Third item
4. Fourth item  

---

```
1. First item
1. Second item
1. Third item
1. Fourth item
```

1. First item
1. Second item
1. Third item
1. Fourth item

---

```
1. First item
8. Second item
3. Third item
5. Fourth item
```

1. First item
8. Second item
3. Third item
5. Fourth item

---

```
1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
```

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

## Unordered Lists

To create an unordered list, add dashes (`-`), asterisks (`*`), or plus signs (`+`) in front of line items. Indent one 
or more items to create a nested list.

```
- First item
- Second item
- Third item
- Fourth item
```

- First item
- Second item
- Third item
- Fourth item

---

```
* First item
* Second item
* Third item
* Fourth item
```

* First item
* Second item
* Third item
* Fourth item

---

```
+ First item
* Second item
- Third item
+ Fourth item
```

+ First item
* Second item
- Third item
+ Fourth item

---

```
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

## Adding Elements in Lists

To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab,
as shown in the following examples.

### Paragraphs
```
*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.
```

The rendered output looks like this:

*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.

### Blockquotes

```
*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.
```

The rendered output looks like this:

*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.

### Code Blocks

Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tabs.

```
1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3.  Update the title to match the name of your website.
```

The rendered output looks like this:

1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3.  Update the title to match the name of your website.

### Images
```
1.  Open the file containing the Linux mascot.
2.  Marvel at its beauty.

    ![Tux, the Linux mascot](/assets/images/tux.png)

3.  Close the file.
```

The rendered output looks like this:

1.  Open the file containing the Linux mascot.
2.  Marvel at its beauty.

    ![Tux, the Linux mascot](/assets/images/tux.png)

3.  Close the file.

# Code

To denote a word or phrase as code, enclose it in backticks (`` ` ``).

At the command prompt, type `nano`.

## Escaping Backticks

If the word or phrase you want to denote as code includes one or more backticks, you can escape it by enclosing the word
or phrase in double backticks (``).

``Use `code` in your Markdown file.``

## Code Blocks

To create code blocks, indent every line of the block by at least four spaces or one tab.

```
     <html>
          <head>
          </head>
     </html>
```

The rendered output looks like this:

    <html>
        <head>
        </head>
    </html>


# Horizontal Rules

To create a horizontal rule, use three or more asterisks (`***`), dashes (`---`), or underscores (`___`) on a line by 
themselves.

```
***

---

_________________
```

The rendered output looks like this:

***

---

_________________

## Horizontal Rule Best Practices

For compatibility, put blank lines before and after horizontal rules.

Try to put a blank line before...

---

...and after a horizontal rule.


# Links
To create a link, enclose the link text in brackets (e.g., `[Duck Duck Go]`) and then follow it immediately with the URL 
in parentheses (e.g., `(https://duckduckgo.com)`).

```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

The rendered output looks like this:

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

## Adding Titles

You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a 
title, enclose it in parentheses after the URL.

# Extended Syntax

## Table

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |


| 기본 정렬       | 가운데 정렬      | 오른쪽 정렬  |
| ------------- |:-------------:| ---------:|
| 데이터         | 데이터          | 데이터      |
| 데이터         | 데이터          | 데이터      |
| 데이터         | 데이터          | 데이터      |

## Table Code Test
<table>
<tr>
<td> Status </td> <td> Response </td>
</tr>
<tr>
<td> 200 </td>
<td>

```json
{
    "id": 10,
    "username": "alanpartridge",
    "email": "alan@alan.com",
    "password_hash": "$2a$10$uhUIUmVWVnrBWx9rrDWhS.CPCWCZsyqqa8./whhfzBZydX7yvahHS",
    "password_salt": "$2a$10$uhUIUmVWVnrBWx9rrDWhS.",
    "created_at": "2015-02-14T20:45:26.433Z",
    "updated_at": "2015-02-14T20:45:26.540Z"
}
```

</td>
</tr>
<tr>
<td> 400 </td>
<td>

**Markdown** _here_.

</td>
</tr>
</table>
