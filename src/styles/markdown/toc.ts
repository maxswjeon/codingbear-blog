import {createGlobalStyle} from "styled-components";
import {StyleConfig} from "../../config";

const TOCStyle = createGlobalStyle`
  .toc {
    display: none;
  }
    
  .toc-list {
    padding-inline-start: 20px;
  }
    
  .toc-list > li {
    padding: 10px 0 0;
  }
    
  .toc-list > li > a {
    color: #0366d6;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
    
  .sticky {
    position: fixed;
    top: 25px;
    left: calc((100vw
        - ${StyleConfig.content.width}px) / 2
        - ${StyleConfig.tableofcontent.width + StyleConfig.tableofcontent.padding}px);
  }
`;

export default TOCStyle;
