import { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";

// styling
const Image = styled.img`
  width: 100%;
  max-height: 50px;
`;

const Card = styled.div`
  border: 1px solid #fff01f;
  padding: 0.5rem;
  border-radius: 4px;
`;

const Button = styled.button`
  color: #fff01f;
  background-color: transparent;
  border: 1px solid #fff01f;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

// details animation
interface DetailsProps {
  open: boolean;
}

const DetailsContainer = styled.div<DetailsProps>`
  opacity: ${({ open }) => (open ? "1" : "0")};
  transition: opacity 0.5s;
`;

const Details = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <Button onClick={() => setOpen(!open)}>Details</Button>
      </div>
      <DetailsContainer open={open}>
        <Card>
          <Image src={logo} alt="React Logo" />
          <h1>Details</h1>
          <p>This is a react card</p>
        </Card>
      </DetailsContainer>
    </>
  );
};
export { Details };
