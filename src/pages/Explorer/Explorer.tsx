import React, {useEffect, useState} from 'react';
import logo from '../../logo.svg';
import './Explorer.css';
import {Link, Outlet} from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from "axios";

const openClient = axios.create({
    baseURL: "https://api.opensea.io/api/v1/"
});

const moralisClient = axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2/"
});

function Explorer() {
    const [count, setCount] = useState(0);
    const [collections, setCollections] = useState(null)

    React.useEffect(() => {
        const firstLayerLimit = 5;
        const secondLayerLimit = 100;
        const thirdLayerLimit = 300;

        getRelevantCollections("0x78f5Fa13864e782D436865CD1c546B58D7C6282E",firstLayerLimit,secondLayerLimit,thirdLayerLimit )

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
            return response.data
        }

        async function getRelevantCollections (originAddress:string, firstLayerLimitParameter:number =1 , secondLayerLimitParameter:number=1,thirdLayerLimitParameter:number=1) {
            const firstLayerLimit = firstLayerLimitParameter;
            const secondLayerLimit = secondLayerLimitParameter;
            const thirdLayerLimit = thirdLayerLimitParameter;
            let relevantContracts, relevantOwners, contractAddress, relevantOwnerAddress, relevantCollections, relevantCollectionsAggregator: never[] = []

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
                }
            }
            let relevantCollectionsCount = [...relevantCollectionsAggregator.reduce((r:any, e:any) => {
                let k = `${e.payout_address}`;
                if(!r.has(k)) r.set(k, {...e, count: 1})
                else r.get(k).count++
                return r;
            }, new Map).values()]

            relevantCollectionsCount=relevantCollectionsCount.sort((a,b) => b.count - a.count);

            console.log(relevantCollectionsCount)

            return relevantCollectionsCount
        }
    }, []);

  return (
      <div>
          <NavBar/>
        <h1>Explorer</h1>
          <p>You clicked {count} times</p>

          <button onClick={() => setCount(count + 1)}>
              Click me to add counter
          </button>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
        >
            <div>Placeholder gallery</div>
            <Link to="/">Home</Link> |{" "}
        </nav>
        <Outlet />
      </div>
  );
}

export default Explorer;
