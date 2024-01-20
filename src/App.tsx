import React, {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import { Details } from "./Details";

const Image = styled.img`
  width: 100%;
  max-height: 50px;
`;

const Card = styled.div`
  border: 1px solid #fff01f;
  padding: 0.5rem;
  border-radius: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
`;

interface AnimationProps {
  visibility: number;
  $delayinms: number;
}

const AnimationDiv = styled.div<AnimationProps>`
  ${(props) => props.visibility === 1 && "animation: 1s fadeIn;"}
  animation-fill-mode: forwards;
  animation-delay: ${({ $delayinms }) => $delayinms}ms;
  visibility: hidden;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const FullHeightView = styled.div`
  height: 100vh;
`;

const Body = styled.div`
  color: #fff01f;
  background-color: black;
`;

const checkInView = (ref: RefObject<HTMLElement>) => {
  if (!ref.current) return false;
  const rect = ref.current.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
};

function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  useEffect(() => {
    const setIsOnScreenOnScroll = () => {
      const visible = checkInView(ref);
      setIsOnScreen(visible);
    };
    setIsOnScreenOnScroll();
    document.addEventListener("scroll", setIsOnScreenOnScroll);
    return () => {
      document.removeEventListener("scroll", setIsOnScreenOnScroll);
    };
  }, []);

  return isOnScreen;
}

const AnimationContainer: React.FC<{
  children: ReactNode;
  $delayinms: number;
}> = ({ children, $delayinms }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <AnimationDiv
      visibility={isVisible ? 1 : 0}
      ref={ref}
      $delayinms={$delayinms}
    >
      {children}
    </AnimationDiv>
  );
};

const App = () => {
  return (
    <Body>
      <FullHeightView>
        <Row>
          <Details />
        </Row>
      </FullHeightView>

      <Row>
        {Array.from(Array(20).keys()).map((it) => {
          return (
            <AnimationContainer $delayinms={it * 250} key={`container-${it}`}>
              <Card>
                <Image src={logo} alt="React Logo" />
                <h1>React</h1>
                <p>This is a react card</p>
              </Card>
            </AnimationContainer>
          );
        })}
      </Row>
    </Body>
  );
};

export default App;
