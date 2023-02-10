import styled from "styled-components";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "./../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./../atom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    color: inherit;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface IModeProps {
  // recoil X 방식
  // toggleDark: () => void;
  // isDark: boolean;
}

const Coins = () => {
  // useQuery 방법
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // router v6 recoil X 방식, props 가져오기 : useOutletContext
  // const { toggleDark, isDark }: IModeProps = useOutletContext();

  // 기존 방법
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const json = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins`)
  //     ).json();
  //     setCoins(json.slice(0, 50));
  //     setLoading(false);
  //   })();
  // }, []);

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Header>
        <Title>Crypto Tracker</Title>
        <button onClick={toggleDarkAtom}>Switch Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              {/* <Link to={`/${coin.id}`}> */}
              <Link to={`/${coin.id}/chart`} /* state={{ isDark }} */>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
