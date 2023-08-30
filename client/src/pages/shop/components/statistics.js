import React, { useState, useEffect, useContext } from "react";
import StatisticsChart from "../../../components/StatisticsChart";
import { getRarityAttribute } from "../../../utils/Common";
import {
  getAlNFTs
} from "../../../utils/dbFunctions";
import { SmartContractContext } from "../../../contexts/SmartContractContext";

const Statistics = () => {
  const [statMap, setStatMap] = useState({
    total: { supply: 0, sold: 0 },
    void: { supply: 0, sold: 0 },
    galactic: { supply: 0, sold: 0 },
    astronomic: { supply: 0, sold: 0 },
    cosmic: { supply: 0, sold: 0 },
  });

  const { getSold, getSupply } = useContext(SmartContractContext);

  useEffect(() => {
    getTotalStats();
  }, []);

  const getTotalStats = async () => {
    const map = Object.assign({}, statMap);
    const nfts = await getAlNFTs();
    for (let i = 0; i < nfts.length; i++) {
      const rarity = getRarityAttribute(nfts[i].attributes).toLowerCase();
      const supply = await getSupply(nfts[i].id);
      const sold = await getSold(nfts[i].id);
      map[rarity].supply = map[rarity].supply + parseInt(supply);
      map[rarity].sold = map[rarity].sold + parseInt(sold);
    }
    Object.keys(map).forEach(key => {
      map.total.supply = map.total.supply + map[key].supply
      map.total.sold = map.total.sold + map[key].sold
    })
    setStatMap(map);
  };

  return (
    <div className="statistics-container mt-75">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 className="fs-35">Monthly Drops Statistics</h3>
      </div>
      <div className="statistics-cta-container mt-20">
        <div className="statistics-cta glass">
          <div className="large-chart">
            <div className="large-text">
              <p className="fs-17 semi-bold">Total Listed:</p>
              <p className="fs-33 semi-bold mt-30">
                {statMap.total.supply} Items
              </p>
              <div className="large-chart">
                <span className="large-line"></span>
                <p className="ceil lh-23 mt-31">
                  Number of items sold is{" "}
                  {Math.round(
                    (statMap.total.sold / statMap.total.supply) * 100
                  )}
                  % this month
                </p>
              </div>
            </div>
            <StatisticsChart
              value={Math.round((statMap.total.sold / statMap.total.supply) * 100)}
              color={`rgba(186,4,252,1)`}
              width={200}
              height={200}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%",
            }}
            className="mt-30"
          >
            <div className="item-stats">
              <p className="ceil text-align fs-14">Available:</p>
              <p className="text-align fs-24 semi-bold">
                {statMap.total.supply - statMap.total.sold}
              </p>
            </div>
            <div className="item-stats">
              <p className="ceil text-align fs-14">Sold:</p>
              <p className="text-align fs-24 semi-bold">{statMap.total.sold}</p>
            </div>
          </div>
        </div>

        <div className="statistics-smallcontainer">
          <div className="statistics-small glass">
            <div className="small-chart">
              <div className="small-text">
                <p className="fs-17 semi-bold ripe-mango">Void</p>
                <h3>{Math.round(statMap.void.supply - statMap.void.sold)}</h3>
                <div className="chip-text">
                  <span className="small-line"></span>
                  <p className="ceil">Available</p>
                </div>
              </div>
              <div style={{ marginTop: "15%" }}>
                <StatisticsChart
                  value={Math.round(
                    (statMap.void.sold / statMap.void.supply) * 100
                  )}
                  color={`rgba(255,188,39,1)`}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="statistics-small glass">
            <div className="small-chart">
              <div className="small-text">
                <p className="fs-17 semi-bold infra-red">Galactic</p>
                <h3>{statMap.galactic.supply - statMap.galactic.sold}</h3>
                <div className="chip-text">
                  <span className="small-line"></span>
                  <p className="ceil">Available</p>
                </div>
              </div>
              <div style={{ marginTop: "15%" }}>
                <StatisticsChart
                  value={Math.round(
                    (statMap.galactic.sold / statMap.galactic.supply) * 100
                  )}
                  color={`rgba(239,70,111,1)`}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="statistics-small glass">
            <div className="small-chart">
              <div className="small-text">
                <p className="fs-17 semi-bold ultramarine-blue">Astronomic</p>
                <h3>{statMap.astronomic.supply - statMap.astronomic.sold}</h3>
                <div className="chip-text">
                  <span className="small-line"></span>
                  <p className="ceil">Available</p>
                </div>
              </div>
              <div style={{ marginTop: "15%" }}>
                <StatisticsChart
                  value={Math.round(
                    (statMap.astronomic.sold / statMap.astronomic.supply) * 100
                  )}
                  color={`rgba(55,114,255,1)`}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="statistics-small glass">
            <div className="small-chart">
              <div className="small-text">
                <p className="fs-17 semi-bold emerald">Cosmic</p>
                <h3>{statMap.cosmic.supply - statMap.cosmic.sold}</h3>
                <div className="chip-text">
                  <span className="small-line"></span>
                  <p className="ceil">Available</p>
                </div>
              </div>
              <div style={{ marginTop: "15%" }}>
                <StatisticsChart
                  value={Math.round(
                    (statMap.cosmic.sold / statMap.cosmic.supply) * 100
                  )}
                  color={`rgba(88, 191, 112, 1)`}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
