import { rarityMap } from "../../../utils/Constants";

const RarityFilter = (props) => {
  const rarity = props.rarity;
  const active = props.active;
  return (
    <p
      className="rarity-filter fs-15 medium pointer"
      style={{
        color: active === rarity ? "#FFFFFF" : rarityMap[rarity].color,
        background: active === rarity ? rarityMap[rarity].color : "transparent",
      }}
      onClick={() => props.set(rarity)}
    >
      {rarity}
    </p>
  );
};

export default RarityFilter;
