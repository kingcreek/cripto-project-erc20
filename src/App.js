import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, autoConnectIfIsConnected } from "./redux/blockchain/blockchainActions";
import { fetchData, getBnbBalance } from "./redux/data/dataActions";
import { /*aproveToken,*/ aproveNFT } from "./redux/helpers/tokenApprovals";

//INTERNALS
import * as TokenApprovals from "./redux/helpers/tokenApprovals";
import * as Functions from "./redux/blockchain/gameFunctions";


//INTERNALS DESIGN
import * as Design from "./pages/mainPage";

//DESIGN 
import { Card, Grid, /*list,*/ Divider } from '@nextui-org/react';
import { Container, Row/*, Col*/ } from '@nextui-org/react';
import { Text, Spacer, Button/*, Link*/ } from '@nextui-org/react';
//import logo from './logo.svg';
//import './App.css';

function App() {


  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const [loading, setLoading] = useState(false);
  const blockchain = useSelector(state => state.blockchain);


  useEffect(() => {
    console.log("Enter in effect 1");
    if (blockchain.account !== "" && blockchain.kyaToken != null) {
      dispatch(getBnbBalance(blockchain.account));
      dispatch(fetchData(blockchain.account));
      
      dispatch(TokenApprovals.checkIfNftNeedApproval(blockchain.account));
    }
  }, [blockchain.initialState, blockchain.account, blockchain.kyaToken, dispatch]);


  useEffect(() => {
    console.log("Effect excute only once");
    function fetchBusinesses() {
      dispatch(autoConnectIfIsConnected(blockchain.account));
    }
    fetchBusinesses();
  }, []);



  return (



    <div className="App">

      {/*<img src={logo} className="App-logo" alt="logo" />*/}


      {/*
      SHOW LOADING
      blockchain.loading && <p>Cargando...</p>
      */}

      <Container>
        <Row justify="center" align="center">
          <Text>Test app kya game</Text>
        </Row>
      </Container>

      <Spacer />

      {blockchain.account === "" || blockchain.kyaToken === null ? (
        <>
          <Container>
            <Row justify="center" align="center">
              <Button onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }
              }>Connect</Button>
            </Row>
            <Row justify="center" align="center">
              {blockchain.errorMsg !== "" ? (
                <Text>{blockchain.errorMsg}</Text>
              ) : (
                <Text>{blockchain.errorMsg}</Text>
              )}
            </Row>

          </Container>
        </>
      ) : (
        <>
          <Container>
            <Row justify="center" align="center">
              <Text>Connected ok!</Text>
            </Row>
            <Spacer />
            <Row justify="center" align="center">
              <Button onClick={(e) => {
                e.preventDefault();
                dispatch(Functions.mintNFT(blockchain.account, "Prueba"));
              }}>Mint NFT</Button>
            </Row>
            
          </Container>

          <Grid.Container gap={2}>
            {data.allOwnerPets.map((item, index) => {
              return (
                <Design.NFTITEM key={index} data={{ item, index }} />
              )
            })}
          </Grid.Container>

        </>
      )}




    </div>
  );
}

export default App;










/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/