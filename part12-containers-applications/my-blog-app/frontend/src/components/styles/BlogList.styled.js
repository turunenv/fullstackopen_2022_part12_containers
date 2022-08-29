import styled from "styled-components";

const StyledBlogList = styled.ul`
  li {
    border: 2px solid black;
    border-radius: 10px;
    max-width: 90vw;
    list-style: none;
    margin-bottom: 5px;
    padding: 10px 5px;
    font-size: 1.5em;

    a {
      text-decoration: none;
      color: #14068c;
    }
    a:hover {
        color: #402de3;
    }
  }
  `;

export default StyledBlogList;