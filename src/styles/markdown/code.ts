import {createGlobalStyle} from "styled-components";

const CodeHighlightStyle = createGlobalStyle`

  pre[class*="language-"],
  code[class*="language-"],
  code[class*="language-"] span {
    color: #333;
    font-size: 0.95rem;
    text-shadow: none;
    font-family: 'D2Coding', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }
  
  @media print {
    pre[class*="language-"],
    code[class*="language-"] {
      text-shadow: none;
    }
  }
  
  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    background: #f6f8fa;
  }
    
  :not(pre) > code[class*="language-"] {
    padding: .1em .3em;
    border-radius: .3em;
    color: #333333;
    background: #f3f4f4;
  }

  .namespace {
    opacity: .7;
  }
    
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #93a1a1;
  }
    
  .token.punctuation {
    color: #999999;
  }
    
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #990055;
  }
    
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #669900;
  }
    
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #a67f59;
  }
   
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #0077aa;
  }
    
  .token.function {
    color: #dd4a68;
  }
    
  .token.regex,
  .token.important,
  .token.variable {
    color: #ee9900;
  }
    
  .token.important,
  .token.bold {
    font-weight: bold;
  }
    
  .token.italic {
    font-style: italic;
  }
    
  .token.entity {
    cursor: help;
  }

  /* Line Highlight */
  .gatsby-highlight-code-line {
    margin: 0 -1em;
    padding: 0 1em;
    display: block;
    background: #f7ebc6;
    box-shadow: inset 5px 0 0 #f7d87c;
  }
  
/*

  pre[class*="language-"].line-numbers {
    position: relative;
    padding-left: 3em;
    counter-reset: linenumber;
  }

  pre[class*="language-"].line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 1em;
    font-size: 100%;
    left: 1em !important;
    width: 3em;
    letter-spacing: -1px;
    border-right: 1px solid #999;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
    line-height: 1.4;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }  
  */
`;

export default CodeHighlightStyle;
