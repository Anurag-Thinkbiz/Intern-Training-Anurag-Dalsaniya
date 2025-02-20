import styled from "styled-components";

export const MenuItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
    border-radius: 4px;
  }
`;
export const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
export const Menu = styled.ul<{ isMobile: boolean }>`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #333;
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    padding: 1rem;
    display: ${({ isMobile }) => (isMobile ? "block" : "none")};
    /* Toggle display visibility */
    transition: display 0.3s ease;
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0;
  color: #fff;
`;
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: #333;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 95.8%;
  z-index: 100; list-style: none;
`;
