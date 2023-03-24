import GlobalNavigationBar from "./GlobalNavigationBar";

interface IProps {
  children: JSX.Element;
}

export default function Layout(props: IProps) {
  return (
    <>
      <GlobalNavigationBar />
      {props.children}
    </>
  );
}
