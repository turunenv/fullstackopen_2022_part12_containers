import styled from "styled-components";

const StyledNavbar = styled.div`
  background: black;
  padding: 30px 5px;
  font-size: 1.5em;

  a, em, button {
    margin-right: 1em;
  }
  a {
    color: white;
  }
  em {
    color: #b0bccf;
  }
  a:link {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: #d3dff2;
  }
`;

export default StyledNavbar;