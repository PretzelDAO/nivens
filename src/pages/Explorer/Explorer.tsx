import React, {useEffect, useState} from 'react';
import logo from '../../logo.svg';
import './Explorer.css';
import {Link, Outlet} from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {Button, Card, Col, Container, FormControl, InputGroup, Row, Spinner} from "react-bootstrap";
import { useMetaMask } from "metamask-react";

const openClient = axios.create({
    baseURL: "https://api.opensea.io/api/v1/"
});

const moralisClient = axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2/"
});

function Explorer() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const [isLoading, setLoadingState] = useState(false);
    let initialCollectionState:any = []
    const [collections, setCollections] = useState(initialCollectionState)
    let initialWallet:string = account?account:"0x78f5Fa13864e782D436865CD1c546B58D7C6282E"
    const [targetAddress, setTargetAddress] = useState(initialWallet)

    const firstLayerLimit = 20;
    const secondLayerLimit = 100;
    const thirdLayerLimit = 300;
    const delayMs = 300


    async function getCollectionsFromOwner(ownerAddress:string,limit:number=10, offset:number=0 ) {
        const response = await openClient.get("collections",{
            params: {
                asset_owner: ownerAddress,
                limit: limit,
                offset: offset
            }
        });
        return response.data
    }

    async function getOwnersOfCollection(contractAddress:string,limit:number=10, cursor:number | undefined ) {
        let ownersRequestPath = "/nft/" + contractAddress + "/owners"
        const response = await moralisClient.get(ownersRequestPath,{
            params: {
                chain:"eth",
                format:"decimal",
                limit: limit,
                cursor: cursor
            },
            headers: {
                accept: "application/json",
                "X-API-Key": "keWbehrelmzpPR74s4z6nIez4kBBPeyxLArS7mOvTprXqPnOhiAKkjmDVvOdMcMZ"
            }
        });
        console.log(response.data)
        return response.data
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function updateRelevantCollections(relevantCollectionsAggregator:any[]){
        relevantCollectionsAggregator=relevantCollectionsAggregator.sort((a,b) => b.count - a.count);
        setCollections(relevantCollectionsAggregator)
        return
    }

    async function getRelevantCollections (originAddress:string, firstLayerLimitParameter:number =1 , secondLayerLimitParameter:number=1,thirdLayerLimitParameter:number=1) {
        setLoadingState(true);

        const firstLayerLimit = firstLayerLimitParameter;
        const secondLayerLimit = secondLayerLimitParameter;
        const thirdLayerLimit = thirdLayerLimitParameter;
        let relevantContracts, relevantOwners, contractAddress, relevantOwnerAddress, relevantCollections, relevantCollectionsAggregator: any[] = []
        let relevantCollectionsCount:any[]
        // Gets all collection contracts of your owned NFTs
        relevantContracts = await getCollectionsFromOwner(originAddress, firstLayerLimit, 0)
        console.log("user contracts:", relevantContracts)
        // For each collection, pull # owners
        for (let contractIndex = 0; contractIndex < relevantContracts.length; contractIndex++) {
            contractAddress = relevantContracts[contractIndex]?.primary_asset_contracts[0]?.address
            if ( typeof contractAddress == 'undefined'){ console.log( 'invalid contract:',relevantContracts[contractIndex]);continue};
            relevantOwners = await getOwnersOfCollection(contractAddress, secondLayerLimit, undefined)
            console.log("Collection analysis counter:" + (contractIndex + 1) + "/" + relevantContracts.length)
            // For each owner, get the collections they own
            for (let ownerIndex = 0; ownerIndex < relevantOwners.result?.length; ownerIndex++) {
                console.log("Owner analysis counter:" + (ownerIndex + 1) + "/" + relevantOwners.result?.length)
                relevantOwnerAddress = relevantOwners.result[ownerIndex]?.owner_of
                if (typeof relevantOwnerAddress  == 'undefined') {console.log('invalid owner Address:',relevantOwners.result[ownerIndex]);continue;}
                relevantCollections = await getCollectionsFromOwner(relevantOwnerAddress, thirdLayerLimit, 0)
                relevantCollectionsAggregator = relevantCollectionsAggregator.concat(relevantCollections)

                relevantCollectionsAggregator = [...relevantCollectionsAggregator.reduce((r:any, e:any) => {
                    let k = `${e.payout_address}`;
                    if(!r.has(k)) r.set(k, {...e, count: e.count?e.count:1 })
                    else r.get(k).count++
                    return r;
                }, new Map).values()]

                updateRelevantCollections(relevantCollectionsAggregator)
                await delay(delayMs);
            }
        }

        setLoadingState(false);
        return
    }

    React.useEffect(() => {
        const firstLayerLimit = 1;
        const secondLayerLimit = 1;
        const thirdLayerLimit = 1;
        // getRelevantCollections("0xB96D03ceeCc1018E07d2BC111eDF354b40dA8DA9",firstLayerLimit,secondLayerLimit,thirdLayerLimit )
    }, []);

  return (
      <div>
          <NavBar/>
          <Container>
              <Row>
                  <Col>
                      <h1 style={{fontFamily:"Inter"}} >These NFTs  are the entry gate to your personal rabbit hole</h1>
                  </Col>
              </Row>
              <p>Looking recommendations for Address: {targetAddress}</p>

              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Hello</InputGroup.Text>
                  <FormControl
                      placeholder="0x78f5Fa13864e782D436865CD1c546B58D7C6282E"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={targetAddress}
                      onChange={e => setTargetAddress( e.target.value )}
                  />
              </InputGroup>
              <button onClick={() => getRelevantCollections(targetAddress,firstLayerLimit,secondLayerLimit,thirdLayerLimit )}>
                  Load Recommendations
              </button>
              {isLoading?<Spinner animation="grow" />:""}
              {collections.map((collection: any) => (
                  <Card style={{ width: '18rem' }} key={collection.slug}
                  >
                      <Card.Img variant="top" src={collection.image_url} />
                      <Card.Body>
                          <Card.Title>{collection.name}</Card.Title>
                          <Card.Subtitle>Score: {collection.count}</Card.Subtitle>
                          <Card.Text>
                              {collection.description}
                          </Card.Text>
                          <Button variant="primary" href={collection.external_url} target="_blank">Check website</Button>
                      </Card.Body>
                  </Card>
              ))}
          </Container>

      </div>
  );
}

export default Explorer;
