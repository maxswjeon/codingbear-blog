import {createGlobalStyle} from "styled-components";
import {StyleConfig} from "../../config";

const UtterancesStyle = createGlobalStyle`
  .react-utterances {
    border-top: 1px solid ${StyleConfig.category.border_color};
    margin: 0 -${StyleConfig.content.padding}px;
    padding: 0 ${StyleConfig.content.padding}px;
  }
  
  .react-utterances > p{
    text-align: center;
    padding: 25px 0;
    color: #CCC;
  }
  
  .utterances {
    max-width: 100%;
  }
`;

export default UtterancesStyle;
